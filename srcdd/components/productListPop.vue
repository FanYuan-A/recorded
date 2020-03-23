<template>
  <div v-if="productLis.length>0 && productListAges">
    <section class="productlist-checked">
      <div @click="conditionIsShow? choosedProductList(): conditionIsShow = true ">
        <!-- 全部筛选条件 -->
        <p class="productlist-checked-all" v-if="conditionLabelArr[0].length ===0 && conditionLabelArr[1].length ===0 &&conditionLabelArr[2].length ===0 ">
          <span>全部</span> 
          <i v-if="!conditionIsShow" class="iicon md-icon icon-font md-icon-arrow-down arrow-down lg"></i>
          <i v-else class="iicon md-icon icon-font md-icon-arrow-up arrow-up lg"></i>
        </p>
        <!-- 已选筛选条件 -->
        <p class="productlist-checked-some" v-else>
          <section class="productlist-checked-some-container">
            <span class="" v-for="(item,index4) in conditionLabelArr" :key="index4" v-show="item.length>0">
              <span class="productlist-checked-item" v-for="(subitem,index5) in item" :key="index5">
                {{subitem}}
              </span>
            </span>
          </section>
          <span class="productlist-checkout-many" v-show="(conditionLabelArr[0].length+conditionLabelArr[1].length+conditionLabelArr[2].length) > 4 ">...</span>
          <i v-if="!conditionIsShow" class="icon-2 md-icon icon-font md-icon-arrow-down arrow-down lg"></i>
          <i v-else class="icon-2 md-icon icon-font md-icon-arrow-up arrow-up lg"></i>
        </p>
      </div>
    </section>
    <template>
      <!-- 产品列表 -->
      <section v-if="!conditionIsShow" class="popup-inner-pop">
        <div class="company-name">
            <p v-for="(item,index0) in companysNameArr" :key="index0"  
            @click="chooseCompany(item.code)"
            :class="{'company-name-active':companyItemCode === item.code}">
              {{item.label}}
            </p>
        </div>
        <div class="company-list">
          <md-scroll-view :scrolling-x="false" :auto-reflow=true>
          <!-- 新一期不支持互联网 -->
          <button v-bind:disabled="el.channel == 'internet' || isInRange(el.channel == 'internet',el.itemCode) !== true"
            v-for="(el,index1) in choosedConditionProductList" :key="index1"
            v-show="el.companyTag === companyItemCode"
            @click="outputProductCode(el.channel == 'internet',el.itemCode)">
            <p>{{el.productName}}</p>
          </button>
          </md-scroll-view>
        </div>
      </section>
      <!-- 筛选条件 -->
      <section class="condtion-container" v-else>
        <md-scroll-view :scrolling-x="false" :auto-reflow=true>
        <p class="condtion-btn"><span @click="choosedProductList()">确定</span></p>
        <div class="condtion-inner-container" v-show="index2 > 0 && index2 !== 3" v-for="(elment,index2) in screenCondition" :key="index2">
          <p>{{elment.label}}</p>
          <div class="condtion-inner">
            <span @click="choosedCondition((index2-1),cod.code,cod.label)"
             v-for="(cod,index3) in elment.list" :key="index3" v-show="cod.code !== 'internet'"
             :class="{'condtion-inner-active':conditionArr[(index2-1)] && ~conditionArr[(index2-1)].indexOf(cod.code)}" 
             >{{cod.label}}</span>
          </div>
        </div>
        </md-scroll-view>
      </section>
    </template>
  </div>
