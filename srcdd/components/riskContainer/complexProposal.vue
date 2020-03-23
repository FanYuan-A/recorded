<template>
<div>
    <div class="popup-inner" v-show="initRequerstFlag">
      <span class="title">{{itemName}}</span>
      <md-icon name="close" @click="switchComplexEvent"></md-icon>
      <div class="popup-inner-container" :class="{'popup-inner-container-flag':!popInpopFlag}">
        <md-scroll-view ref="scrollView" :scrolling-x="false" :auto-reflow=true>
          <div :class="{'show-client-height': popInpopFlag}">
            <main-risk-from
              v-if='switchRisk'
              :main-risk='mainRisk'
              :insureInfo='insureInfo'
              :occuptionRankProp="occuptionRankProp"
              @outputMainInfo="getOutputMainInfo"
              @outputSwitch = "getOutputSwitch"
            ></main-risk-from>
            <template v-if="saleInfoMainCopy">
              <addi-risk-form
                v-for="(item,index) of calAddRisksInner"
                :key="index"
                :riskInfo="item"
                :mainRisk="mainRisk"
                :insureInfo='insureInfo'
                :appntInfo='appntInfo'
                :mainRiskSaleInfo="saleInfoMainCopy"
                :popInpopFlag="popInpopFlagCopy"
                :selectedAddRiskCodes="selectedAddRiskCodes"
                @outputAddRisk="getOutputAddRisk"
                @outputSwitch = "getOutputSwitch"
              >
              </addi-risk-form>
            </template>
          </div>
        </md-scroll-view>
      </div>
      <md-button v-show="!popInpopFlag" class="complex-button" @click="toGetAllRiskPrem">
        <input type="text" v-show="false" ref="inputVal"> 确认
      </md-button>
    </div>
