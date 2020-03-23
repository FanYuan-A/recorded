<template>
  <div id="proposal-make">
    <div class="proposal-make-inner">
      <!-- 被保人生日/ 性别 -->
      <md-field>
        <div class="m-title"><i></i>被保人信息</div>
        <md-field-item solid title="性别" class="no-padding border-bottom">
          <div class="field-right">
            <div class="item-block" v-for="(item,index) of optionSex" :key="index" @click="selectSex(item,'Insured')"
              :class="{'item-block-inner-active':insureInfo.sex == item.value}">
              <div class="item-block-inner">{{item.label}}</div>
            </div>
          </div>
        </md-field-item>
        <md-field-item solid title="年龄" class="no-padding border-bottom">
          <div class="field-right">
            <div class="birthday" @click="toSwitchDatePicker('Insured','请选择被保人生日')">
              <span :class="{'active':!!insureInfo.birthday}">{{insureInfo.birthday ? insureInfo.birthday : '请选择生日'}}</span>
              <md-icon name="arrow-right"></md-icon>
            </div>
            <div class="age" @click="switchPicker = true">
              <span :class="{'active':!!insureInfo.age}">{{calAge}}</span> <md-icon name="arrow-right" class="age-arrow-right"></md-icon>
            </div>
          </div>
        </md-field-item>
        <md-field-item solid title="有无社保" class="no-padding border-bottom">
          <div class="field-right">
            <div class="item-block" v-for="(item,index) of optionSocialSecurity" :key="index" @click="selectSocialSecurityFlag(item)"
              :class="{'item-block-inner-active':insureInfo.isHaveSocial == item.value}">
              <div class="item-block-inner">{{item.label}}</div>
            </div>
          </div>
        </md-field-item>
      </md-field>
      <!-- 投保人生日 / 性别 -->
      <md-field :class="{'add-padding':isSamePerson}">
        <div class="m-title" @click="selectSamePerson">
          <i></i>投保人信息（豁免相关）
          <span class="md-radio-container">
            <i v-if="isSamePerson" class="md-icon icon-font md-icon-check check md"></i>
            <i v-else class="md-icon icon-font md-icon-checked checked md"></i>
            <!-- <md-agree v-model="isSamePerson" :size="'md'" ></md-agree> -->
          </span>
        </div>
        <section v-show="!isSamePerson">
          <md-field-item solid title="性别" class="no-padding border-bottom">
            <div class="field-right">
              <div class="item-block" v-for="(item,index) of optionSex" :key="index" @click="selectSex(item,'Appnt')"
                :class="{'item-block-inner-active':appntInfo.sex == item.value}">
                <div class="item-block-inner">{{item.label}}</div>
              </div>
            </div>
          </md-field-item>
          <md-field-item arrow class="no-padding border-bottom"
            title="出生日期" @click.native="toSwitchDatePicker('Appnt','请选择投保人生日')">
            <div class="field-right">
              <p v-show="appntInfo.age && appntInfo.birthday === ''" class="birthday1"><span>{{appntInfo.age}}周岁</span></p>
              <p  v-show="appntInfo.birthday" class="birthday1">
                <span :class="{'active':!!appntInfo.birthday}">{{!!appntInfo.birthday ? appntInfo.birthday : '请选择投保人生日'}}</span>
              </p>
            </div>
          </md-field-item>
        </section>
      </md-field>
      <!-- 险种表格 -->
      <div class="insurance">
        <div class="insurance-title">
          <div class="m-title m-title-padding">
            <i></i>险种信息
          </div>
        </div>
        <ul class="complex-plan-container" v-if="complexProposalArr.length >0">
          <li v-for="(item,index0) in complexProposalArr" :key="index0">
            <p class="complex-plan-title">
              <span class="complex-plan-label">{{item.riskName}}</span>
              <span class="complex-plan-btn">
                <button @click="chooseComplexProposal(index0)">修改</button>
                <button class="complex-plan-delete" @click="deleteComplexProposal(index0)" style="display: none">删除</button>
              </span>
            </p>
            <p class="complex-plan-prem">首年保费：{{item.total}}</p>
            <div class="complex-plan-table">
              <div class="complex-plan-table-title">
                <div style="width: 30%"><span>险种</span></div>
                <div style="width: 24%"><span>保额</span></div>
                <div style="width: 24%"><span>保费</span></div>
                <div style="width: 22%"><span>交费期</span></div>
              </div>
              <div class="complex-plan-table-row" v-for="(iirisk,index1) in item.planCodePremObj" :key="index1">
                <div><span>{{iirisk.riskName}}</span></div>
                <div><span> <template v-if="iirisk.amt * 1 ==0 ">--</template> <template v-else>{{iirisk.amt}}</template> </span></div>
                <div><span>{{iirisk.prem}}</span></div>
                <div><span>{{iirisk.payYears}}</span></div>
              </div>
            </div>
            <div style="height: 20px;"><!--仅用于样式 --></div>
          </li>
        </ul>
        <p class="complex-productlist-container"  @click="switchProductList = true" style="display: none"><span class="complex-product-outer"> <span class="complex-product-add">+</span> 添加产品</span></p>
      </div>
      <!-- 封面信息 -->
      <div class="cover-info">
        <div class="cover-info-title">
          <div class="m-title m-title-padding">
            <i></i>封面信息
          </div>
        </div>
        <div class="cover-info-body">
          <span>敬呈客户</span><input v-model.trim="customerName" @blur="resizePage" placeholder="请输入投保人姓名（非必填）"/>
        </div>
      </div>
      <!-- IOS底部占位 -->
      <div style="height: 35px;"></div>

    </div>
    <!-- 底部btn + 保费 -->
    <div class="proposal-make-tab">
      <div class="clause" @click="clauseCfg.show = true">
        <img src="@/assets/icon/icon-doc.png"/>
        <span>产品条款</span>
      </div>
      <div class="left">
        <div v-if="!lockGetPrem" class="indicator">
          <md-activity-indicator
            v-if="!lockGetPrem"
            class="md-activity-indicator-css"
            type="carousel"
            :size="9"
            color="#FF823A"
            text-color="#FF823A"
          ></md-activity-indicator>
        </div>
        <div v-else class="total-prem">
          <div>首年保费</div>
          <div>
            <span>{{premiumLabel[0]}}</span><span>{{premiumLabel[1]}}元</span>
          </div>

        </div>
      </div>
      <div class="middle" @click="saveProposal"><div>生成计划书</div></div>
    </div>
    <md-date-picker
      v-model="switchDatePicker"
      v-if="switchDatePicker"
      type="date"
      :title="title"
      ref="datePicker"
      :default-date="datePickerData.currentDate"
      :min-date="datePickerData.minDate"
      :max-date="datePickerData.maxDate"
      :mask-closable="true"
      @confirm="onDatePickerConfirm"
    ></md-date-picker>
    <md-picker
      ref="picker"
      v-model="switchPicker"
      :data="calOptionAge"
      title="请选择被保人年龄"
      @confirm="onPickerConfirm"
    ></md-picker>
    <!-- 组合计划书组件 -->
    <md-popup v-if="switchComplex" v-model="switchComplex" position="bottom" :mask-closable="false">
      <complex-proposal
        v-if="switchComplex"
        :insureInfo="insureInfo"
        :appntInfo="appntInfo"
        :itemCode="itemCode"
        :occuptionRankProp="occuptionRankProp"
        :prdDetailObjProps="prdDetailObjProps"
        :complexProposalItem="complexProposalItem"
        v-model="lockGetPrem"
        @outputAllInfo="getOutputAllInfo"
        @switchComplexEvent="switchComplexFun"
        :isChoosedAppnt="isChoosedAppnt"
        :isSamePerson="isSamePerson"
      ></complex-proposal>
    </md-popup>
    <md-popup v-show="switchProductList" v-model="switchProductList" position="bottom" :mask-closable="false">
      <div class="popup-inner popup-inner-no">
        <span class="title">选择产品</span>
        <md-icon name="close" @click="switchProductList = false"></md-icon>
        <!-- switchProductList 是为了页面的交互所需 当关闭此组件时，组件中的筛选模块关闭 -->
          <productList-pop
          :switchProductList="switchProductList"
          :prdListObjProps="prdListObjProps"
          :calBirthAge="calBirthAge"
          :calAppntAge="calAppntAge"
          @outputProductCode="getOutputProductCode"
          @outputProductRes="getOutputProductRes"
          >
          </productList-pop>
      </div>
    </md-popup>
    <PopupClauseList :clause-cfg="clauseCfg" :immediate="false" @click="showClauseItem"/>
  </div>
</template>