</template>
<script>
/* eslint-disable */
import as from '@/api/as.js'
import { Toast ,ScrollView} from 'mand-mobile'
export default {
  components:{
    [ScrollView.name]:ScrollView
  },
  props: {
    // prdListObjProps:{
    //   type:[Object],
    //   default(){
    //     return {}
    //   }f
    // }
    calBirthAge: {
      type: [Object,String],
      required: true
    },
    calAppntAge: {
      type: [Object,String],
      required: true
    },
    switchProductList:{
      type: [Boolean],
      required: true
    }
	},
	data(){
		return {
			screenCondition: [], // 所有的（req返回）筛选条件
      productLis:[],//  整合所有的产品列表数组
      companysNameArr:[],// 有可选列表的保险公司数组
      companysDataObj: {}, // 所有的保险公司code:list ++
      companyItemCode:'', // 选中的保险公司code
      conditionIsShow:false, // 筛选条件显示
      conditionArr:[[],[],[]],// 选择条件的数组（用作筛选参数）
      conditionLabelArr:[[],[],[]],// 选择条件的label数组（纯展示用）
      choosedConditionProductList:[], // 选择的展示产品列表
      requestObj:'', // 请求数据
      productListAges:'',// 产品列表的对应年龄
		}
  },
  watch:{
    'calBirthAge.birthAge':{
      handler(){
        console.log(this.calBirthAge.birthAge)
      },
      immediate:true
    },
    isAllResOver(newVal,oldVal){ // 初始化就出发组件内请求，所以要监控所有请求完成再去除loading标志
      if(newVal){
        this.$emit('outputProductRes',newVal)
      }
    },
    switchProductList(newVal,oldVal){ // 主要是为了页面展示效果，（打开组件初始化时一直显示产品列表，不显示筛选列表）
      if(newVal === false){
        this.conditionIsShow = false
      }
    },
    
  },
	created(){
    this.getProdutList()
    this.getProductAge()
  },
  computed:{
    isAllResOver(){ // 产品列表和对应年龄请求完毕
      return this.requestObj !== '' && this.productListAges !== ''
    }
  },
  mounted(){
  },
	methods:{
    // 获取列表，整合data数据属性
    distributeProductObj(res){
      this.screenCondition = [ // 所有的筛选条件
        {
          label:'保险公司',
          list: [] // 筛选非互联网的保险公司
        },
        {
          label:'产品类型',
          list: res.data.kinds
        },
        {
          label:'目标客户',
          list:res.data.targets
        },
        {
          label:'产品渠道',
          list: res.data.channel
        }
      ]
      let companysDataArr = [] // 整合的产品列表数组
      let itemsDetailsKeys = Object.keys(res.data.itemsDetails) // 所有的产品的itemcode数组
      itemsDetailsKeys.forEach((el)=>{
        let itemRisk =  res.data.itemsDetails[el] // 从itemsDetails查找对应的产品
        companysDataArr.push({...itemRisk,...{'itemCode':el}})
      })
      companysDataArr.forEach((el,index)=>{
        if(el.channel === 'internet'){ // 筛除‘互联网’的产品
          this.companysDataObj[el.companyTag] ? true : this.companysDataObj[el.companyTag] = []
        }else{ // 初始化可以选择的产品
          this.companysDataObj[el.companyTag] ? this.companysDataObj[el.companyTag].push(el) : this.companysDataObj[el.companyTag] = [el]
          this.productLis.push(el) // 初始化筛除页面所有‘线下’的产品列表
        }
      })
      res.data.companys.forEach(el =>{ // 保险公司没有可选产品。该公司就不显示
        if(this.companysDataObj[el.code].length > 0){
          this.companysNameArr.push(el) // 有列表的保险公司才会显示再‘页面筛选公司’一列
        }
      })
      this.screenCondition[0]['list'] = this.companysNameArr // 初始化所有可选的保险公司（点筛选条件时，此为筛选的总数组）
      this.companyItemCode = this.companysNameArr[0]['code']
      this.choosedConditionProductList = this.productLis // 
    },
    // 点击筛选条件item
    choosedCondition(index,subitem,label){ // 现在code和label两个属性分开存储在两个数组中
      if(this.conditionArr[index].length >0 && this.conditionArr[index].indexOf(subitem) !== -1){ // 已经选择的条件再次点击
        this.conditionLabelArr[index].splice(this.conditionArr[index].indexOf(subitem),1) 
        this.conditionArr[index].splice(this.conditionArr[index].indexOf(subitem),1)
      }else{
        this.conditionArr[index].push(subitem)
        this.conditionLabelArr[index].push(label)
      }
    },
    // 选择保险公司
    chooseCompany(code){
      this.companyItemCode = code // 确定显示的保险公司code
      // this.toConditionPList() // to筛选列表
    },
    // 筛选条件确定事件
    choosedProductList(){
      this.toConditionPList() // to筛选列表
    },
    // 根据筛选条件选择列表
    toConditionPList(){
      this.choosedConditionProductList = []
      this.companysDataObj = {}
      this.productLis.forEach(el=>{
        let kindTagArr = '',targetsArr=''
        // channel 互联网/线下 ：String类型
        if(this.conditionArr[0].length>0 && el.kindTag.length >0){
          kindTagArr = this.isExistArr(this.conditionArr[0],el.kindTag,[])
        }
        if(this.conditionArr[1].length>0 && el.targetTag.length >0){
          targetsArr = this.isExistArr(this.conditionArr[1],el.targetTag,[])
        }
        // 下面就是筛选条件判断了！！
        if(((kindTagArr && kindTagArr.length>0)|| this.conditionArr[0].length === 0) &&
          ((targetsArr && targetsArr.length >0 )|| this.conditionArr[1].length === 0) && 
          ((this.conditionArr[2].length >0 && this.conditionArr[2].indexOf(el.channel) >= 0) || this.conditionArr[2].length === 0)
        ){
          this.companysDataObj[el.companyTag] ? this.companysDataObj[el.companyTag].push(el) : this.companysDataObj[el.companyTag] = [el]
          this.choosedConditionProductList.push(el)
        }
      })
      this.companysNameArr = []
      this.screenCondition[0]['list'].forEach(companyItem =>{
        if(this.companysDataObj[companyItem.code]){ // 保险公司有可选产品才会显示在‘页面公司列表’一列
          this.companysNameArr.push(companyItem)
        }
      })
      // 筛选后，如果之前所选的公司没有可选产品，要重新选择公司
      if(!this.companysDataObj[this.companyItemCode] && this.companysNameArr.length >0){
        this.companyItemCode = this.companysNameArr[0]['code']
      }
      this.conditionIsShow = false
    },
      /**
     *  判断一个数组中是否含有另一个数组
     *  arr1 被筛选数组
     *  arr2 筛选数组
     *  new_arr 返回的数组
     */
    isExistArr(arr1, arr2, new_arr) {
      arr1.forEach((item) => {
        if(arr2.indexOf(item) !== -1){
          new_arr.push(item)
        }
      })
      console.log(arr1, arr2, new_arr)
      return new_arr
    },
    // 将选择的产品itemcode传出去
    outputProductCode(flag,code){
      if(flag){
        Toast({
          content: '该险种现在不支持此功能！',
          position: 'bottom',
        })
      }else{
        this.$emit('outputProductCode', code)
      }
    },
    // 获取产品列表
    getProdutList(){
      as.productList().then(
        res => {
          if(res) {
            if(res.result === '0') {
              this.requestObj = res
              this.distributeProductObj(res)
            }else {
              Toast.failed(res.resultMessage)
              this.showMessage = ''
            }
          }
        }
      )
    },
    // 获取产品列表对应的年龄
    getProductAge(){
      as.getProductAge().then(res => {
        this.productListAges = res.data
      })
    },
    // 是不是在可选的范围内
    isInRange(flag, itemCode){
      if(flag){
        return false
      }else{
        if(this.productListAges[itemCode]){
          let appntAgeObj = JSON.parse(this.productListAges[itemCode]['appntAge'])
          let insuredAgeObj = JSON.parse(this.productListAges[itemCode]['insuredAge'])
          let isAppntLegal = this.calAppntAge['birthAgeNum'] < appntAgeObj['maxAge'] ? true : false // 投保人年龄在产品允许范围内
          let isInsureLegal = false
          if(this.calBirthAge.birthAgeUnit === 'D'){
            isInsureLegal = insuredAgeObj.minAgeFlag === 'D' && parseInt(this.calBirthAge['birthAgeNum']) > parseInt(insuredAgeObj['minAge']) ? true : false 
          }else{ //this.calBirthAge.birthAgeUnit === 'Y'
            isInsureLegal = ((insuredAgeObj.maxAgeFlag === 'A' && parseInt(this.calBirthAge['birthAgeNum']) < parseInt(insuredAgeObj['maxAge'])) && (
              insuredAgeObj.minAgeFlag === 'D' || 
              (insuredAgeObj.minAgeFlag === 'A' && parseInt(this.calBirthAge['birthAgeNum']) > parseInt(insuredAgeObj['minAge']))
            )) ? true : false
          }
          return isAppntLegal && isInsureLegal
        } else{
          return false
        }
      }
    },
	}
}
</script>
<style scoped  lang="less">
.productlist-checked{
  padding:0 40px;
  height:76px;
  font-size:30px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:76px;
  div{
    display: flex;
    p{
      flex: 1;
      &.productlist-checked-all{
        span{
          font-size:30px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(51,51,51,1);
        }
      }
      .iicon{
        padding-left: 30px;
        width: 42px;
        font-size: 36px;
        vertical-align: middle;
      }
      &.productlist-checked-some{
        // width: 500px;
        height: 76px;
        overflow: hidden;
        font-size:24px;
        display: flex;
        .productlist-checked-some-container{
          flex: 1;
          span{
            &.productlist-checked-item{
              display: inline-block;
              height: 45px;
              line-height: 45px;
              padding: 0 20px;
              background:rgba(234,234,234,1);
              border-radius:23px;
              font-size:24px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(153,153,153,1);
              margin-right: 30px;
            }
          }
          .productlist-checkout-many{
            display: inline-block;
            height: 0.38rem;
            line-height: 32px;
            border-radius: 0.23rem;
            font-size: 0.24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            margin-right: 0.3rem;
          }
        }
        .icon-2{
          vertical-align: middle;
          max-width: 42px;
          padding-left: 30px;
          font-size: 36px;
          position: relative;
          top: 12px;
        }
      }
    }
  }

}
.popup-inner-pop{
  display: flex;
  border-top: 2px solid rgba(231,231,231,1);
}
  .company-name{
    height: 718px;
    overflow: auto;
    flex: 1;
    max-width: 192px;
    text-align: center;
    background:rgba(241,241,241,1);
    p{
      height:92px;
      font-size:28px;
      font-family:PingFangSC-Regular,PingFang SC;
      // font-weight:400;
      font-weight: bold;
      color:rgba(51,51,51,1);
      line-height:92px;
      background:rgba(241,241,241,1);
    }
    .company-name-active{
      background: #fff;
    }
  }
  .company-list{
    height: 718px;
    overflow: auto;
    background: #ffffff;
    flex: 2;
    padding-left: 40px;
    button{
      display: block;
      // width: 240px;
      border: none;
      outline: none;
      background: inherit;
      height:92px;
      font-size:30px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      overflow: hidden;
      text-align: left;
      &.company-item-disable{
        color: #999999;
      }
      p{
      //   height:92px;
        line-height: 46px;
      //   text-align: left;
      //   overflow: hidden;  //溢出内容隐藏
      //    -webkit-line-clamp: 2;
      //   // white-space: nowrap;  //强制文本在一行内显示
      //   text-overflow: ellipsis; //当对象内文本溢出时显示省略标记
      }
    }
    button[disabled] {
      color: #999999 !important;
    }
  }
  .condtion-container{
    border-top: 2px solid #e7e7e7;
    padding: 0 40px;
    height: 670px;
    overflow: auto;
    .condtion-btn{
      height:98px;
      span{
        display: block;
        text-align: center;
        width:190px;
        height:66px;
        background:rgba(58,129,246,1);
        border-radius:4px;
        font-size:28px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:66px;
        margin-top: 32px;
        float: right;
      }
    }
    .condtion-inner-container{
      p{
        height: 70px;
        line-height: 70px;
        font-size:30px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(62,62,62,1);
      }
      .condtion-inner{
        font-size:26px;
        span{
          display: inline-block;
          width: calc(33% - 18px);
          text-align: center;
          height:76px;
          line-height: 76px;
          background:rgba(244,244,244,1);
          border-radius:10px;
          // border:2px solid rgba(58,129,246,1);
          font-size:26px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:#333333;
          margin-bottom: 20px;
          &:nth-child(2){
            margin: 0 20px;
          }
          &:nth-child(3n+2){
            margin: 0 20px;
          }
          &.condtion-inner-active{
            border:2px solid rgba(58,129,246,1);
            color:rgba(58,129,246,1);
          }
        }
      }
    }
  }
</style>