</div>
</template>
<script>
/* eslint-disable */
import esp from '@/api/esp.js'
import plan from "@/api/plan.js"
import as from '@/api/as.js'
import commonUtils from '@/utils/common.js'
import addiRiskForm from './addiRiskForm.vue'
import mainRiskForm from './mainRiskForm.vue'
import { Toast,Button,Icon,ScrollView } from 'mand-mobile'
import mixinForSaleInfo from "@/components/mixin/mixinForSaleInfo.js"
export default {
  name: 'complexProposal',
  components: {
    'main-risk-from': mainRiskForm,
    'addi-risk-form':addiRiskForm,
    'md-button': Button,
    [Icon.name]: Icon,
    [ScrollView.name]:ScrollView
  },
  mixins: [mixinForSaleInfo],
  props: {
    itemCode: { // 选择的销售计划编码
      type: [String],
      required: true
    },
    prdDetailObjProps:{ // 产品详情请求的数据
      type: [Object],
      required: true
    },
    occuptionRankProp:{
      // 职业和试算险种数组同一层次，需要单独传
      type: [String],
      required: true
    },
    insureInfo: { // 被保人
      type: [Object],
      required: true
    },
    appntInfo: { // 投保人
      type: [Object],
      required: true
    },
    complexProposalItem:{ // 险种回显的信息
      type: [Array],
      required: false
    },
    isChoosedAppnt:{ // 是否选投保人 （2019-12-23改版必选投保人）
      type:[Boolean],
      default(){
        return true
      }
    },
    isSamePerson:{ // 投被保人是不是同一人
      type:[Boolean],
      default(){
        return false
      }
    },
  },
  data() {
    return {
      mainRisk: {}, // 主险信息
      addRisks: [], // 附加险信息
      itemName: '', // 销售计划产品名字
      switchRisk: false, // 显示险种组件
      riskData:{}, //收集附加险信息
      saleInfoMain:'',
      funId: null, //防抖函数全局计时器
      addRisksInner:[],// 附加险增加selectable/active/basePrem
      saleInfoMainCopy:'', // 主险试算成功传给附加险
      mainRiskParam:{}, // 主险的请求参数
      initRequerstFlag: false, // 试算第一次请求成功
      disableSaveFalg:false,// 主险试算失败时，限制‘确认’按钮的请求
      popInpopFlag: false, // 弹层中有弹层时（单纯为了样式显示）
      popInpopFlagCopy:false,// 还没想好怎么用？？（单纯为了样式显示）
      clientScroll: 0,// 记录之前滚动的样式（纯页面展示）
    }
  },
  computed: {
    // 根据投保人生日算年龄
    calAppntAge(){ // birthAge:"27Y" birthAgeNum:"27" birthAgeUnit:"Y"
      return this.appntInfo.birthday ? this.getBirthAge(this.appntInfo.birthday) : ''
    },
    // 计算附加险(动态控制selectable/active)
    calAddRisksInner(){
      let arr = [].concat(this.addRisksInner)
      arr.forEach((el,index)=>{
        console.log('%c' + el.addRiskBasic.riskName + 'calAddRisksInner','color:purple',el.applyRule,this.getEvalResult('',el.applyRule,el))
        if (el.addRiskBasic.required == '1') {
          el.selectable =  false
          el.active = true
        }else{
          el.applyRule ? el.selectable = this.getEvalResult('',el.applyRule,el) : true
          if (el.selectable) {
            let now = el.active
            el.active = now ? true : false
          }else {
            el.active = false
          }
        }
        if(el.addRiskBasic.needAppnt === '1'){
          el.selectable = this.isChoosedAppnt ? this.isSamePerson ? false: el.selectable : false
          el.active = this.isChoosedAppnt ? this.isSamePerson ? false: el.active : false
        }
      })
      return arr
    },
    calAddRisksInnerDTO(){
      let obj = {}
      this.calAddRisksInner.forEach(el => {
        obj[el.addRiskBasic.riskCode] = el
      })
      return obj
    },
    // 计算已经选择的的附加险
    selectedAddRiskCodes() {
      let arr = []
      this.addRisksInner.forEach(el => {
        if (el.active) {
          arr.push(el.addRiskBasic.riskCode)
        }
      })
      return arr
    },
    // 计算试算用的参数（watch此对象，触发试算）
    calMainRiskPrem() {
      console.log(this.saleInfoMain)
      if(this.saleInfoMain === ''){
        return true
      }
      let obj = {
        itemCode: this.mainRisk.espItemCode,
        mainRiskCode: this.mainRisk.riskCode,
        type: 'LXB',
        system: 'hr',
        occupationRank:this.saleInfoMain.occupationRank,
        riskData: {
          ['risk_' + this.mainRisk.riskCode]: {
            riskCode: this.mainRisk.riskCode,
            riskName: this.mainRisk.riskName,
            isMainRisk: '1',
            mainRiskCode: this.mainRisk.riskCode,         
            insuYearFlag: this.saleInfoMain.insurePeriodStr.substring(this.saleInfoMain.insurePeriodStr.length - 1),
            insuYear: this.saleInfoMain.insurePeriodStr.substring(0, this.saleInfoMain.insurePeriodStr.length - 1 ),
            payIntv: this.saleInfoMain.payIntv,
            payYears: this.saleInfoMain.payYears,
            payEndYearFlag: this.saleInfoMain.payEndYearStr.substring(this.saleInfoMain.payEndYearStr.length - 1),
            payEndYear: this.saleInfoMain.payEndYearStr.substring(0,this.saleInfoMain.payEndYearStr.length - 1),
            getYearFlag: this.saleInfoMain.getYearStr.substring(this.saleInfoMain.getYearStr.length - 1),
            getYear: this.saleInfoMain.getYearStr.substring(0,this.saleInfoMain.getYearStr.length - 1),         
            liveGetMode: '',
            getIntv: this.saleInfoMain.getIntv,
            mult: this.saleInfoMain.mult.toString(),
            planLevel: this.saleInfoMain.planLevel,
            dutyCodeList: this.saleInfoMain.dutyCodeList, //
            openFlag: true,
            isHaveAppnt: false,
            isHaveInfo: true,
            isAnnuity: this.mainRisk.isAnnuity, // 年金
            amt:this.saleInfoMain.baseAmount,
            prem:this.saleInfoMain.basePrem
          }
        },
      }
      return obj
    },
  },
  watch: {
    // watch主险的变化，调试算接口请求主险的保额保费
    calMainRiskPrem(newVal, oldVal) {
      if(JSON.stringify(newVal) != JSON.stringify(oldVal) ){
        let appntDTO = {
          birthday:'',
          sex:''
        }
        if(this.isChoosedAppnt && !this.isSamePerson ){ // 选择投保人，非被保人
          appntDTO = {
            birthday: this.appntInfo.birthday,
            sex: this.appntInfo.sex,
          }
        }else if(this.isChoosedAppnt && this.isSamePerson){ // 选择投保人，且同被保人(处理只有年龄没有生日的时候)
          appntDTO = {
            birthday: this.insureInfo.birthday,
            sex: this.insureInfo.sex,
            age:this.insureInfo.age
          }
        }
        let chargeParamsObj = { // 重新拼接参数
          platformType: 'ESP',
          platformSubType: 'LXB',
          appntDTO:appntDTO,
          insuredDTO:{ // 再次整合被保人信息（calMainRiskPrem中的insuredDTO携带页面仅显示的字段）
            birthday: this.insureInfo.birthday,
            sex: this.insureInfo.sex,
            age: this.insureInfo.age, // 年龄传来的肯定是周岁单位
            isHaveSocial: this.insureInfo.isHaveSocial, // 社保
            // occupationType: this.saleInfoMain.occupationalCategory //  职业
          },
          planDTOs:[{
            planCode:this.mainRisk.productCode,
            salesPlanCode:this.itemCode, // 存储的as的code
            occupationRank: this.saleInfoMain.occupationRank, // 职业等级（默认是‘’）
            riskDTOs:[newVal.riskData['risk_' + this.mainRisk.riskCode]] // 先整合主险
          }]
        }
        this.mainRiskParam = {...chargeParamsObj} // 存储主险试算参数
        if (this.mainRisk.calMode != '3') { // mainRiskParam都需要整合，但只有calMode！=3时才请求
          let fun = this.debounce(this.getMainRiskPrem, 500)
          fun(newVal, chargeParamsObj)
        }else{
          this.saleInfoMainCopy = {...this.saleInfoMain}
          this.initRequerstFlag = true
          Toast.hide()
        }
      }
    },
    // popInpopFlag(newVal, oldVal){
    //   if(oldVal && !newVal){
    //     // this.$nextTick(()=>{
    //     //   console.log(this.popInpopFlag)
    //     this.$refs.scrollView.scrollTo(0,this.clientScroll*1,false)
    //     // })
    //   }
    // }
  },
  created() {
    // // 整合产品明细Prop数据->data属性
    this.distributePrdDetail(this.prdDetailObjProps)
  },
  methods: {
    // 整合产品明细->data属性
    distributePrdDetail(res){
      this.mainRisk = res.data.mainRisk
      this.addRisks = res.data.addRisks
      this.itemName = res.data.itemName
      this.switchRisk = true
      this.addRisksInner = this.addRisks.map(el =>{
        return {
          ...el,...{
            'selectable':true,
            'active':false,
            'basePrem':''
          }
        }
      })
      // 将组合计划书缓存的数据->主附险的session属性中（用户回显）
      if(this.complexProposalItem.length>0){
        this.complexProposalItem.forEach(item=>{
          if(item.riskCode === this.mainRisk.riskCode){
            this.$set(this.mainRisk,'session',item)
          }else{
            this.addRisksInner.forEach((el,index)=>{
              if(el.addRiskBasic.riskCode === item.riskCode){
                this.$set(this.addRisksInner[index],'session',item)
                this.$set(this.addRisksInner[index],'active',true)
              }
            })
          }
        })
      }
    },
    // 获取附加险信息
    getOutputAddRisk(data) {
      console.log('getOutputAddRisk')
      console.log(data)
      // 互斥
      if (data.rejectRisks) {
        data.rejectRisks.forEach(el => {
          this.addRisksInner.forEach(el2 => {
            if (el2.addRiskBasic.riskCode == el) {
              if (data.active && el2.active) {
                el2.active = false
              }
            }
          })
        })
      }
      // 共生
      if (data.relatedRisks) {
        data.relatedRisks.forEach(el => {
          this.addRisksInner.forEach(el2 => {
            if (el2.addRiskBasic.riskCode == el) {
              el2.active = data.active
            }
          })
        })
      }
      data.active ? this.$set(this.riskData, 'risk_' + data.riskPremInfo.riskCode, data.riskPremInfo): false
    },
    // 获取主险的页面选项内容
    getOutputMainInfo(data) {
      console.log('getOutputMainInfo',data)
      // amtPremMaP作用：将保额保费都换算为单位为‘元’
      let amtPremMaP = { baseAmount:'', basePrem:'' }
      // 0-录保费算保额 1-录保额算保费 2-选保额算保费 3-录入保额保费（无试算）
      if (this.mainRisk.calMode === '0') {
        amtPremMaP.baseAmount  = ''
        amtPremMaP.basePrem  = data.basePrem * this.getRate(data.calRulePremStep.premStepUnit)
      } else if (this.mainRisk.calMode == '1') {
        amtPremMaP.baseAmount = data.baseAmount * this.getRate(data.calRuleAmountStep.amountStepUnit)
        amtPremMaP.basePrem = ''
      } else if (this.mainRisk.calMode == '2') {
        amtPremMaP.baseAmount = data.baseAmount
        amtPremMaP.basePrem = ''
      // } else if (this.mainRisk.calMode === '3' && data.basePrem && data.baseAmount) {
      } else if (this.mainRisk.calMode === '3') {// HRAS_4，保额可以最小可以为0，所以模式判断全部不加保额保费的判断
        amtPremMaP.baseAmount = data.baseAmount * this.getRate(data.calRuleAmountStep.amountStepUnit)
        amtPremMaP.basePrem = data.basePrem * this.getRate(data.calRulePremStep.premStepUnit)
      }
      this.saleInfoMain = {...this.saleInfoMain,...data,...amtPremMaP}
      console.log(this.saleInfoMain)
    },
    // 获取主附险是不是还有弹层
    getOutputSwitch(flag){
      if(flag){
        this.clientScroll = this.$refs.scrollView.scrollY
        this.popInpopFlag = flag
      }else{
        this.popInpopFlag = flag
          setTimeout(()=>{
            this.$refs.scrollView.scrollTo(0,this.clientScroll*1,true)
          },500)
      }
    },
    // 试算（只试算主险）
    getMainRiskPrem(newVal, params) {
      return plan.getNewInsureCharge(params).then(res => {
        Toast.hide()
        this.initRequerstFlag = true
        let amtPremMap = {}
        if (res.result === '0') {
          if(res.removePlanCodes.length > 0){
            this.disableSaveFalg = true // 入参不合法的试算出错
            return Toast.info('当前选项不支持投保，请重新选择！')
          }
          this.disableSaveFalg = false // 试算成功，‘确认’按钮可正长点击
          // 0-录保费算保额 1-录保额算保费 2-选保额算保费 3-录入保额保费（无试算）
          if (this.mainRisk.calMode == '0') {
            amtPremMap = {
              baseAmount:res.planInsuraMap[this.mainRisk.productCode][0].amt*1
            }
          } else if (this.mainRisk.calMode == '1' || this.mainRisk.calMode == '2') {
            amtPremMap = {
              basePrem:res.planInsuraMap[this.mainRisk.productCode][0].prem*1,
            }
          }
        } else {
          this.disableSaveFalg = true // 试算请求出错时
          Toast.info(res.resultMessage)
        }
        this.saleInfoMainCopy = Object.assign({},this.saleInfoMain,amtPremMap)
        console.log(this.saleInfoMainCopy)
      })
    },
    // 组合计划书‘确认’按钮，总的试算
    toGetAllRiskPrem(){
      if(this.disableSaveFalg){ // 主险试算出错
        return Toast.info('主险当前选项不支持投保，请重新选择！')
      }
      let self = this
      this.$nextTick(function () { // 解决录入步进选项的失去焦点事件
        //DOM 更新了
        self.$refs.inputVal.focus()
      })
      setTimeout(function () { // 解决录入步进选项的失去焦点事件
        // let allRiskParam = {...self.mainRiskParam}
        let allRiskParam = JSON.parse(JSON.stringify(self.mainRiskParam))
        self.calAddRisksInner.forEach((el)=>{
          if (el.active) {
            if (self.riskData['risk_' + el.addRiskBasic.riskCode]) { // riskData是收集的附加险页面选项数据
              allRiskParam.planDTOs[0].riskDTOs.push(self.riskData['risk_' + el.addRiskBasic.riskCode])  // 整合附加险
            }
          }
        })
        self.getAllRiskPrem(allRiskParam)
      },500)
    },
    // 试算（确认时总的试算）
    getAllRiskPrem(allRiskParam) {
      Toast.loading()
      console.log(`-->'确定'保费试算：${JSON.stringify(allRiskParam)}`);
      return plan.getNewInsureCharge(allRiskParam).then(res => {
        Toast.hide()
        console.log(`<--'确定'保费试算：${res ? JSON.stringify(res):res}`);
        if(res.result === '0'){
          if(res.removePlanCodes.length > 0){
            return Toast.info('当前选项不支持投保，请重新选择！')
          }
          // 此组件确定planInsuraMap就一个key
          let productCode = Object.keys(res.planInsuraMap)[0]
          let planInsuraMapCopy = res.planInsuraMap[productCode].map(itim =>{ // 主要是拼接riskname
            if(itim.riskCode === this.mainRisk.riskCode){
              return {...itim,...{riskName:this.mainRisk.riskName}}
            }else{
              return {...itim,...{riskName:this.riskData[`risk_${itim.riskCode}`]['riskName']}}
            }
          })
          let chargeAllPremObj = {// 组合计划书的一组
            planCode:productCode, // productCode
            total:res.planPremMap[productCode],
            riskName:this.mainRisk.riskName,
            planCodePremObj:planInsuraMapCopy,// 表格数据
            planDTOsItem: allRiskParam.planDTOs[0] // 试算参数数据(一是外部试算/二是回显)  
          }
          this.$emit('outputAllInfo',chargeAllPremObj)
          this.switchComplexEvent() // 组件隐藏
        }else{
          Toast.hide()
          Toast.info(res.resultMessage)
        }
      })
    },
    // 防抖函数，解决多次试算问题
    debounce(fun,delay){
      return (args,params)=>{
        clearTimeout(this.funId)
        this.funId = setTimeout(()=>{
          fun(args,params)
        },delay)
      }
    },
    // eval判断语句
    getEvalResult(type, evalStr, el) {
      let insuredAgeDay = this.insureInfo.unit == "D" ? this.insureInfo.ageDay ? this.insureInfo.ageDay : 0
        : this.insureInfo.age*365
      let insuredAge = this.insureInfo.unit == "Y" ? this.insureInfo.age : 0
      let appntAge = this.calAppntAge ? this.calAppntAge.birthAgeNum * 1 : ''
      let insuredSex = this.insureInfo.sex
      let payIntv = parseInt(this.saleInfoMain.payIntv)
      let payYear = ""
      if (type == "payIntv") {
        payYear = el.payIntv == "0" ? 1 : 999
      } else if (type == "getYear") {
        payYear = parseInt(this.saleInfoMain.payEndYearStr.substring(0, this.saleInfoMain.payEndYearStr.length - 1))
      }
      let insuredPeriod = parseInt(this.saleInfoMain.payEndYearStr.substring(0,this.saleInfoMain.payEndYearStr.length - 1))
      let prem = ""
      let amount = ""
      let mult = ""
      let amountLevel = ""
      let socialSecurity = this.insureInfo.isHaveSocial ? 1 : 0 // 社保
      let mainRisk = {
        payYear: parseInt(this.saleInfoMain.payEndYearStr.substring(0,this.saleInfoMain.payEndYearStr.length - 1)),
        payIntv: parseInt(this.saleInfoMain.payIntv),
        insuredPeriod: "",
        prem:  parseInt(this.saleInfoMainCopy.basePrem),
        amount:  parseInt(this.saleInfoMainCopy.baseAmount),
        riskCode: this.mainRisk.riskCode
      }
      let selectedAddRiskCodes = this.selectedAddRiskCodes
      // 同一人
      let insuredAppntRealation = this.isSamePerson ? '00':'';
      return eval(evalStr)
    },
    // 控制险种组件显示
    switchComplexEvent(){
      this.$emit('switchComplexEvent',false)
    }
  }
}
</script>
<style lang="less" scoped>
  .popup-inner{
    // height: 880px;
    height: 920px;
    background-color: #ffffff;
    position: relative;
    padding: 0 30px;
    overflow: hidden;
    .title {
      font-size: 34px;
      font-family: PingFangSC;
      font-weight: 500;
      color: #333333;
      text-align: center;
      padding: 38px 0;
      display: block;
      margin: auto;
    }
    .md-icon {
      position: absolute;
      top: 38px;
      right: 30px;
      color: #000000;
    }
    .popup-inner-container{
      // height: 766px;
      height: 806px;
      overflow: auto;
    }
    .popup-inner-container-flag{
      // height: 656px !important;
      height: 696px !important;
    }
    .complex-button{
      // width:658px;
      width: 100%;
      height:80px;
      line-height: 80px;
      margin: 0 auto;
      background:rgba(47,134,246,1);
      border-radius:4px;
      font-size:32px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
    }

  }
  .show-client-height{
    // height: 766px;
    height: 806px;
    overflow: hidden;
  }
</style>