<script>
/* eslint-disable */
import {Dialog, Field, FieldItem, DatePicker, Icon, InputItem, Picker, Popup, Toast, ActivityIndicator, Agree} from "mand-mobile";
import complexProposal from "@/components/riskContainer/complexProposal.vue"
import lxb from "@/api/lxb.js"
import plan from "@/api/plan.js"
import commonUtils from "@/utils/common.js"
import mixinForSaleInfo from "@/components/mixin/mixinForSaleInfo.js"
import productListPop from '@/components/productListPop.vue'
import PopupClauseList from "./PopupClauseList";
import customer from "../../api/customer";
// import proposalHelper from "./proposalHelper";
import weixin from '../../utils/weixin'
export default {
  name: "propsalCommake",
  components: {
    PopupClauseList,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [DatePicker.name]: DatePicker,
    [Icon.name]: Icon,
    [InputItem.name]: InputItem,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [ActivityIndicator.name]: ActivityIndicator,
    [Agree.name]:Agree,
    "complex-proposal": complexProposal,
    'productList-pop':productListPop,
  },
  mixins: [mixinForSaleInfo],
  updated(){
    if(this.loadFinished)
      commonUtils.closeGlobalMask();
  },
  data() {
    return {
      loadFinished:false,
      itemCode: '', // as用的产品code
      customerName:'',// 敬呈客户-名称
      // 产品条款及弹层配置
      clauseCfg:{
        show:false,// 是否显示弹层
        riskList:[// 险种列表
          {
            name:'',// 险种名称
            clauseList:[
              {
                name:'',// 条款名称
                href:''// 条款连接
              }
            ]
          }
        ],
      },
      mainRisk: {}, // 主险信息
      addRisks: [], // 附加险信息
      initAppntInsuredAge:{ // 初始化投被保人的起止年龄
        appntAgeMin:'18Y',
        appntAgeMax:'80Y',
        insuredAgeMin:'28D',
        insuredAgeMax:'80Y'
      },
      insureInfo: { // 被保人信息
        sex: "0",
        birthday: "",
        age: "",
        ageDay:'',
        unit: "Y", // 传入的年龄单位： 周岁(2020-1-7修改年龄真是传出 D/Y)
        isHaveSocial: true, // 有无社保（现放被保人层次）
      },
      appntInfo: { // 投保人信息
        birthday: "",
        sex: "0",
        age:''
      },
      prdListObjProps:'',// 产品列表数据
      prdDetailObjProps:{},// 产品详情的数据
      prdDetailObjMap:{},//  产品详情总的数据{hras_1:{},hras_2:{}}
      complexProposalArr:[], // 组合计划书缓存
      complexProposalItem:[], // 组合计划书的一列（条）中的试算参数（主附险的页面选项），用于组合计划书组件的页面回显
      occuptionRankProp: '', // 职业和试算险种数组同一层次，需要单独传
      leaveMessage:'',// 产品详情的留言内容
      // 性别选项
      optionSex: [
        {
          label: "男",
          value: "0"
        },
        {
          label: "女",
          value: "1"
        }
      ],
      //是不是同一人选项
      optionSamePerson:[
        {
          label: "是",
          value: true
        },
        {
          label: "否",
          value: false
        }
      ],
      //社保选项列表
      optionSocialSecurity: [
        {
          label: "有社保",
          value: true
        },
        {
          label: "无社保",
          value: false
        }
      ],
      datePickerData: {
        minDate: new Date(),
        maxDate: new Date(),
        currentDate:new Date(),
      },
      dateType: "", // 生日picker的type（投/被）
      title: "", // 生日picker的title（投/被）
      switchDatePicker: false, // 生日组件
      switchPicker: false, // 年龄组件
      isChoosedAppnt:true, // 是否选择投保人（2019-12-23改版：投保人必选）.现在保留此变量只是适应之前的逻辑，没有其他作用
      isSamePerson:true, // 投被人是不是同一人
      corfirmAgeFlag:false,// 选择年龄 / 性别 / 社保去试算
      switchComplex:false,// 组合计划书组件
      switchProductList:false,// 产品列表组件

      lockGetPrem: false, // 加载中锁定保费显示'...'
      payUnitMap:{ // 交费期间单位，（用于拼接详情页面带来的缓存显示）
        'Y':'年',
        'M':'月',
        'D':'天',
        'A':'岁'
      },
      isAllPrdResOver:false,
      isInitResOver:false,
      agentInfo:{},// 代理人信息
      // 用于生成本页所需的初始缓存的一些方法（原产品详情页抽取的能用到的代码）
      cacheHelper:{
        defaultOccupation:{
          'GH':{
            arr:['val1','val24','A101'],
            value:'1',
            label:'内勤人员'
          },
          'ZY':{
            arr:['val1','val24','A101'],
            value:'1',
            label:'内勤人员'
          },
          'XT':{
            arr:['val1','val45','val244','2129901'],
            value:'1',
            label:'内勤人员',
            option:[{},{},{},{
              category: "1",
              label: "内勤人员",
              value: "2129901"
            }]
          },
          'CS':{
            arr:['val1','val76','A01'],
            value:'1',
            label:'内勤人员'
          },
          'BAINIAN':{
            arr:['val2','val212','val21299','2129901'],
            value:'1',
            label:'内勤人员',
            option:[{},{},{},{
              category: "1",
              label: "内勤人员",
              value: "2129901",
            }]
          }
        },
        mainRisk:{},
        addRisks:[],
        appntInfo:{
          birthday:'',
          sex:'',
        },
        saleInfoMain:{
          mult:1, //份数
          sex:'0', //性别
          birthday:'', //被保人生日
          socialSecurityFlag:'', //社保标志
          occupationalCategory:'', //职业类别编码
          insurePeriodStr:'', //保险期间
          payIntv:'', //交费方式
          payEndYearStr:'', //交费期间
          getYearStr:'', //生存金领取
          basePrem:0, //需要录入的保费
          baseAmount:0, //需要录入的保额
        },
        /**
         * 获取代理人信息
         * @return {Promise<AxiosResponse<T>>}
         */
        async getAgentInfo(customer,token){
          console.log(`-->获取代理人信息：token:${token}`);
          let res = await customer.accountInfo({token:token});
          console.log(`<--获取代理人信息：${res ? JSON.stringify(res):res}`);
          return res;
        },
        /**
         * 模拟产品详情页制作保费试算结果缓存
         * （制作建议书页需要使用本缓存）
         * @param itemCode 产品代码-来自产品列表
         */
        async createPremiumTrialCache(itemCode){
          let result = {success:true,msg:''};
          // 1、取产品定义
          console.log(`-->获取产品定义：${itemCode}`);
          let res = await lxb.getProductConfig(itemCode);
          console.log(`<--获取产品定义：${res?JSON.stringify(res):res}`);
          if(!res)
            return {success: false, msg:'系统繁忙，未能获取产品信息，请重试'};
          if(res.result != '0')
            return {success: false, msg:'系统繁忙，未能获取产品信息，请重试'};

          this.mainRisk = res.data.mainRisk;
          this.addRisks = res.data.addRisks;

          // 2、组织试算参数
          let companyCode = this.mainRisk.companyCode;
          let socialSecurityFlag = this.mainRisk.socialSecurityFlag;
          let occupationFlag = this.mainRisk.occupationFlag;
          let optionOccupationalCategory; //职业列表
          if (occupationFlag === 'Y') {
            const json = require(`@/config/occupation/${companyCode}.json`);
            console.log('------职业列表:',json);
            optionOccupationalCategory = json;
          }
          let validDate = [],validSpan = 0;
          if (this.mainRisk.insuredAgeType == '1') { //年龄计算方式 1-投保日 2-生效日
            validDate = this.getDate();
            validSpan = 0
          }else{
            if (this.mainRisk.cvalidDateType == '1') { //生效日期类型 1-固定生效日 2-范围内指定生效日，默认1
              validDate = this.getRangeDate('future',this.getDate(),this.mainRisk.cvalidDateBegin,'D').split('-')
              validSpan = 1
            }else if (this.mainRisk.cvalidDateType == '2') {
              //
            }
          }
          let range = {
            // 最大生日日期和最小生日日期
            birthdayMinDate : new Date(this.getRangeDate('past',validDate,this.calInsureAgeRange().endBirth,this.calInsureAgeRange().endBirthUnit)),
            birthdayMaxDate : new Date(this.getRangeDate('pastNear',validDate,this.calInsureAgeRange().beginBirth,this.calInsureAgeRange().beginBirthUnit)),
            // 投保人最大生日日期和最小生日日期
            appntAgeMinDate : new Date(this.getRangeDate('past',this.getDate(),this.calAppntAgeRange().endBirth,this.calAppntAgeRange().endBirthUnit)),
            appntAgeMaxDate : new Date(this.getRangeDate('pastNear',this.getDate(),this.calAppntAgeRange().beginBirth,this.calAppntAgeRange().beginBirthUnit))
          };
          // 保额保费模式
          let calMode = this.mainRisk.calMode;
          let rulePremStep,ruleAmountStep;
          let optionAmountSelect;
          if (calMode == '0') { //0-录保费算保额 1-录保额算保费 2-选保额算保费 3-录入保额保费（保费算保额模式）
            rulePremStep = this.mainRisk.premStep
          }else if (calMode == '1') {
            ruleAmountStep = this.mainRisk.amountStep;
            this.saleInfoMain.baseAmount = this.calRuleAmountStep(ruleAmountStep).amountMin;
          }else if (calMode == '2') {
            if (this.mainRisk.amountSelect) {
              this.mainRisk.amountSelect.forEach((el)=>{
                el.realAmt = parseInt(el.realAmt)
              });
              optionAmountSelect = this.mainRisk.amountSelect
              this.saleInfoMain.baseAmount = optionAmountSelect[0].realAmt
            }else{
              optionAmountSelect = []
            }
          }else if (calMode == '3') {
            // 目前都为保费算保额-保费步进式-保额不超过保费
            rulePremStep = this.mainRisk.premStep
            ruleAmountStep = this.mainRisk.amountStep
          }
          // 保险期间
          let optionInsurePeriod = this.mainRisk.insurePeriod
          this.saleInfoMain.insurePeriodStr = this.mainRisk.insurePeriod[0].insurePeriod + this.mainRisk.insurePeriod[0].insurePeriodUnit
          // 交费方式
          this.mainRisk.payIntv.forEach((el)=>{el.selectable = true});

          let optionPayIntv = this.mainRisk.payIntv;
          this.saleInfoMain.payIntv = this.mainRisk.payIntv[0].payIntv;
          // 交费期间
          let optionPayEndYear = [];
          if (this.mainRisk.payEndYear) {
            this.mainRisk.payEndYear.forEach((el) => {el.selectable = true});
            optionPayEndYear = this.mainRisk.payEndYear
          }else{
            optionPayEndYear = []
          }
          // 默认的交费方式和交费年期
          let payEndYearUnitMap = {
            12:'Y',// 年交
            0:'Y',// 趸交
            // todo:...more...
          };
          if(this.saleInfoMain.payIntv === '0'){// 仅应接口要求，对趸交的情况做特殊处理
            this.saleInfoMain.payEndYear = '1';
            this.saleInfoMain.payEndYearStr = '1Y';
            this.saleInfoMain.payEndYearFlag = 'Y';
          }else{
            for(let payEndYear of optionPayEndYear){
              if(payEndYear.selectable){
                if(payEndYearUnitMap[this.saleInfoMain.payIntv] === payEndYear.payEndYearUnit){
                  this.saleInfoMain.payEndYear = payEndYear.payEndYear;
                  this.saleInfoMain.payEndYearFlag = payEndYear.payEndYearUnit;
                  this.saleInfoMain.payEndYearStr = payEndYear.payEndYear + payEndYear.payEndYearUnit;
                  break;
                }
              }
            }
          }


          // 生存金
          let optionGetYear = [];
          if (this.mainRisk.getYear) {
            this.mainRisk.getYear.forEach((el) => {el.selectable = true});
            optionGetYear = this.mainRisk.getYear
          } else {
            optionGetYear = []
          }
          // 续保
          let rebuyFlag = this.mainRisk.rebuyFlag;
          let renewInsure = rebuyFlag == '1' ? '-1' : false;
          // 生存金领取规则
          let optionGetIntv = [],getIntv;
          if (this.mainRisk.getIntv) {
            optionGetIntv = this.mainRisk.getIntv;
            getIntv = this.mainRisk.getIntv[0].getIntv
          } else {
            optionGetIntv = []
          }
          // 主险说明
          let insureMessage = this.mainRisk.insureMessage;
          // 附加险
          this.addRisks.forEach((el)=>{el.selectable = true;el.active = false;el.basePrem = ''});
          let addRisksInner = this.addRisks;
          // 初始化表单值
          let occupationalCategoryText,occupationalCategoryArray;
          let currentDate;// 当前生日
          let session = commonUtils.getSessionStore('productDetail_' + itemCode);
          console.log('session存的值',session)
          if (session) {
            this.saleInfoMain.sex = session.insuredInfo.sex
            this.saleInfoMain.socialSecurityFlag = session.insuredInfo.socialSecurityFlag
            this.saleInfoMain.occupationalCategory = session.insuredInfo.occupationalCategory
            occupationalCategoryText = session.occupationalCategoryText
            occupationalCategoryArray = session.occupationalCategoryArray
            Object.keys(session.riskData).forEach((el)=>{
              let risk = session.riskData[el]
              if (risk.isMainRisk == '1') { //主险
                this.saleInfoMain.insurePeriodStr = risk.insuYear + risk.insuYearFlag
                this.saleInfoMain.payIntv = risk.payIntv
                this.saleInfoMain.payEndYearStr = risk.payEndYear + risk.payEndYearFlag
                this.saleInfoMain.getYearStr = risk.getYear + risk.getYearFlag
                console.log()
                if (calMode != '3') {
                  this.saleInfoMain.baseAmount = risk.amt
                  this.saleInfoMain.basePrem = risk.prem
                }else {
                  console.log(this.calRuleAmountStep(ruleAmountStep),risk);
                  this.saleInfoMain.baseAmount = this.calRuleAmountStep(ruleAmountStep).amountStepUnit == 'W' ? risk.amt/10000 : risk.amt/1000
                  this.saleInfoMain.basePrem = this.calRulePremStep(rulePremStep).premStepUnit == 'W' ? risk.prem/10000 : risk.prem/1000
                }
                renewInsure = session.reBuyFlag
                // 这里写保费赋值
              }else if (risk.isMainRisk == '0') { //附加险
                addRisksInner.forEach((el)=>{
                  if (risk.riskCode == el.addRiskBasic.riskCode) {
                    console.warn('找到相同附加险',risk)
                    el.active = true;
                    el.session = risk;
                  }else {
                    el.session = null
                  }
                  el.sessionAppntInfo = session.appntInfo;
                })
              }
            })
            // 生日启动,生日一定要放在最后赋值
            currentDate = new Date(session.insuredInfo.birthday)
            this.saleInfoMain.birthday = session.insuredInfo.birthday
          }else{
            this.saleInfoMain.sex = '0'
            // 社保
            this.saleInfoMain.socialSecurityFlag = this.mainRisk.socialSecurityFlag === 'Y' ? '1' : '';
            // 若与职业无关，传空
            this.saleInfoMain.occupationalCategory = this.mainRisk.occupationFlag === 'Y' ? this.defaultOccupation[companyCode].value : ''
            occupationalCategoryText = ''// todo暂为空 2019-01-10  this.defaultOccupation[companyCode].label
            occupationalCategoryArray = []// todo暂为空 2019-01-10 this.defaultOccupation[companyCode].option
            if (calMode == '3') {
              this.saleInfoMain.basePrem = this.calRulePremStep(rulePremStep).premMin
              this.saleInfoMain.baseAmount = ''
            }
            // 生日启动,生日一定要放在最后赋值
            let birthday = this.getMiddleDate(range.birthdayMaxDate,range.birthdayMinDate)
            currentDate = new Date(birthday)
            this.saleInfoMain.birthday = birthday
          }
          console.log('create------',JSON.stringify(this.saleInfoMain));

          let obj = {
            itemCode:this.mainRisk.espItemCode,
            mainRiskCode:this.mainRisk.riskCode,
            appntInfo:{
              birthday:this.appntInfo.birthday,
              sex:this.appntInfo.sex
            },
            insuredInfo:{
              birthday:this.saleInfoMain.birthday,
              sex:this.saleInfoMain.sex,
              age:this.calBirthAge().birthAgeNum,
              ageUnit:this.calBirthAge().birthAgeUnit,
              socialSecurityFlag:this.saleInfoMain.socialSecurityFlag,
              occupationalCategory:this.saleInfoMain.occupationalCategory,
            },
            type:'LXB',
            system:'hr',
            riskData:{
              ['risk_' + this.mainRisk.riskCode]:{
                riskCode:this.mainRisk.riskCode,
                riskName:this.mainRisk.riskName,
                isMainRisk:'1',
                mainRiskCode:this.mainRisk.riskCode,
                insuYear:this.saleInfoMain.insurePeriodStr.substring(0,this.saleInfoMain.insurePeriodStr.length - 1),
                insuYearFlag:this.saleInfoMain.insurePeriodStr.substring(this.saleInfoMain.insurePeriodStr.length - 1),
                payIntv:this.saleInfoMain.payIntv,
                payEndYear:this.saleInfoMain.payEndYearStr.substring(0,this.saleInfoMain.payEndYearStr.length - 1),
                payEndYearFlag:this.saleInfoMain.payEndYearStr.substring(this.saleInfoMain.payEndYearStr.length - 1),
                getYear:this.saleInfoMain.getYearStr.substring(0,this.saleInfoMain.getYearStr.length - 1),
                getYearFlag:this.saleInfoMain.getYearStr.substring(this.saleInfoMain.getYearStr.length - 1),
                liveGetMode:'',
                getIntv:this.getIntv,
                mult:this.saleInfoMain.mult.toString(),
                openFlag:true,
                isHaveInfo:true,
                isHaveAppnt:false,
                isAnnuity:this.mainRisk.isAnnuity,
                // prem:this.basePrem
              }
            },
            reBuyFlag:renewInsure,
            occupationalCategoryText:occupationFlag == 'Y' ? occupationalCategoryText : '',
            occupationalCategoryArray:occupationFlag == 'Y' ? occupationalCategoryArray : []
          }
          // 保额问题
          if (calMode == '1') {
            obj.riskData['risk_' + this.mainRisk.riskCode]['amt'] = this.saleInfoMain.baseAmount * this.getRate(this.calRuleAmountStep(ruleAmountStep).amountStepUnit)
            obj.riskData['risk_' + this.mainRisk.riskCode]['prem'] = ''
            console.log('保额保费：',JSON.stringify(obj.riskData), 'this.saleInfoMain.baseAmount:',this.saleInfoMain.baseAmount);
          }else if (calMode == '2') {
            obj.riskData['risk_' + this.mainRisk.riskCode]['amt'] = this.saleInfoMain.baseAmount
            obj.riskData['risk_' + this.mainRisk.riskCode]['prem'] = ''
          }else if (calMode === '0') {
            obj.riskData['risk_' + this.mainRisk.riskCode]['amt'] = ''
            obj.riskData['risk_' + this.mainRisk.riskCode]['prem'] = this.saleInfoMain.basePrem * this.getRate(this.calRulePremStep.premStepUnit)
          }else if (calMode === '3') {
            obj.riskData['risk_' + this.mainRisk.riskCode]['amt'] = this.saleInfoMain.baseAmount * this.getRate(this.calRuleAmountStep(ruleAmountStep).amountStepUnit)
            obj.riskData['risk_' + this.mainRisk.riskCode]['prem'] = this.saleInfoMain.basePrem * this.getRate(this.calRulePremStep(rulePremStep).premStepUnit)
          }
          this.calAddRisksInner(addRisksInner).forEach((el)=>{
            if (el.active) {
              if (this.riskData['risk_' + el.addRiskBasic.riskCode]) {
                obj.riskData['risk_' + el.addRiskBasic.riskCode] = this.riskData['risk_' + el.addRiskBasic.riskCode]
              }
            }
          })
          // 其他信息，比如制作计划书需要的
          obj.other = {
            birthdayMinDate:range.birthdayMinDate,
            birthdayMaxDate:range.birthdayMaxDate,
            appntAgeMinDate:range.appntAgeMinDate,
            appntAgeMaxDate:range.appntAgeMaxDate,
            calMode:calMode
          }
          let param = JSON.parse(JSON.stringify(obj));

          delete param.insuredInfo.ageUnit;
          delete param.other;
          delete param.reBuyFlag;
          delete param.occupationalCategoryText;
          delete param.occupationalCategoryArray;

          let req = {};
          req.platformType = 'ESP';
          req.platformSubType = 'LXB';
          req.insuredDTO = {
            birthday:this.saleInfoMain.birthday,
            sex:this.saleInfoMain.sex,
            age:this.calBirthAge().birthAgeNum,
            occupationType:'1',
          },
            req.appntDTO = JSON.parse(JSON.stringify(req.insuredDTO));// 暂定同一人
          delete req.appntDTO.occupationType;
          req.planDTOs = [];
          let _plan = {
            planCode : this.mainRisk.productCode,
            salesPlanCode:'LXB_PLAN_2',
            occupationRank:'',
            riskDTOs : [],
          };
          let risk = obj.riskData['risk_' + this.mainRisk.riskCode];
          risk.mainRiskCode = this.mainRisk.riskCode;
          risk.isHaveSocial = req.insuredDTO.socialSecurityFlag === 'Y';
          _plan.riskDTOs.push(risk);
          req.planDTOs.push(_plan);

          console.log(`-->保费试算:${JSON.stringify(req)}`);
          // 3、保费试算
          res = await plan.getNewInsureCharge(req);
          console.log(`<--保费试算:${res?JSON.stringify(res):res}`);
          // 用新试算接口返回的结果，生成旧接口返回的对象
          if(res.result === '0'){
            res.channelInsurance = {};
            let _risk = res.planInsuraMap[this.mainRisk.productCode][0];
            if(_risk)
              res.channelInsurance['risk_'+this.mainRisk.riskCode] = {
                amt:_risk.amt,
                prem:_risk.prem,
                code:this.mainRisk.riskCode,
              }
          }
          console.log('%c确认页参数','color:yellow;background:black',obj)
          if (res.channelInsurance) {
            if (this.mainRisk.calMode == '1' || this.mainRisk.calMode == '2') {
              Object.keys(res.channelInsurance).forEach((el)=>{
                if (el == 'risk_' + this.mainRisk.riskCode) {
                  this.saleInfoMain.basePrem = res.channelInsurance[el].prem
                }else{
                  addRisksInner.forEach((el2)=>{
                    if (el == 'risk_' + el2.addRiskBasic.riskCode) {
                      el2.baseAmount = parseInt(res.channelInsurance[el].amt) == 0 ? '--' : res.channelInsurance[el].amt
                      el2.basePrem = res.channelInsurance[el].prem
                    }
                  })
                }
              })
            }else if (this.mainRisk.calMode == '0') {
              Object.keys(res.channelInsurance).forEach((el)=>{
                if (el == 'risk_' + this.mainRisk.riskCode) {
                  if (parseFloat(res.channelInsurance[el].amt) == 0) {
                    this.saleInfoMain.baseAmount = '--'
                  }else {
                    this.saleInfoMain.baseAmount = res.channelInsurance[el].amt
                  }
                }else{
                  addRisksInner.forEach((el2)=>{
                    // console.warn(el,el2.addRiskBasic.riskCode)
                    if (el == 'risk_' + el2.addRiskBasic.riskCode) {
                      el2.baseAmount = parseInt(res.channelInsurance[el].amt) == 0 ? '--' : res.channelInsurance[el].amt
                      el2.basePrem = res.channelInsurance[el].prem
                    }
                  })
                }
              })
            }
          }else{
            if (this.mainRisk.calMode == '1' || this.mainRisk.calMode == '2'){
              this.saleInfoMain.basePrem = '--'
              addRisksInner.forEach((el2)=>{
                el2.basePrem = '--'
              })
            }else if (this.mainRisk.calMode == '0') {
              this.saleInfoMain.baseAmount = '--'
              addRisksInner.forEach((el2)=>{
                el2.basePrem = '--'
              })
            }
          }

          // 4、缓存试算结果
          obj.channelInsurance = res.channelInsurance;
          // obj.orderAmount = res.orderAmount;
          obj.orderAmount = res.sumPrem;
          obj.outItemCode = itemCode;
          obj.productCode = this.mainRisk.productCode;
          obj.socialInsuFlag = '';
          obj.orderMult = '1';
          obj.rebuyFlag = this.mainRisk.rebuyFlag;
          commonUtils.setSessionStore('productDetail_' + itemCode,obj);
          return {success:true, msg:''}
        },


        // 计算过去或未来的某一特定日期
        getRangeDate(type,originDate,num,unit){
          // type:past-算过去的日期，future-算未来的日期
          // originDate:原日期（数组）
          // num：据目标日期的数值
          // unit：据目标日期数值的单位
          let that = this;
          let year = parseInt(originDate[0])
          let month = parseInt(originDate[1]) - 1
          let day = parseInt(originDate[2])
          let dateString = originDate.join('-')
          let numInt = parseInt(num)
          if (type === 'past') {
            let past = {
              D:function(){
                let date = new Date(dateString)
                date.setDate(day - numInt)
                console.log('past-D：',that.getDate(date))
                return that.getDate(date)
              },
              M:function(){
                let date = new Date(dateString)
                date.setMonth(month - numInt)
                console.log('past-M：',that.getDate(date))
                return that.getDate(date)
              },
              Y:function(){
                let date = new Date(dateString)
                date.setFullYear(year - numInt - 1)
                let dateArr = that.getDate(date)
                date.setDate(parseInt(dateArr[2]) + 1)
                console.log('past-Y：',that.getDate(date))
                return that.getDate(date)
              }
            }
            return past[unit]().join('-')
          }else if (type === 'future') {
            let future = {
              D:function(){
                let date = new Date(dateString)
                date.setDate(day + numInt)
                console.log('future-D：',that.getDate(date))
                return that.getDate(date)
              },
              M:function(){
                let date = new Date(dateString)
                date.setMonth(month + numInt)
                console.log('future-M：',that.getDate(date))
                return that.getDate(date)
              },
              Y:function(){
                let date = new Date(dateString)
                date.setFullYear(year + numInt)
                console.log('future-Y：',that.getDate(date))
                return that.getDate(date)
              }
            }
            return future[unit]().join('-')
          }else if (type === 'pastNear'){
            let pastNear = {
              D:function(){
                let date = new Date(dateString)
                date.setDate(day - numInt)
                console.log('pastNear-D：',that.getDate(date))
                return that.getDate(date)
              },
              Y:function(){
                let date = new Date(dateString)
                date.setFullYear(year - numInt)
                console.log('pastNear-Y：',that.getDate(date))
                return that.getDate(date)
              }
            };
            return pastNear[unit]().join('-')
          }
        },
        // 计算被保人生日区间
        calInsureAgeRange(){
          let ageMin = this.substringNumAndUnit(this.mainRisk.insuredAgeMin)
          let ageMax = this.substringNumAndUnit(this.mainRisk.insuredAgeMax)
          return {
            beginBirth:ageMin.num,
            beginBirthUnit:ageMin.unit,
            endBirth:ageMax.num,
            endBirthUnit:ageMax.unit
          }
        },
        // 计算投保人生日区间
        calAppntAgeRange(){
          let ageMin = this.substringNumAndUnit(this.mainRisk.appntAgeMin)
          let ageMax = this.substringNumAndUnit(this.mainRisk.appntAgeMax)
          console.log(JSON.stringify(ageMax));
          return {
            beginBirth:ageMin.num,
            beginBirthUnit:ageMin.unit,
            endBirth:ageMax.num,
            endBirthUnit:ageMax.unit
          }
        },
        // 获取形如28D、10Y表示年龄的字符串的数字和单位
        substringNumAndUnit(data){
          let num = data.substring(0,data.length - 1)
          let unit = data.substring(data.length - 1)
          return {num,unit}
        },
        // 获取日期，返回值是[年，月，日]
        getDate(param){
          let toString = Object.prototype.toString
          let date = toString.call(param) == '[object Date]' ? param : new Date()
          let dateToday = [
            (date.getFullYear()).toString(),
            (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString(),
            date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString()
          ]
          return dateToday
        },
        // 保费---步进规则
        calRulePremStep(rulePremStep){
          let arr = [].concat(rulePremStep)
          let ruleIndex = null
          arr.forEach((el,index)=>{
            el.applyRule ? this.getEvalResult('',el.applyRule,el) ? ruleIndex = index : false
              : ruleIndex = 0
          })
          if (ruleIndex !== null) {
            return {
              premMin:!!arr[ruleIndex].premMin ? parseFloat(arr[ruleIndex].premMin) : 0,
              premMax:!!arr[ruleIndex].premMax ? parseFloat(arr[ruleIndex].premMax) : 1.7976931348623157e+308,
              premStep:!!arr[ruleIndex].premStep ? parseFloat(arr[ruleIndex].premStep) : 1,
              premStepUnit:arr[ruleIndex].premStepUnit
            }
          }else {
            // 步进规则的watch是为了处理在规则变化时的对应表单值的初始化问题，为了限制初始化时的频繁赋值进行了JSON的判断。此处的单位应与实际单位不同，防止在页面初始化时表单值无法获取正确的赋值，因此假造单位Y1(保额和保费的对应规则相同)。
            return {
              premMin:1,
              premMax:1.7976931348623157e+308,
              premStep:1,
              premStepUnit:'Y1'
            }
          }
        },
        // 保额---步进规则
        calRuleAmountStep(ruleAmountStep){
          let arr = [].concat(ruleAmountStep)
          let ruleIndex = null
          arr.forEach((el,index)=>{
            el.applyRule ? this.getEvalResult('',el.applyRule,el) ? ruleIndex = index : false
              : ruleIndex = 0
          })
          if (ruleIndex !== null) {
            return {
              amountMin:!!arr[ruleIndex].amountMin ? parseFloat(arr[ruleIndex].amountMin) : 0,
              amountMax:!!arr[ruleIndex].amountMax ? parseFloat(arr[ruleIndex].amountMax) : 1.7976931348623157e+308,
              amountStep:!!arr[ruleIndex].amountStep ? parseFloat(arr[ruleIndex].amountStep) : 1,
              amountStepUnit:arr[ruleIndex].amountStepUnit
            }
          }else {
            return {
              amountMin:1,
              amountMax:1.7976931348623157e+308,
              amountStep:1,
              amountStepUnit:'Y1'
            }
          }
        },
        // eval判断语句
        getEvalResult(type,evalStr,el){
          let insuredAgeDay = this.calBirthAge().birthAgeUnit == 'D'
            ? this.calBirthAge().birthAgeNum
            : this.calBirthAge().birthAgeNum == '0' ? 365 : this.calBirthAge().birthAgeNum * 365
          let insuredAge = this.calBirthAge().birthAgeUnit == 'Y' ? this.calBirthAge().birthAgeNum : 0
          let appntAge = ''
          let insuredSex = this.saleInfoMain.sex
          let payIntv = parseInt(this.saleInfoMain.payIntv)
          let payYear = ''
          if (type == 'payIntv') {
            payYear = el.payIntv == '0' ? 1 : 999
          }else if (type == 'getYear') {
            payYear = parseInt(this.saleInfoMain.payEndYearStr.substring(0,this.saleInfoMain.payEndYearStr.length - 1))
          }
          let insuredPeriod = parseInt(this.saleInfoMain.insurePeriodStr.substring(0,this.saleInfoMain.insurePeriodStr.length - 1))
          let prem = ''
          let amount = ''
          let mult = ''
          let amountLevel = ''
          let mainRisk = {
            payYear:parseInt(this.saleInfoMain.payEndYearStr.substring(0,this.saleInfoMain.payEndYearStr.length - 1)),
            payIntv:parseInt(this.saleInfoMain.payIntv),
            insuredPeriod:'',
            prem:'',
            amount:'',
            riskCode:this.mainRisk.riskCode
          }
          let selectedAddRiskCodes = this.selectedAddRiskCodes
          if (this.calMode == '0') {
            mainRisk.amount = this.saleInfoMain.baseAmount
          }else if (this.calMode == '1') {
            mainRisk.amount = this.saleInfoMain.baseAmount * this.getRate(this.copyRuleAmountStep.amountStepUnit)
            mainRisk.prem = this.saleInfoMain.basePrem
          }else if (this.calMode == '2') {
            mainRisk.prem = this.saleInfoMain.basePrem
          }else if (this.calMode == '3') {

          }
          let socialSecurity = this.saleInfoMain.socialSecurityFlag
          // console.log('主险','mainRisk.amount',mainRisk.amount)
          return eval(evalStr)
        },
        // 获取两个日期的中间日期
        getMiddleDate(birthdayMaxDate,birthdayMinDate){
          let birthdayMaxDateStamp = new Date(birthdayMaxDate).getTime()
          let birthdayMinDateStamp = new Date(birthdayMinDate).getTime()
          let rangeStamp = (birthdayMaxDateStamp - birthdayMinDateStamp)/2
          let birthdayStamp = birthdayMinDateStamp + rangeStamp
          let birthday = this.getDate(new Date(birthdayStamp)).join('-')
          console.log('birthdayDate',birthday)
          return birthday
        },
        // 被保人年龄
        calBirthAge(){
          //非计划书页面（HYQ,咨询的LT）
          let age = this.getBirthAge(this.saleInfoMain.birthday);
          return age
        },
        // 获取年龄
        getBirthAge(param){
          let that = this
          let stringToDate = function(string){
            return new Date(Date.parse(string.replace(/-/g, '/')))
          }
          let getDateDiff = function(date1,date2){
            var d1 = stringToDate(date1)
            var d2 = stringToDate(date2)
            return (d2.getTime()-d1.getTime())/(1000*3600*24) + 1
          }
          let getAfterDate = function(dayCount) {
            var date = new Date()
            date.setDate(date.getDate() + dayCount) //获取dayCount天后的日期
            return date
          }
          let getAge = function(strDate,dayCount) {
            //strDate为日期，dayCount为当前日期的dayCount天后，不传时dayCount=undefined
            var today  = new Date()
            if(dayCount != undefined){
              today = getAfterDate(dayCount)
            }
            var b = strDate.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
            if (b == null) {
              return null
            } else {
              // var year = b[1] * 1
              var month = b[3] * 1
              var day = b[4] * 1
              var nowY = today.getFullYear()
              var age = nowY - b[1]
              if (today.getMonth() + 1 < month) {
                age--
              } else if (today.getMonth() + 1 == month
                && today.getDate() < day) {
                age--
              } else if (age < 1) {
                var dayNum = getDateDiff(strDate, nowY + '-' + (today.getMonth() + 1) + '-' + today.getDate())
                if (dayNum < 28) {
                  age--
                }
              }
              return age
            }
          }

          let birthday = param ? param : '2019-8-13' // 防止日期计算出现NaN
          var age = getAge(birthday,that.validSpan)
          // console.log('age',age);
          var birthAge = ''
          if(age < 1){
            birthAge = getDateDiff(birthday,that.getDate().join('-'))+'D'
          }else{
            birthAge = age + 'Y'
          }
          var birthAgeUnit = birthAge.substring(birthAge.length - 1)
          var birthAgeNum = birthAge.substring(0,birthAge.length - 1)
          console.warn('birthAge',birthAge,birthAgeNum,birthAgeUnit)
          return {
            birthAge:birthAge,
            birthAgeNum:birthAgeNum,
            birthAgeUnit:birthAgeUnit
          }
        },
        // 计算附加险
        calAddRisksInner(addRisksInner){
          let arr = [].concat(addRisksInner)
          arr.forEach((el,index)=>{
            console.log('%c' + el.addRiskBasic.riskName + 'calAddRisksInner------applyRule','color:purple',el.applyRule,this.getEvalResult('',el.applyRule,el))
            if (el.addRiskBasic.required == '1') {
              el.selectable =  false
              el.active = true
            }else{
              el.applyRule ? el.selectable = this.getEvalResult('',el.applyRule,el)
                : true
              if (el.selectable) {
                let now = el.active
                el.active = now ? true : false
              }else {
                el.active = false
              }
            }
          })
          return arr
        },
        // 获取保额保费的计算倍率
        getRate(unit){
          if (unit == 'W') {
            return 10000
          }else if (unit == 'Q') {
            return 1000
          }else if (unit == 'Y' || unit == 'Y1') {
            return 1
          }
        },
        // 表单选项变化时的对象表单值重选
        reselectSaleInfoValue(value){
          var that = this
          var map = { // 将表单里值和选项对应起来的映射对象
            payIntv:'calOptionPayIntv',
            payEndYear:'calOptionPayEndYear',
            getYear:'calOptionGetYear'
          }
          var booleanArr = that[map[value]].map(function(el){
            return el.selectable
          })
          that[map[value]].forEach(function(el,index){
            //这里区别开，逻辑一样，只因ChargePeriod和insurePeriod是组合值，需要拼装才能和表单对应的里值对应上。看else的逻辑好理解。
            let firstTrueIndex = booleanArr.indexOf(true)
            if (value == 'payEndYear' || value == 'getYear') {
              if (that.saleInfoMain[value + 'Str'] == el[value] + el[value + 'Unit']) {
                if (!el.selectable) {
                  if (firstTrueIndex >= 0) {
                    that.saleInfoMain[value + 'Str'] = that[map[value]][firstTrueIndex][value] + that[map[value]][firstTrueIndex][value + 'Unit']
                  }else{
                    that.saleInfoMain[value + 'Str'] = ''
                  }
                }
              }else if (
                (that.saleInfoMain[value + 'Str'] != el[value] + el[value + 'Unit'])
                && (index == that[map[value]].length - 1)
                && (that.saleInfoMain[value + 'Str'] == '')
              ) {
                if (firstTrueIndex >= 0) {
                  that.saleInfoMain[value + 'Str'] = that[map[value]][firstTrueIndex][value] + that[map[value]][firstTrueIndex][value + 'Unit']
                }
              }
            }else{
              // 先看表单里值和对应的选项，选项是可选的-不管他，选项是不可选的-从选项里找第一个可选的
              if (that.saleInfoMain[value] == el[value]) {
                if (!el.selectable) {
                  if (firstTrueIndex >= 0) {
                    that.saleInfoMain[value] = that[map[value]][firstTrueIndex][value]
                  }else{
                    that.saleInfoMain[value] = ''
                  }
                }
                // 此处对应表单里值为空字符串时的自动选值
              }else if (
                (that.saleInfoMain[value] != el[value])
                && (index == that[map[value]].length - 1)
                && (that.saleInfoMain[value] == '')
              ) {
                // 无匹配选项，而且循环到最后一项时，寻找选项中第一个可选项给表单对应值赋值
                if (firstTrueIndex >= 0) {
                  that.saleInfoMain[value] = that[map[value]][firstTrueIndex][value]
                }
              }
            }
          })
        },
      },
    };
  },
  created(){
    //隐藏菜单
    // weixin.hideMenu()
  },
  computed: {
    // 计算投保人年龄区间
    calAppntAgeRange() {
      let ageMin = this.substringNumAndUnit(this.initAppntInsuredAge.appntAgeMin);
      let ageMax = this.substringNumAndUnit(this.initAppntInsuredAge.appntAgeMax);
      return {
        beginBirth: ageMin.num,
        beginBirthUnit: ageMin.unit,
        endBirth: ageMax.num,
        endBirthUnit: ageMax.unit
      };
    },
    // 计算投保人生日区间
    calAppntBirthdayRange() {
      let minDate = new Date(
        this.getRangeDate(
          "past",
          this.getDate(),
          this.calAppntAgeRange.endBirth,
          this.calAppntAgeRange.endBirthUnit
        )
      );
      let maxDate = new Date(
        this.getRangeDate(
          "pastNear",
          this.getDate(),
          this.calAppntAgeRange.beginBirth,
          this.calAppntAgeRange.beginBirthUnit
        )
      );
      return {
        minDate,
        maxDate
      };
    },
    // 计算被保人年龄区间
    calInsuredAgeRange() {
      let ageMin = this.substringNumAndUnit(this.initAppntInsuredAge.insuredAgeMin);
      let ageMax = this.substringNumAndUnit(this.initAppntInsuredAge.insuredAgeMax);
      return {
        beginBirth: ageMin.num,
        beginBirthUnit: ageMin.unit,
        endBirth: ageMax.num,
        endBirthUnit: ageMax.unit
      };
    },
    // 计算被保人年龄区间数组
    calOptionAge() {
      let start =
        this.calInsuredAgeRange.beginBirthUnit == "D"
          ? 0
          : parseInt(this.calInsuredAgeRange.beginBirth);
      let end = parseInt(this.calInsuredAgeRange.endBirth);
      let arr = [];
      for (let i = start; i <= end; i++) {
        arr.push({
          text: i + "周岁",
          value: i.toString()
        });
      }
      return [arr];
    },
    // 计算被保人生日区间
    calInsuredBirthdayRange() {
      let minDate = new Date(
        this.getRangeDate(
          "past",
          this.getDate(),
          this.calInsuredAgeRange.endBirth,
          this.calInsuredAgeRange.endBirthUnit
        )
      );
      let maxDate = new Date(
        this.getRangeDate(
          "pastNear",
          this.getDate(),
          this.calInsuredAgeRange.beginBirth,
          this.calInsuredAgeRange.beginBirthUnit
        )
      );
      return {
        minDate,
        maxDate
      };
    },
    // 根据被保人生日算年龄
    calBirthAge() {
      let age = this.insureInfo.birthday ? this.getBirthAge(this.insureInfo.birthday) : {birthAge: `${this.insureInfo.age}Y`, birthAgeNum: `${this.insureInfo.age}`, birthAgeUnit: 'Y'}
      return age
    },
    // 根据投保人生日算年龄
    calAppntAge(){ // birthAge:"27Y" birthAgeNum:"27" birthAgeUnit:"Y"
      return this.appntInfo.birthday ? this.getBirthAge(this.appntInfo.birthday) : {birthAge: `${this.appntInfo.age}Y`, birthAgeNum: `${this.appntInfo.age}`, birthAgeUnit: 'Y'}
    },
    // 被保人年龄用于页面显示
    calAge() {
      let str = "请选择年龄"
      this.calOptionAge[0].forEach(el => {
        if (el.value === this.insureInfo.age) {
          str = el.text
        }
      })
      return str
    },
    // 试算的参数（保存也用）
    calNewPropsalParam(){
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
      return {
        'platformType':'ESP',
        'platformSubType':'LXB',
        'appntDTO':appntDTO,
        'insuredDTO':{
          'birthday':this.insureInfo.birthday,
          'sex':this.insureInfo.sex,
          'age':this.insureInfo.age,
          'isHaveSocial': this.insureInfo.isHaveSocial
        },
        'planDTOs': []
      }
    },
    // 总的保费
    orderAmount(){
      let amount = 0
      this.complexProposalArr.length>0 ? this.complexProposalArr.forEach(item=>{
        amount = amount+(item.total *1)
      }):amount = 0
      return amount.toFixed(2)
    },
    isInitAllResOver(){
      return this.isAllPrdResOver && this.isInitResOver
    },
    premiumLabel(){
      let prem = this.orderAmount;
      let dotIdx = prem.indexOf('.');
      return prem && dotIdx !== -1 ? [prem.substring(0,dotIdx+1),prem.substring(dotIdx+1,prem.length - 1)] : [prem,''];
    }
  },
  watch: {
    isInitAllResOver(newVal,oldVal){ // 初始化请求全部完成
      newVal ? commonUtils.closeGlobalMask() :false
    },
    corfirmAgeFlag(newVal,oldVal){// 更新年龄 / 性别 试算所有主险
      if(newVal){
        this.confirmCalAgeTocharge()
      }
    },
    // isChoosedAppnt(newVal,oldVal){ // 是否选择投保人(豁免相关)
    //   if(!newVal){ // 之前开启投保人，现在关闭
    //     this.confirmAppntTocharge() 
    //   }
    // },
    isSamePerson(newVal,oldVal){
      if(newVal){ // 之前投被非一人，现在投同被一人
        this.confirmAppntTocharge()
      }
    }
  },

  /** 页面初始化（入口） */
  async beforeRouteEnter(to,from,next){
    await next(async vm=>{
      // 如果页面不是由“计划书详情”跳转而来，则需要预先加载产品定义-->保费试算-->生成本页初始显示的缓存
      vm.init(!['proposalDetail'].includes(from.name));
    });
  },
  beforeRouteLeave (to,from,next) { // 返回去销售计划详情页面去除缓存
    if (to.name !== 'proposalDetail') {
      commonUtils.removeSessionStore('proposalComposite')
      next()
    }else {
      next()
    }
  },

  methods: {
    /**
     * IOS 软键盘隐藏，页面底部回落
     */
    resizePage() {
      setTimeout(function () {
        let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 200);
    },
    /**
     * 初始化页面数据
     * @param isNewEnter 是否新进入本页。从产品列表、乐享保进入本页都算“新进入”。“新进入”需要先生成缓存，再进一步初始化页面
     */
    async init(isNewEnter){
      if(isNewEnter){
        // 获取代理人信息
        let token = this.$store.getters.getToken;
        this.agentInfo = await this.cacheHelper.getAgentInfo(customer,token);
        // 生成缓存
        await this.cacheHelper.createPremiumTrialCache(this.$route.query.itemCode);
        // 清空“计划书缓存”
        commonUtils.removeSessionStore('proposalComposite');

      }
      // 初始化页面显示
      let proposalSession = commonUtils.getSessionStore('proposalComposite')
      if(this.$route.query.itemCode){// 路由中有无itemcode
        this.itemCode=this.$route.query.itemCode

        this.getProductDetail(this.itemCode).then(()=>{
          this.$nextTick(()=>{this.loadFinished = true;});
          let session = commonUtils.getSessionStore('productDetail_' + this.$route.query.itemCode)
          // session 处理产品详情来的缓存问题
          if(session){
            // 险种
            if(!proposalSession){
              // 被保人
              if(session.insuredInfo.birthday){
                this.insureInfo = { // 还原组合计划书组件存储的属性
                  birthday: session.insuredInfo.birthday,
                  sex:session.insuredInfo.sex,
                  isHaveSocial:session.insuredInfo.socialSecurityFlag === '1' ? true : false
                }
              }
              this.insureInfo = { // 赋值年龄
                ...this.insureInfo,
                ...{
                  age:this.calBirthAge.birthAgeUnit != "D" ? this.calBirthAge.birthAgeNum : "0",
                  ageDay:this.calBirthAge.birthAgeUnit == "D" ? this.calBirthAge.birthAgeNum : "",
                  unit:this.calBirthAge.birthAgeUnit,
                }
              }
              console.log('-----------------debug:this.insureInfo',JSON.stringify(this.insureInfo));
              // 投保人
              if(session.appntInfo.birthday){// 有缓存取缓存
                this.isSamePerson = false
                this.appntInfo = {
                  birthday: session.appntInfo.birthday,
                  sex:session.appntInfo.sex
                }
              }else{ // 没缓存先判断缓存中被保人的年龄是不是大于18岁
                if(parseInt(this.insureInfo.age) >= 18){
                  this.isSamePerson = true
                  this.appntInfo = { // (2012-12-23改版：初始化显示投被保人是一人)
                    sex:this.insureInfo.sex,
                    birthday: this.insureInfo.birthday
                  }
                }else{
                  this.isSamePerson = false
                  this.appntInfo={
                    ...this.appntInfo,
                    // birthday:this.getMiddleDate(this.calAppntBirthdayRange.minDate,this.calAppntBirthdayRange.maxDate)
                    birthday:this.getRangeDate("past", this.getDate(), "30", "Y")
                  }
                }
                // this.appntInfo = {
                //   ...this.appntInfo,
                //   ...{
                //     birthday:this.getRangeDate("past", this.getDate(), "30", "Y")
                //   }
                // }
              }
              let planInsuraMapCopy = [] // 表格数据
              let planDTOsItem = { // 试算参数
                planCode:this.mainRisk.productCode,
                salesPlanCode:this.$route.query.itemCode,
                occupationRank:session.insuredInfo.occupationalCategory,//(2019-12-19职业等级放在和险种数组同一层次)
                riskDTOs:[] // 存储整合主附险
              }
              let mainRiskElcode = `risk_${session['mainRiskCode']}` // 主险的 risk_ITEMCODE
              Object.keys(session.riskData).forEach(elCode=>{ // 添加附加险
                if(elCode !== mainRiskElcode){
                  planInsuraMapCopy.push({
                    riskCode: session.riskData[elCode].riskCode,
                    amt: session.channelInsurance[elCode].amt,
                    prem: session.channelInsurance[elCode].prem,
                    payYears: session.riskData[elCode].payEndYear + this.payUnitMap[session.riskData[elCode].payEndYearFlag],
                    insuYear: session.riskData[elCode].insuYear,
                    insuYearFlag: session.riskData[elCode].insuYearFlag,
                    riskName:session.riskData[elCode].riskName
                  })
                  planDTOsItem.riskDTOs.push({
                    amt: session.channelInsurance[elCode].amt,
                    dutyCodeList:session.riskData[elCode].dutyCodeList,
                    getIntv: session.riskData[elCode].getIntv,
                    insuYear: session.riskData[elCode].insuYear,
                    insuYearFlag: session.riskData[elCode].insuYearFlag,
                    isHaveAppnt: session.riskData[elCode].isHaveAppnt,
                    isHaveInfo: session.riskData[elCode].isHaveInfo,
                    isMainRisk:session.riskData[elCode].isMainRisk,
                    liveGetMode: session.riskData[elCode].liveGetMode,
                    mainRiskCode: session.riskData[elCode].mainRiskCode,
                    mult: session.riskData[elCode].mult,
                    openFlag: session.riskData[elCode].openFlag,
                    payEndYear: session.riskData[elCode].payEndYear,
                    payEndYearFlag: session.riskData[elCode].payEndYearFlag,
                    payIntv: session.riskData[elCode].payIntv,
                    planLevel: session.riskData[elCode].planLevel,
                    prem: session.channelInsurance[elCode].prem,
                    riskCode: session.riskData[elCode].riskCode,
                    riskName: session.riskData[elCode].riskName,
                  })
                }
              })
              planInsuraMapCopy.unshift({ // 添加主险
                riskCode: session.riskData[mainRiskElcode].riskCode,
                amt: session.channelInsurance[mainRiskElcode].amt,
                prem: session.channelInsurance[mainRiskElcode].prem,
                payYears: session.riskData[mainRiskElcode].payEndYear + this.payUnitMap[session.riskData[mainRiskElcode].payEndYearFlag],
                insuYear: session.riskData[mainRiskElcode].insuYear,
                insuYearFlag: session.riskData[mainRiskElcode].insuYearFlag,
                riskName:session.riskData[mainRiskElcode].riskName
              })
              planDTOsItem.riskDTOs.unshift({
                amt: session.channelInsurance[mainRiskElcode].amt,
                dutyCodeList:session.riskData[mainRiskElcode].dutyCodeList,
                getIntv: session.riskData[mainRiskElcode].getIntv,
                getYear:session.riskData[mainRiskElcode].getYear,
                getYearFlag:session.riskData[mainRiskElcode].getYearFlag,
                insuYear: session.riskData[mainRiskElcode].insuYear,
                insuYearFlag: session.riskData[mainRiskElcode].insuYearFlag,
                isAnnuity:session.riskData[mainRiskElcode].isAnnuity,
                isHaveAppnt: session.riskData[mainRiskElcode].isHaveAppnt,
                isHaveInfo: session.riskData[mainRiskElcode].isHaveInfo,
                isMainRisk:session.riskData[mainRiskElcode].isMainRisk,
                liveGetMode: session.riskData[mainRiskElcode].liveGetMode,
                mainRiskCode: session.riskData[mainRiskElcode].mainRiskCode,
                mult: session.riskData[mainRiskElcode].mult,
                openFlag: session.riskData[mainRiskElcode].openFlag,
                payEndYear: session.riskData[mainRiskElcode].payEndYear,
                payEndYearFlag: session.riskData[mainRiskElcode].payEndYearFlag,
                payIntv: session.riskData[mainRiskElcode].payIntv,
                payYears:session.riskData[mainRiskElcode].payYears,
                planLevel: session.riskData[mainRiskElcode].planLevel,
                prem: session.channelInsurance[mainRiskElcode].prem,
                riskCode: session.riskData[mainRiskElcode].riskCode,
                riskName: session.riskData[mainRiskElcode].riskName,
                reBuyFlagShow:session.reBuyFlag, // 只用来展示（试算不需要此值）
              })
              this.complexProposalArr.push({// 组合计划书的一组
                planCode:session.productCode, // productCode
                total:session.orderAmount,
                riskName:session.riskData[mainRiskElcode]['riskName'],
                planCodePremObj:planInsuraMapCopy,// 表格数据
                planDTOsItem: planDTOsItem // 试算参数数据(一是外部试算/二是回显)
              })
              this.complexProposalItem = this.complexProposalArr[0].planDTOsItem.riskDTOs
            }
            this.lockGetPrem = true
          }else{
            this.lockGetPrem = true
            if(!proposalSession){
              this.insureInfo.birthday=this.getMiddleDate(this.calInsuredBirthdayRange.minDate,this.calInsuredBirthdayRange.maxDate)
              this.insureInfo = { // 赋值年龄
                ...this.insureInfo,
                ...{
                  age:this.calBirthAge.birthAgeUnit != "D" ? this.calBirthAge.birthAgeNum : "0",
                  ageDay:this.calBirthAge.birthAgeUnit == "D" ? this.calBirthAge.birthAgeNum : "",
                  unit:this.calBirthAge.birthAgeUnit,
                }
              }
              // 投保人
              if(parseInt(this.insureInfo.age) >= 18){
                this.isSamePerson = true
                this.appntInfo = { // (2012-12-23改版：初始化显示投被保人是一人)
                  sex:this.insureInfo.sex,
                  birthday: this.insureInfo.birthday
                }
              }else{
                this.isSamePerson = false
                this.appntInfo={
                  ...this.appntInfo,
                  // birthday:this.getMiddleDate(this.calAppntBirthdayRange.minDate,this.calAppntBirthdayRange.maxDate)
                  birthday:this.getRangeDate("past", this.getDate(), "30", "Y")
                }
              }
            }
          }
          this.initAppntInsuredAge = { // 更新初始化的数据
            appntAgeMin:this.mainRisk.appntAgeMin,
            appntAgeMax:this.mainRisk.appntAgeMax,
            insuredAgeMin:this.mainRisk.insuredAgeMin,
            insuredAgeMax:this.mainRisk.insuredAgeMax,
          }
        })
        this.isInitResOver = true
      }else{ // 没有产品详情的信息时，初始化投被保人的年龄/性别
        this.insureInfo.birthday=this.getRangeDate("past", this.getDate(), "18", "Y")
        // birthday:this.getMiddleDate(this.calInsuredBirthdayRange.minDate,this.calInsuredBirthdayRange.maxDate)
        this.insureInfo = { // 赋值年龄
          ...this.insureInfo,
          ...{
            age:this.calBirthAge.birthAgeUnit != "D" ? this.calBirthAge.birthAgeNum : "0",
            ageDay:this.calBirthAge.birthAgeUnit == "D" ? this.calBirthAge.birthAgeNum : "",
            unit:this.calBirthAge.birthAgeUnit,
          }
        }
        this.appntInfo = { // (2012-12-23改版：初始化显示投被保人是一人)
          sex:this.insureInfo.sex,
          birthday: this.insureInfo.birthday
        }
        this.isSamePerson = true
        this.lockGetPrem = true
        this.isInitResOver = true
      }
      // 接下来处理 组合计划书的缓存问题
      proposalSession ? (this.complexProposalArr = [...proposalSession.complexProposalArr],
          this.insureInfo = {...this.insureInfo,...proposalSession.insureInfo},
          this.appntInfo = {...this.appntInfo,...proposalSession.appntInfo},
          this.isSamePerson = proposalSession.isSamePerson
      ) : true


    },
    // 选中组合计划的一组
    // index,productCode index是点击‘修改’调用。productCode是选择销售计划时调用
    chooseComplexProposal(index,productCode){
      if(index >= 0){// 险种表格点击修改
        this.complexProposalItem = this.complexProposalArr[index]['planDTOsItem']['riskDTOs']
        this.occuptionRankProp = this.complexProposalArr[index]['planDTOsItem']['occupationRank'] // 职业和试算险种数组同一层次，需要单独传
        this.itemCode = this.complexProposalArr[index]['planDTOsItem'].salesPlanCode
        console.log(this.prdDetailObjMap[this.itemCode])
        if(this.prdDetailObjMap[this.itemCode]){ // 缓存中有详情
          this.prdDetailObjProps = this.prdDetailObjMap[this.itemCode]
          this.switchComplex = true // 组合计划书组件显示
        }else{// 缓存中没有详情
          this.getProductDetail(this.itemCode).then(()=>{ // 需要产品详情的productCode取data中的缓存item
            this.prdDetailObjProps = this.prdDetailObjMap[this.itemCode]
            this.switchComplex = true // 组合计划书组件显示
          })
        }
      }else{ // 产品列表选择一项产品
        this.complexProposalItem = []
        this.complexProposalArr.length>0 ? this.complexProposalArr.forEach(el=>{
          if(el.planCode === productCode){
            this.complexProposalItem = el['planDTOsItem']['riskDTOs']
            this.occuptionRankProp = el['planDTOsItem']['occupationRank']
          }
        }):false
        this.prdDetailObjProps = this.prdDetailObjMap[this.itemCode]
        this.switchProductList = false // 产品列表
        this.switchComplex = true // 组合计划书组件显示
      }
      Toast.loading() // 组合计划书弹窗出现时开始，主险的第一次试算结束时隐藏
      // this.switchComplex = true // 组合计划书组件显示
    },
    // 删除组合计划书的一组
    deleteComplexProposal(index){
      Dialog.confirm({
        title: '确认',
        content: '请确认是否进行删除！',
        confirmText: '确定',
        cancelText: '取消',
        onConfirm: () => {
          this.complexProposalArr.splice(index,1)
        }
      })
    },
    // 生日pick开关
    toSwitchDatePicker(type, title) {
      this.switchDatePicker = true;
      this.dateType = type;
      this.title = title;
      this.datePickerData = this[`cal${type}BirthdayRange`]; // 根据type选择数据
      if (type === "Appnt") {
        this.datePickerData.currentDate = new Date(this.appntInfo.birthday)
      } else if (type === "Insured") {
        this.datePickerData.currentDate = new Date(this.insureInfo.birthday);
      }
    },
    // 选择性别
    selectSex(item, type) {
      if(this.isSamePerson){ // 投被人同一人时
        (this.insureInfo.sex == this.appntInfo.sex && this.appntInfo.sex== item.value) ? true : 
          (this.insureInfo.sex = this.appntInfo.sex = item.value,this.corfirmAgeFlag = true)
      }else{
        if (type === "Insured") {
          this.insureInfo.sex == item.value ? true : (this.insureInfo.sex = item.value,this.corfirmAgeFlag = true)
        } else if (type === "Appnt") {
          this.appntInfo.sex == item.value ? true : (this.appntInfo.sex = item.value,this.corfirmAgeFlag = true)
        }
      }
    },
    // 被保人选择生日=》年龄显示
    onDatePickerConfirm(columnsValue) { // 年龄改变参会出发改变和请求
      if(this.isSamePerson){ // 投被人同一人时
        if(this.insureInfo.birthday === this.appntInfo.birthday && this.insureInfo.birthday === this.$refs["datePicker"].getFormatDate("yyyy-MM-dd")){
          return true
        }else{ // 处理被保人年龄选择小于18岁时，投保人年龄是不是跟随变化的情况
          this.insureInfo.birthday = this.$refs["datePicker"].getFormatDate("yyyy-MM-dd")
          this.insureInfo.age = this.calBirthAge.birthAgeUnit != "D" ? this.calBirthAge.birthAgeNum : "0"
          this.insureInfo.ageDay = this.calBirthAge.birthAgeUnit == "D" ? this.calBirthAge.birthAgeNum : ""
          this.insureInfo.unit = this.calBirthAge.birthAgeUnit
          if(parseInt(this.insureInfo.age) < 18){ // 被保人年龄小于18时。投被保人不能是同一人
            this.isSamePerson = false
          }else{
            this.appntInfo.birthday = this.insureInfo.birthday
            this.appntInfo.age = this.insureInfo.age
          }
          this.corfirmAgeFlag = true
        }
      } else{ // 投被保人非一人
        if (this.dateType === "Insured") {
          this.insureInfo.birthday === this.$refs["datePicker"].getFormatDate("yyyy-MM-dd") ? true :
            (this.insureInfo.birthday = this.$refs["datePicker"].getFormatDate("yyyy-MM-dd"),
              this.insureInfo.age = this.calBirthAge.birthAgeUnit != "D" ? this.calBirthAge.birthAgeNum : "0",
              this.insureInfo.ageDay = this.calBirthAge.birthAgeUnit == "D" ? this.calBirthAge.birthAgeNum : "",
              this.insureInfo.unit = this.calBirthAge.birthAgeUnit,
              this.corfirmAgeFlag = true)
        } else if (this.dateType === "Appnt") {// 年龄改变参会出发改变和请求
          this.appntInfo.birthday === this.$refs["datePicker"].getFormatDate("yyyy-MM-dd") ? true :
            (this.appntInfo.birthday = this.$refs["datePicker"].getFormatDate("yyyy-MM-dd"),this.corfirmAgeFlag = true)
        }
      }
    },
    // 被保人选择年龄
    onPickerConfirm(item) {
      if(parseInt(item[0].value) >= 18 && parseInt(this.insureInfo.age) !== parseInt(item[0].value)){
        this.isSamePerson ? // 是不是选择了同一人
          (this.insureInfo.age = this.appntInfo.age = this.insureInfo.age= item[0].value,
            this.insureInfo.birthday = this.appntInfo.birthday= '') :
          (this.insureInfo.age = this.insureInfo.age= item[0].value, this.insureInfo.birthday = '')
        // 只要选择年龄，就清空ageDay
        this.insureInfo.unit = 'Y',this.insureInfo.ageDay = ''
      }else if(parseInt(item[0].value) < 18 && parseInt(this.insureInfo.age) !== parseInt(item[0].value)){
        this.insureInfo.age = this.insureInfo.age= item[0].value, this.insureInfo.birthday = ''
        if(this.isSamePerson){
          this.isSamePerson = false
          this.appntInfo.age = ''
          this.appntInfo.birthday = this.appntInfo.birthday = this.getRangeDate("past", this.getDate(), "30", "Y")
        }
        // 只要选择年龄，就清空ageDay
        this.insureInfo.unit = 'Y',this.insureInfo.ageDay = ''
      }
      this.corfirmAgeFlag = true
    },
    // 获取销售计划详情，主要是要年龄
    getProductDetail(itemCode) {
      return lxb.getProductConfig(itemCode).then(res => {
        if (res.result == "0") {
          this.mainRisk = res.data.mainRisk;
          this.addRisks = res.data.addRisks;
          this.prdDetailObjMap[itemCode]= res
          this.leaveMessage = this.prdDetailObjMap[this.itemCode]['data'].leaveMessage
          // 产品条款
          this.clauseCfg.riskList = [];
          this.clauseCfg.riskList.push({name:this.mainRisk.riskName,clauseList:this.mainRisk.productClause});
        } else {
          Toast.info(res.reslutMessage);
        }
      });
    },
    // 选择是不是同一人
    selectSamePerson(value){
      if(this.isSamePerson){ // 更改为非本人
        this.isSamePerson = false
        this.appntInfo.birthday = this.getRangeDate("past", this.getDate(), "30", "Y")
        this.appntInfo.age = '' // 主要是因为投保人没有实时算年龄，不是同一人时，只传投保人的生日
        this.corfirmAgeFlag = true
      }else{
        if(this.insureInfo.age < 18){
          return Toast.info('被保人年龄小于18岁，不可选为投保人')
        }else{ // 更改为同一人
          this.appntInfo.birthday = this.insureInfo.birthday
          this.appntInfo.sex = this.insureInfo.sex
          this.appntInfo.age = this.insureInfo.age
          this.isSamePerson = true
        }
      }
    },
    // 选择社保标志
    selectSocialSecurityFlag(item) {
      this.insureInfo.isHaveSocial == item.value ? true : (this.insureInfo.isHaveSocial = item.value,this.corfirmAgeFlag = true)
    },
    // 组合计划书组件传值事件：收集组合计划书一组的险种信息 // 组合中有的更新。没有加载最后
    getOutputAllInfo(data) {
      let complexProposalArrCopy = [...this.complexProposalArr]
      let inAliveIndex = '' // 此data是否在现在的页面表格数据中（判断planCode）
      complexProposalArrCopy.length > 0? complexProposalArrCopy.some((item,index)=>{
        if(item.planCode === data.planCode){
          return inAliveIndex = index
        }
      }):false
      inAliveIndex === '' ? this.complexProposalArr.push(data) : this.$set(this.complexProposalArr,inAliveIndex,data)
      Toast.hide() // 组合计划书点击‘确认’时会Toast.loading（）
    },

    // 更新年龄/性别（投/被）去试算
    confirmCalAgeTocharge(){
      this.complexProposalArr.length > 0 ? this.toGetNewInsureCharge() : this.corfirmAgeFlag = false // 请求接口试算
    },
    // 更新投保人信息（sChoosedAppnt/ isSamePerson） ->首先是删除投保人相关的险种->再去试算
    confirmAppntTocharge(){
      if(this.complexProposalArr.length > 0){
        this.complexProposalArr.forEach((el,index) =>{
          el.planDTOsItem.riskDTOs.forEach((item,index2)=>{
            if(item.isHaveAppnt){
              el.planDTOsItem.riskDTOs.splice(index2,1)
              el.planCodePremObj.splice(index2,1)
            }
          })
        })
        this.toGetNewInsureCharge() // 请求接口试算
      }
    },
    // ajax请求去试算
    toGetNewInsureCharge(){
      Toast.loading()
      this.lockGetPrem = false
      this.calNewPropsalParam.planDTOs = []
      this.complexProposalArr.forEach((el,index) =>{
        this.calNewPropsalParam.planDTOs.push( el.planDTOsItem)
      })
      console.log(`-->保费试算：${JSON.stringify(this.calNewPropsalParam)}`);
      plan.getNewInsureCharge(this.calNewPropsalParam).then(res => {
        console.log(`<--保费试算：${res ? JSON.stringify(res):res}`);
        this.corfirmAgeFlag = false // 触发年龄试算标志
        Toast.hide()
        if(res.result === '0'){
          if(res.removePlanCodes.length > 0){
            // 试算出错的一组，要在data（complexProposalArr）缓存中也删除
            let complexProposalArrCopy = [...this.complexProposalArr]
            complexProposalArrCopy.forEach((el,index)=>{
              res.removePlanCodes.forEach(code =>{
                el.planCode === code ? complexProposalArrCopy.splice(index,1,''):false
              })
            })
            this.complexProposalArr = []
            complexProposalArrCopy.map(el=>{
              el !== '' ? this.complexProposalArr.push(el) : false
            })
          }
          //试算成功  res.planInsuraMap遍历要变更data（complexProposalArr）缓存的保额保费
          console.log('#################',JSON.stringify(this.complexProposalArr));
          this.complexProposalArr.forEach((iitem,index) =>{
            this.$set(this.complexProposalArr[index],'total',res.planPremMap[iitem['planCode']])
            iitem.planCodePremObj.forEach(subitem=>{
              res.planInsuraMap[iitem['planCode']].forEach(ressubitem=>{
                if(subitem.riskCode == ressubitem.riskCode){
                  this.$set(subitem,'amt',ressubitem.amt)
                  this.$set(subitem,'prem',ressubitem.prem)
                }
              })
            })
          })
          this.lockGetPrem = true
        }else{
          Toast.info(res.reslutMessage)
        }
      })
    },
    /**
     * 页面跳转查看单项条款
     * @param data PopupClauseList组件返回参数
     */
    showClauseItem(data){
      if(data && data.clause && data.clause.url){
        let proposalCompositeSession = {
          complexProposalArr:this.complexProposalArr,
          insureInfo:this.insureInfo,
          appntInfo:this.appntInfo,
          isSamePerson:this.isSamePerson
        }
        commonUtils.setSessionStore('proposalComposite',proposalCompositeSession)
        window.location.href = data.clause.url;
      }
    },
    // 生成计划书
    saveProposal() {
      if(this.complexProposalArr.length === 0){
        return Toast.failed('请添加产品！')
      }

      let params = {...{
        itemName:'',
        insuredAge:this.insureInfo.age,
        insuredSex:this.insureInfo.sex,
        agent:this.agentInfo, // 代理人信息
        customerName:this.customerName,// 敬呈
      }} // 主题相关参数
      let producDetail = this.prdDetailObjMap[this.complexProposalArr[0]['planDTOsItem']['salesPlanCode']]
      let itemName = producDetail ? producDetail['data']['itemName'] : this.complexProposalArr[0]['riskName']
      let paramsItemName = this.complexProposalArr.length> 1 ? '组合计划书': itemName
      let newPropsalParam ={
        ...this.calNewPropsalParam,
        ...{
        'proposalName':paramsItemName,
        'sharingParams':JSON.stringify(params),
        'planDTOs': []
        }
      }
      this.complexProposalArr.forEach((el,index) =>{
        newPropsalParam.planDTOs.push( el.planDTOsItem)
      })
      Toast.loading()
      plan.saveNewPropsal(newPropsalParam).then(res => {
        // Toast.info(res.proposalNo)
        if (res.result == "0") {
          localStorage.setItem('proposalDetailRefreshed','false');// ios分享问题，详情页进入后需要强制刷新一次
          this.$router.push({
            name: "proposalDetail",
            query: {
              proposalNo: res.proposalNo,
              viewMode: 'agent' // 建议书详情的查看模式。取值范围：agent:代理人查看；其它值或无此参数表示“分享查看”
            }
          })
          let proposalCompositeSession = {
            complexProposalArr:this.complexProposalArr,
            insureInfo:this.insureInfo,
            appntInfo:this.appntInfo,
            isSamePerson:this.isSamePerson
          }
          commonUtils.setSessionStore('proposalComposite',proposalCompositeSession)
        } else {
          Toast.info(res.reslutMessage)
        }
        Toast.hide()
      })
    },
    // 关闭组合计划书组件
    switchComplexFun(){
      this.switchComplex = false
    },
    // 产品列表选择的一项
    getOutputProductCode(code){
      this.itemCode = code
      if(this.prdDetailObjMap[this.itemCode]){ // 已经存储了该产品详情
        this.chooseComplexProposal(-1,this.prdDetailObjMap[this.itemCode]['data']['mainRisk']['productCode'])
      }else{
        this.getProductDetail(this.itemCode).then(()=>{ // 需要产品详情的productCode取data中的缓存item
          this.chooseComplexProposal(-1,this.prdDetailObjMap[this.itemCode]['data']['mainRisk']['productCode'])
        })
      }
    },
    getOutputProductRes(flag){
      this.isAllPrdResOver = flag
    },
    showClause(idx){
      // todo check clause content type...
      this.$store.commit('setHtmlViewerCfg',{title:'投保须知',html:`<div>投保须知</div>`});
      this.$router.push({name:'htmlViewer'});
    }
  }
};
</script>

<style lang="less" scoped>
#proposal-make {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 100px;// 100px 底部固定条目
  position: relative;
  box-sizing: border-box;
  .proposal-make-inner {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
    background-color: #F2F2F2;
  }
  .md-field {
    background-color: white;
    padding: 29px 30px 0 30px;
    margin: 0 0 20px 0;
    .md-field-item {
      .field-right {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        .item-block {
          position: relative;
          display: block;
          text-align: center;
          color: #999999;
          // padding: 0 13px;
          border: 1px solid #EEEEEE;
          border-radius: 8px;
          box-sizing: border-box;
          margin: 15px 0 15px 20px;
          padding: 0 13px 0 13px;
          font-family: PingFangSC;
          font-weight: 400;
          height: 60px;
          line-height: 60px;
          font-size: 26px;
          .item-block-inner {
            /*width: 100%;*/
            text-align: center;
            padding: 0 15px 0 15px;
            // font-size: 52px;
            // transform: scale(0.5);
            // transform-origin: 50% 51%;
          }
        }
        .item-block-inner-active {color: #61A0EF;background-color:#61A0EF19;border-color: #61A0EF;}
        .item-block-inner-selectable {color: #EEEEEE!important; background-color: #FFFFFF!important;border-color: #EEEEEE!important;}
        .birthday {
          width: 200px;
          margin-right: 40px;
          text-align: right;
          color: #999999;
          span {
            font-size: 28px;
          }
        }
        .birthday1 {
          color: #999999;
        }
        .age {
          width: 200px;
          margin-left: 12px;
          text-align: right;
          color: #999999;
          .age-arrow-right{margin-left: 10px;}
          span {
            font-size: 28px;
          }
        }
        .active {
          color: #999999;
          font-weight: 400;
        }
        p {
          font-size: 28px;
          font-family: PingFangSC;
          // font-weight: 400;
        }
      }
      /deep/ .md-field-item-title {
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: 400;
        width: 50%;
        min-width:1.6rem;
        max-width: 224px;
        color: #999999;
      }
      /deep/ .no-padding {
        padding: 0;
      }
      /deep/ .md-field-item-content {
        input {
          font-size: 28px;
          font-weight: normal;
        }
      }
      // 解决诡异的问题：让录入项下方的线变细一点
      /deep/ .md-field-item-content{
        border-bottom: 0 solid #EEEEEE;
        &:before{
          border-bottom: 0 solid #EEEEEE;
        }
      }
    }
    /deep/ .no-padding {
      .md-field-item-content {
        padding: 15px 0;
      }
    }
    /deep/ .no-padding2 {
      .md-field-item-content {
        padding: 0;
      }
    }
  }
  .m-title {
    position: relative;
    height:32px;
    font-size:32px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:32px;
    i {
      width: 8px;
      height: 30px;
      background: rgba(58, 129, 246, 1);
      /*border-radius: 4px;*/
      display: inline-block;
      position: absolute;
      /*top: 50%;*/
      left: -18px;
      /*margin: -10px 0 0;*/
    }
  }
  .add-padding{
    padding-bottom: 30px;
  }
  .complex-plan-container{
    padding: 0 40px;
    li{
      p.complex-plan-title{
        font-size:30px;
        margin-top: 40px;
        display: flex;
        /*padding-top: 40px;*/
        justify-content: space-between;
        .complex-plan-label{
          font-size:28px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:#333333;
        }
        .complex-plan-btn{
          // min-width: 240px;
          height:45px;
          line-height:45px;
          font-size:28px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(58,129,246,1);
          button{
            border: none;
            outline: none;
            background: inherit;
            padding: 0px;
            &.complex-plan-delete{
              margin-left: 15px;
              padding-left:15px;
              position: relative;
              &::before{
                content: '';
                display: block;
                width: 2px;
                height: 50%;
                /*background: #DADADA;*/
                position: absolute;
                top: 25%;
                left: 0px;
              }

            }
          }
        }
      }
      p.complex-plan-prem{
        font-size:28px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:#999999;
        padding: 30px 0 30px 0;
      }
      /** 险种表格 */
      .complex-plan-table{
        padding-top: 20px;
        display: table;
        > div{
          display: table-row;
          text-align: center;
          > div{
            display: table-cell;
            border-right: 1px solid #EEEEEE; border-bottom: 1px solid #EEEEEE;
            vertical-align: middle;
          }
        }
        .complex-plan-table-title{
          > div{
            width: 25%;
            font-size:28px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:#FFFFFF;
            background-color: #61A0EFB2;
            padding: 22px 0 22px 0;
          }
          > div:first-child{border-left: 1px solid #EEEEEE;}
        }
        .complex-plan-table-row{
          > div{
            font-size:28px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color: #333333;
          }
          > div:first-child{
            border-left: 1px solid #EEEEEE;
            /*overflow: hidden;*/
            /*text-overflow: ellipsis;*/
            /*display: -webkit-box;*/
            /*-webkit-line-clamp:2;*/
            /*-webkit-box-orient: vertical;*/
            padding: 25px 5px 25px 5px;
          }
        }
      }
    }
  }
  .complex-productlist-container{
    height: 80px;
    padding-right: 40px;
    text-align: right;
    font-size:26px;
    .complex-product-outer{
      display: inline-block;
      padding: 10px;
      height:40px;
      border-radius:4px;
      border:1px solid rgba(58,129,246,1);
      font-size:26px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(58,129,246,1);
      line-height:40px;
    }
    .complex-product-add{
      font-size: 40px;
      float: left;
      position: relative;
      top: -3px;
    }
  }
  .insurance {
    margin: 20px 0 0;
    position: relative;
    background-color: #ffffff;
    .insurance-title {
      padding: 29px 30px 0 30px;
    }
  }
  .cover-info {

     margin: 20px 0 0;
     position: relative;
     background-color: #ffffff;
     .cover-info-title {
       padding: 29px 30px 0 30px;
     }
     .cover-info-body{
       padding: 30px;
       font-family: PingFangSC-Regular;
       display: flex;
       justify-content: space-between;
       span{
         font-size: 28px;
         color: #333333;
       }
       input{
         width: 364px;
         border: none;
         outline: none;
         font-size: 28px;
         color: #999999;
       }
     }
   }
  .proposal-make-tab {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    box-sizing: border-box;
    z-index: 1;
    display: flex;
    flex-direction: row;
    div {
      font-size: 30px;
      font-family: PingFangSC;
      text-align: center;
      vertical-align: middle;
    }
    .clause{
      width: 187px; height: 100%;
      display: flex; flex-direction: column; align-items: center;
      margin: 20px 0 20px 0;
      border-right: 2px solid #F2F2F2;
      img{height:34px;}
      span{font-size: 24px; color: #61A0EF; margin: 9px;}
    }
    .left {
      width: 253px;
      .indicator{display: flex; justify-content: center; margin-top: 40px;}
      .total-prem{
        display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;
        div:first-child{/** 首年保费 */
          font-family: PingFangSC-Regular; font-size: 26px; color: #333333;
        }
        div:nth-child(2){/** 数字 */
          color: #E25151;margin-top: 8px;
          span:first-child{font-size: 32px;}
          span:nth-child(2){font-size: 28px;}
        }
      }
    }
    .middle {
      width: 272px;
      display: flex;align-content: center;align-items: center;
      div{
        width: 272px;height: 80px;
        border-radius: 10px; background-color: #61A0EF; color: #FFFFFF;
        font-size: 28px;line-height: 80px;
      }
    }

  }
  .popup-inner {
    height: 787px;
    background-color: #ffffff;
    position: relative;
    padding: 0 22px;
    overflow: hidden;
    .title {
      font-size: 34px;
      font-family: PingFangSC;
      font-weight: 500;
      color: #333333;
      text-align: center;
      padding: 38px 0 10px;
      display: block;
      margin: auto;
    }
    .md-icon {
      position: absolute;
      top: 38px;
      right: 40px;
      color: #000000;
    }
    .item {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 675px;
      overflow: auto;
      .item-inner {
        display: inline-block;
        width: 190px;
        margin: 0 22.5px;
        flex-shrink: 0;
        padding: 0 0 0;
        .img-block {
          position: relative;
          .img-front {
            display: block;
            width: 100%;
          }
          .img-right {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            img {
              display: block;
              width: 40px;
              height: 40px;
              position: absolute;
              top: 50%;
              left: 50%;
              margin: -20px 0 0 -20px;
            }
          }
        }
        .text {
          font-size: 28px;
          font-family: PingFangSC;
          font-weight: 400;
          text-align: center;
          color: #858b9c;
          margin: 37px 0;
        }
        .text-active {
          color: #2f86f6;
        }
      }
    }
  }
  .popup-inner-no{
    height: 880px !important;
    padding: 0px;
  }
  .border-bottom {
    border-bottom: 1px solid #e7e7e7;
  }
  .md-radio-container{
    float: right;
    position: relative;
    i{
      background: inherit;
      color: #2f86f6;
      left: -48px;
      font-size: .4rem;
      line-height: 40px;
    }
  }
}
.proposal-make{
  height: 100%;
  padding: 0 0 84px;
  position: absolute;
  top: 0px;
  bottom:0px;
  left: 0px;
}

  /** 原“生日”、“年龄”选择器标题被遮挡的修复 */
  /deep/.md-popup-title-bar>div{padding-top: .4rem!important;}





</style>
