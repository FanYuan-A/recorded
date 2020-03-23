<template>
  <div id="sale-info-form">
    <!-- 主险 -->
    <md-field class="md-field-padding1">
      <md-field-item solid arrow title="职业类别" class="border-bottom" v-if="mainRisk.occupationFlag == 'Y'  && !xtOccupationalFalg">
        <div class="field-right" @click="switchOccupationSelector = true">
          <p>{{mainRiskInfo.occupationRank ? occupationalCategoryText : '请选择职业类别'}}</p>
        </div>
      </md-field-item>
      <md-field-item solid title="保险期间" class="no-padding border-bottom">
        <div class="field-right">
          <div class="item-block" :class="{'item-block-inner-active':(item.insurePeriod + item.insurePeriodUnit) == mainRiskInfo.insurePeriodStr}"
            @click="selectInsurePeriod(item)" v-for="(item,index) of optionInsurePeriod" :key="index">
            <div class="item-block-inner">{{item.dspInsurePeriod}}</div>
          </div>
        </div>
      </md-field-item>
      <md-field-item solid title="交费方式" class="no-padding border-bottom">
        <div class="field-right">
          <div class="item-block"
            @click="selectPayIntv(item)" v-for="(item,index) of calOptionPayIntv" :key="index"
            :class="{'item-block-inner-active':mainRiskInfo.payIntv == item.payIntv,'item-block-inner-selectable':!item.selectable}">
            <div class="item-block-inner">{{item.dspPayIntv}}</div>
          </div>
        </div>
      </md-field-item>
      <md-field-item solid title="交费期间" class="no-padding border-bottom" v-if="mainRiskInfo.payIntv != '0'" >
        <div class="field-right">
          <div class="item-block" :class="{'item-block-inner-active':mainRiskInfo.payEndYearStr == (item.payEndYear + item.payEndYearUnit),'item-block-inner-selectable':!item.selectable}"
            @click="selectPayEndYear(item)" v-for="(item,index) of calOptionPayEndYear" :key="index" >
            <div class="item-block-inner">{{item.dspPayEndYear}}</div>
          </div>
        </div>
      </md-field-item>
      <md-field-item solid title="生存金方式" class="no-padding border-bottom" v-if="optionGetYear.length > 0" >
        <div class="field-right">
          <div class="item-block"
            :class="{'item-block-inner-active':mainRiskInfo.getYearStr == (item.getYear + item.getYearUnit),'item-block-inner-selectable':!item.selectable}"
            @click="selectGetYear(item)" v-for="(item,index) of calOptionGetYear" :key="index" >
            <div class="item-block-inner">{{item.dspGetYear}}</div>
          </div>
        </div>
      </md-field-item>
      <md-field-item solid title="续保" v-if="mainRisk.rebuyFlag == '1'" class="no-padding border-bottom">
        <div class="field-right">
          <div class="item-block"
            @click="selectRebuyFlag(item)" v-for="(item,index) of optionRebuyFlag" :key="index"
            :class="{'item-block-inner-active':mainRiskInfo.reBuyFlagShow == item.value,}">
            <div class="item-block-inner">{{item.label}}</div>
          </div>
        </div>
      </md-field-item>
      <md-field-item title="生存金领取间隔" v-if="optionGetIntv.length > 0" class="no-padding border-bottom" >
        <div class="field-right">
          <div class="item-block"
            @click="selectGetIntv(item)" v-for="(item,index) of optionGetIntv" :key="index"
            :class="{'item-block-inner-active':mainRiskInfo.getIntv == (item.getIntv)}" >
            <div class="item-block-inner">{{item.dspGetIntv}}</div>
          </div>
        </div>
      </md-field-item>
      <!-- 录保费算保额-0 -->
      <div class="cal-mode-0" v-if="mainRisk.calMode == '0'">
        <md-field-item solid title="保险费" class="border-bottom">
          <div class="field-right">
            <van-stepper
              :value="vantPremStepperValue"
              :step="calRulePremStep.premStep"
              :min="calRulePremStep.premMin"
              :max="calRulePremStep.premMax"
              :async-change="true"
              input-width="52px"
              @change="onVantPremStepChange"
              @blur="onVantPremStepBlur"
              @minus="onVantPremStepMinus"
              @plus="onVantPremStepPlus"
            />
            <span class="base-amount-unit">{{calRulePremStep.premStepUnit | stepUnitFilter}}</span>
          </div>
        </md-field-item>
      </div>
      <!-- 录保额算保费-1 -->
      <div class="cal-mode-1" v-if="mainRisk.calMode == '1'">
        <md-field-item title="基础保额" class="border-bottom">
          <div class="field-right">
            <van-stepper
              :value="vantStepperValue"
              :step="calRuleAmountStep.amountStep"
              :min="calRuleAmountStep.amountMin"
              :max="calRuleAmountStep.amountMax"
              :async-change="true"
              input-width="52px"
              @change="onVantAmountStepChange"
              @blur="onVantAmountStepBlur"
              @minus="onVantAmountStepMinus"
              @plus="onVantAmountStepPlus"
            />
            <span class="base-amount-unit">{{calRuleAmountStep.amountStepUnit | stepUnitFilter}}</span>
          </div>
        </md-field-item>
      </div>
      <!-- 选保额算保费-2 -->
      <div class="cal-mode-2" v-if="mainRisk.calMode == '2'">
        <md-field-item
          title="基础保额" 
          class="no-padding border-bottom"
          v-if="optionAmountSelect.length > 0"
        >
          <div class="field-right">
            <div
              :key="index"
              class="item-block"
              v-for="(item,index) of optionAmountSelect"
              :class="{'item-block-inner-active':mainRiskInfo.baseAmount == item.realAmt}"
              @click="selectAmount(item)"
            >
              <div class="item-block-inner">{{item.dspAmt}}</div>
            </div>
          </div>
        </md-field-item>
      </div>
      <!-- 保额保费全录入-3 -->
      <div class="cal-mode-3" v-if="mainRisk.calMode == '3'">
        <md-field-item solid title="保险费" class="border-bottom">
          <div class="field-right">
            <van-stepper
              :value="vantPremStepperValue"
              :step="calRulePremStep.premStep"
              :min="calRulePremStep.premMin"
              :max="calRulePremStep.premMax"
              :async-change="true"
              input-width="52px"
              @change="onVantPremStepChange"
              @blur="onVantPremStepBlur"
              @minus="onVantPremStepMinus"
              @plus="onVantPremStepPlus"
            />
            <span class="base-amount-unit">{{calRulePremStep.premStepUnit | stepUnitFilter}}</span>
          </div>
        </md-field-item>
        <md-field-item title="基础保额" class="border-bottom">
          <div class="field-right">
            <van-stepper
              :value="vantStepperValue"
              :step="calRuleAmountStep.amountStep"
              :min="calRuleAmountStep.amountMin"
              :max="calRuleAmountStep.amountMax"
              :async-change="true"
              input-width="52px"
              @change="onVantAmountStepChange"
              @blur="onVantAmountStepBlur"
              @minus="onVantAmountStepMinus"
              @plus="onVantAmountStepPlus"
            />
            <span class="base-amount-unit">{{calRuleAmountStep.amountStepUnit | stepUnitFilter}}</span>
          </div>
        </md-field-item>
      </div>
    </md-field>
    <!-- 主险下的提示说明信息 -->
    <p class="insure-msg" v-if="mainRisk.insureMessage">{{mainRisk.insureMessage}}</p>
    <!-- 职业选择 -->
    <md-selector
			ref="selector"
      :mask-closable="false"
			v-model="switchOccupationSelector"
			:data="optionOccupation"
      max-height="200px"
			title="选择职业类别"
			okText="确认"
			:default-value="mainRiskInfo.occupationRank"
			@confirm="onSelectOccupationConfirm"
      @cancel="switchOccupationSelector=false"
		></md-selector>
  </div>
</template>

<script>
/* eslint-disable */
import {Field,FieldItem,Selector,CheckBox,DatePicker,Radio,Switch,Icon, Tip,Tag,InputItem,ActivityIndicator,TabPicker} from "mand-mobile"
import { Stepper } from "vant"
import esp from "@/api/esp.js"
import commonUtils from "@/utils/common.js"
// import datePickerView from '@/components/datePickerView.vue'
import mixinForSaleInfo from "@/components/mixin/mixinForSaleInfo.js"
export default {
  name: "saleInfoForm",
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [CheckBox.name]: CheckBox,
    [DatePicker.name]: DatePicker,
    [Stepper.name]: Stepper,
    [Radio.name]: Radio,
    [Switch.name]: Switch,
    [Icon.name]: Icon,
    [Tip.name]: Tip,
    [Tag.name]: Tag,
    [InputItem.name]: InputItem,
    [ActivityIndicator.name]: ActivityIndicator,
    [TabPicker.name]: TabPicker,
    [Selector.name]: Selector,
  },
  mixins: [mixinForSaleInfo],
  props: {
    mainRisk: { //主险信息
      type: Object,
      required: true
    },
    insureInfo: { // 被保人
      type: [Object],
      required: true
    },
    // 职业和试算险种数组同一层次，需要单独传
    occuptionRankProp:{
      type: [String],
      required: true
    },
  },
  data() {
    return {
      // 表单相关值
      mainRiskInfo: { // 收集主险的所有选项值
        mult: 1, //份数
        // socialSecurityFlag: "", //社保标志（219-12-18社保拆到被保人层次）
        // occupationalCategory: "", //职业类别编码（219-12-19试算同一选档次）
        occupationRank:'', //  职业等级（219-12-19试算统一选档次）
        insurePeriodStr: "", //保险期间
        payIntv: "", //交费方式
        payEndYearStr: "", //交费期间
        getYearStr: "", //生存金领取
        getIntv: "", //生存金领取间隔
        basePrem: '', //需要录入的保费
        baseAmount: '', //需要录入的保额     
        reBuyFlagShow: "", // 续保方式(试算不需要此值，存此处只是方便回显)
      },
      // 各选项列表--start
      optionInsurePeriod: [], //保障期间选项列表
      optionPayIntv: [], //交费方式选项列表
      optionPayEndYear: [], //交费期间选项列表
      optionGetYear: [], //生存金方式选项列表
      rulePremStep: [], //保费步进规则
      ruleAmountStep: [], //保额步进规则
      optionAmountSelect: [], //保险金额选项列表
      optionGetIntv: [], //生存金领取间隔列表
      optionRebuyFlag: [ //续保选项列表
        {
          label: "自动续保",
          value: "-1"
        },
        {
          label: "满期终止",
          value: "0"
        }
      ],
      optionOccupation:[
        {
          value: '1',
          text: '1类'
        },
        {
          value: '2',
          text: '2类'
        },
        {
          value: '3',
          text: '3类'
        },
        {
          value: '4',
          text: '4类'
        },
        {
          value: '5',
          text: '5类'
        },
        {
          value: '6',
          text: '6类'
        },
      ],
      occupationalCategoryText: "", //职业类别显示值(仅仅是展示)
      // 各选项列表--end
      vantStepperValue: "", //保额步进展示值
      vantPremStepperValue: "", //保费步进展示值
      switchOccupationSelector:false, // 职业selector是不是显示
      // eval取保额或保费计算属性的单位会堆栈溢出的临时值
      copyRuleAmountStep: {
        amountMin: 1,
        amountMax: 1.7976931348623157e308,
        amountStep: 1,
        amountStepUnit: "Y1"
      },
      copyRulePremStep: {
        premMax: 1.7976931348623157e308,
        premMin: 1,
        premStep: 1,
        premStepUnit: "Y1"
      },
      xtOccupationalFalg: false, //  信泰被保人年龄六岁,7岁-15岁前显示职业列别
    }
  },
  computed: {
    // 计算交费方式
    calOptionPayIntv() {
      let arr = [].concat(this.optionPayIntv) //得到缴费方式选项列表
      arr.forEach(el => {
        el.applyRule ? el.selectable = this.getEvalResult("payIntv", el.applyRule, el) : true
      })
      return arr
    },
    // 计算交费期间
    calOptionPayEndYear() {
      let arr = [].concat(this.optionPayEndYear)
      arr.forEach(el => {
        el.applyRule ? el.selectable = this.getEvalResult("", el.applyRule, el) : true
      })
      return arr
    },
    // 计算生存金方式
    calOptionGetYear() {
      let arr = [].concat(this.optionGetYear)
      arr.forEach((el, index) => {
        el.applyRule ? el.selectable = this.getEvalResult("getYear", el.applyRule, el) : true
      })
      return arr
    },
    // 保费---步进规则
    calRulePremStep() {
      let arr = [].concat(this.rulePremStep)
      let ruleIndex = null
      arr.forEach((el, index) => {
        el.applyRule ? this.getEvalResult("", el.applyRule, el) ? (ruleIndex = index) : false
          : (ruleIndex = 0)
      })
      if (ruleIndex !== null) {
        return {
          premMin: !!arr[ruleIndex].premMin ? parseFloat(arr[ruleIndex].premMin) : 0,
          premMax: !!arr[ruleIndex].premMax ? parseFloat(arr[ruleIndex].premMax) : 1.7976931348623157e308,
          premStep: !!arr[ruleIndex].premStep ? parseFloat(arr[ruleIndex].premStep) : 1,
          premStepUnit: arr[ruleIndex].premStepUnit
        }
      } else {
        // 步进规则的watch是为了处理在规则变化时的对应表单值的初始化问题，为了限制初始化时的频繁赋值进行了JSON的判断。此处的单位应与实际单位不同，防止在页面初始化时表单值无法获取正确的赋值，因此假造单位Y1(保额和保费的对应规则相同)。
        return {
          premMin: 1,
          premMax: 1.7976931348623157e308,
          premStep: 1,
          premStepUnit: "Y1"
        }
      }
    },
    // 保额---步进规则
    calRuleAmountStep() {
      let arr = [].concat(this.ruleAmountStep)
      let ruleIndex = null
      arr.forEach((el, index) => {
        el.applyRule ? this.getEvalResult("", el.applyRule, el) ? (ruleIndex = index) : false
          : (ruleIndex = 0)
      })
      if (ruleIndex !== null) {
        return {
          amountMin: !!arr[ruleIndex].amountMin ? parseFloat(arr[ruleIndex].amountMin) : 0,
          amountMax: !!arr[ruleIndex].amountMax ? parseFloat(arr[ruleIndex].amountMax) : 1.7976931348623157e308,
          amountStep: !!arr[ruleIndex].amountStep ? parseFloat(arr[ruleIndex].amountStep) : 1,
          amountStepUnit: arr[ruleIndex].amountStepUnit
        }
      } else {
        return {
          amountMin: 1,
          amountMax: 1.7976931348623157e308,
          amountStep: 1,
          amountStepUnit: "Y1"
        }
      }
    },
  },
  watch: {
    switchOccupationSelector(newVal, oldVal){
      this.$emit('outputSwitch',newVal)
    },
    mainRiskInfo:{
      handler(newVal, oldVal) {
        let obj={
          calRuleAmountStep:this.calRuleAmountStep, // 保额---步进规则
          calRulePremStep:this.calRulePremStep, // 保费---步进规则
        }
        this.$emit('outputMainInfo',Object.assign(newVal, obj)) // 将主险的信息传到父组件中
      },
      // immediate: true,
      deep: true
    },
    'mainRiskInfo.insurePeriodStr'(newVal,oldVal){
      this.reselectSaleInfoValue('payEndYear')
    },
    "mainRiskInfo.payIntv"(newVal, oldVal) {
      newVal == "0"  ? (this.mainRiskInfo.payEndYearStr = "1Y") : this.reselectSaleInfoValue("payEndYear")
      this.reselectSaleInfoValue("getYear")
    },
    "mainRiskInfo.payEndYearStr"() {
      this.reselectSaleInfoValue("getYear")
    },
    // 保额步进录入的区间范围发生变化，则初始化录入的初始值
    calRuleAmountStep(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        if (this.mainRisk.calMode == "1" || this.mainRisk.calMode == "3") {
          // 保额步进的非计算属性值，给eval用防止，堆栈溢出
          this.copyRuleAmountStep = newVal
          if (this.mainRiskInfo.baseAmount === '' || this.mainRiskInfo.baseAmount <= newVal.amountMin) {
            this.vantStepperValue = this.mainRiskInfo.baseAmount = this.calRuleAmountStep.amountMin    
          }
        }
      }
    },
    // 保费步进录入的区间范围发生变化，则初始化录入的初始值
    calRulePremStep(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        if (this.mainRisk.calMode == "0" || this.mainRisk.calMode == "3") {
          if (this.mainRiskInfo.basePrem <= newVal.premMin) {
            this.vantPremStepperValue = this.mainRiskInfo.basePrem = this.calRulePremStep.premMin
          }
        }
      }
    },
  },
  created() {
    // 必传值：：insurePeriod	保障期间/ payIntv	交费方式 /payEndYear	交费期间
    //职业列表
    if (this.mainRisk.occupationFlag == 'Y') {
      this.optionOccupation = this.optionOccupation // 以后会限制档次范围
      this.mainRiskInfo.occupationRank = this.optionOccupation[0].value
      this.occupationalCategoryText = this.optionOccupation[0].text
    }
    // 保险期间（必返）---现在没有处理applyRule
    this.mainRisk.insurePeriod.forEach(el =>{
      this.$set(el, 'selectable', true)
    })
    this.optionInsurePeriod = this.mainRisk.insurePeriod
    // 保险期间赋值
    this.mainRiskInfo.insurePeriodStr = this.mainRisk.insurePeriod[0].insurePeriod + this.mainRisk.insurePeriod[0].insurePeriodUnit
    // 交费方式（必返）
    this.mainRisk.payIntv.forEach(el => {
      this.$set(el, "selectable", true)
    })
    this.optionPayIntv = this.mainRisk.payIntv
    // 交费方式赋值
    this.mainRiskInfo.payIntv = this.mainRisk.payIntv[0].payIntv
    // 交费期间（必返） ([]/交费方式只有趸交时也存在只是不显示)
    if(this.mainRisk.payEndYear){
      this.mainRisk.payEndYear.forEach(el => {
        this.$set(el, "selectable", true)
      })
      this.optionPayEndYear = this.mainRisk.payEndYear // 交费期间可依据交费方式自动赋值
    }
    // 续保  mainRisk.rebuyFlag 是否展示续保方式 0-隐藏 1-展示
    this.mainRisk.rebuyFlag == '1' ? (this.mainRiskInfo.reBuyFlagShow = "-1") : false
    // 生存金领取间隔 (年领/月领;[]/null)---现在没有处理applyRule
    if (this.mainRisk.getIntv) {
      this.optionGetIntv = this.mainRisk.getIntv
      // 生存金领取间隔赋值
      this.mainRiskInfo.getIntv = this.mainRisk.getIntv[0].getIntv
    }
    // 生存金方式 ([]/null)
    if (this.mainRisk.getYear) {
      this.mainRisk.getYear.forEach(el => {
        this.$set(el, "selectable", true)
      })
      this.optionGetYear = this.mainRisk.getYear
    }
    // 保额保费模式
    if (this.mainRisk.calMode == "0") {
      //0-录保费算保额 1-录保额算保费 2-选保额算保费 3-录入保额保费（保费算保额模式）
      this.rulePremStep = this.mainRisk.premStep
    } else if (this.mainRisk.calMode == "1") {
      this.ruleAmountStep = this.mainRisk.amountStep
    } else if (this.mainRisk.calMode == "2") { //---现在没有处理applyRule
      if (this.mainRisk.amountSelect) { 
        this.mainRisk.amountSelect.forEach(el => {
          el.realAmt = parseInt(el.realAmt)
        })
        this.optionAmountSelect = this.mainRisk.amountSelect
        // 保额赋值
        this.mainRiskInfo.baseAmount = this.optionAmountSelect[0].realAmt
      }
    } else if (this.mainRisk.calMode == "3") {
      // 目前都为保费算保额-保费步进式-保额不超过保费
      this.rulePremStep = this.mainRisk.premStep
      this.ruleAmountStep = this.mainRisk.amountStep
    }
    // 初始化表单值
    console.log(this.mainRisk.session)
    if (this.mainRisk.session) {
      let session = this.mainRisk.session
      // 有session，职业必不为空
      this.mainRiskInfo.occupationRank = this.occuptionRankProp
      this.optionOccupation.forEach(el =>{
        el.value === this.mainRiskInfo.occupationRank ? this.occupationalCategoryText = el.text : false
      })
      //主险
      this.mainRiskInfo.insurePeriodStr = session.insuYear + session.insuYearFlag
      this.mainRiskInfo.payIntv = session.payIntv
      this.mainRiskInfo.payEndYearStr = session.payEndYear + session.payEndYearFlag
      this.mainRiskInfo.getYearStr = session.getYear + session.getYearFlag
      // session中的amt和prem都是以’元‘为单位
      if(this.mainRisk.calMode === '0'){ //录保费算保额
        this.mainRiskInfo.basePrem = this.vantPremStepperValue = this.calRulePremStep.premStepUnit == "Y" ? session.prem :  
          this.calRulePremStep.premStepUnit == "W" ? session.prem / 10000 : session.prem / 1000
      }else if(this.mainRisk.calMode === '1'){ //录保额算保费-
        this.mainRiskInfo.baseAmount = this.vantStepperValue = this.calRuleAmountStep.amountStepUnit == 'Y' ?  session.amt :
          this.calRuleAmountStep.amountStepUnit == "W" ? session.amt / 10000 : session.amt / 1000
      }else if(this.mainRisk.calMode === '2'){ //选保额算保费
        this.mainRiskInfo.baseAmount = session.amt
      }else if(this.mainRisk.calMode === '3'){ //保额保费全录入
        this.mainRiskInfo.baseAmount = this.vantStepperValue = this.calRuleAmountStep.amountStepUnit == "Y" ? session.amt :
          this.calRuleAmountStep.amountStepUnit == "W" ? session.amt / 10000 : session.amt / 1000
        this.mainRiskInfo.basePrem = this.vantPremStepperValue = this.calRulePremStep.premStepUnit == 'Y' ? session.prem :
          this.calRulePremStep.premStepUnit == "W" ? session.prem / 10000 : session.prem / 1000
      }
      this.mainRiskInfo.reBuyFlagShow = session.reBuyFlagShow
    }
  },
  methods: {
    // 表单选项变化时的对象表单值重选
    reselectSaleInfoValue(value) {
      let self = this
      let map = {
        // 将表单里值和选项对应起来的映射对象
        payIntv: "calOptionPayIntv",
        payEndYear: "calOptionPayEndYear",
        getYear: "calOptionGetYear"
      }
      let booleanArr = self[map[value]].map(function(el) {
        return el.selectable
      })
      self[map[value]].forEach(function(el, index) {
        //这里区别开，逻辑一样，只因ChargePeriod和insurePeriod是组合值，需要拼装才能和表单对应的里值对应上。看else的逻辑好理解。
        let firstTrueIndex = booleanArr.indexOf(true)
        if (value == "payEndYear" || value == "getYear") {
          if (self.mainRiskInfo[value + "Str"] == el[value] + el[value + "Unit"]) {
            if (!el.selectable) {
              if (firstTrueIndex >= 0) {
                self.mainRiskInfo[value + "Str"] = self[map[value]][firstTrueIndex][value] + self[map[value]][firstTrueIndex][value + "Unit"]
              } else {
                self.mainRiskInfo[value + "Str"] = ""
              }
            }
          } else if (self.mainRiskInfo[value + "Str"] != el[value] + el[value + "Unit"] &&
            index == self[map[value]].length - 1 && self.mainRiskInfo[value + "Str"] == "") {
            if (firstTrueIndex >= 0) {
              self.mainRiskInfo[value + "Str"] = self[map[value]][firstTrueIndex][value] + self[map[value]][firstTrueIndex][value + "Unit"]
            }
          }
        } else {
          // 先看表单里值和对应的选项，选项是可选的-不管他，选项是不可选的-从选项里找第一个可选的
          if (self.mainRiskInfo[value] == el[value]) {
            if (!el.selectable) {
              if (firstTrueIndex >= 0) {
                self.mainRiskInfo[value] = self[map[value]][firstTrueIndex][value]
              } else {
                self.mainRiskInfo[value] = ""
              }
            }
            // 此处对应表单里值为空字符串时的自动选值
          } else if (
            self.mainRiskInfo[value] != el[value] && index == self[map[value]].length - 1 && self.mainRiskInfo[value] == ""
          ) {
            // 无匹配选项，而且循环到最后一项时，寻找选项中第一个可选项给表单对应值赋值
            if (firstTrueIndex >= 0) {
              self.mainRiskInfo[value] = self[map[value]][firstTrueIndex][value]
            }
          }
        }
      })
    },
    // 保额---vant步进器change函数
    onVantAmountStepChange(value) {
      this.vantStepperValue = value
    },
    // 保额---vant步进器blur函数
    onVantAmountStepBlur() {
      let num =  Math.round((this.vantStepperValue - this.calRuleAmountStep.amountMin) / this.calRuleAmountStep.amountStep) 
        * this.calRuleAmountStep.amountStep + this.calRuleAmountStep.amountMin
      if (num < this.calRuleAmountStep.amountMin) {
        this.mainRiskInfo.baseAmount = this.vantStepperValue = this.calRuleAmountStep.amountMin.toFixed(1)
      } else if (num > this.calRuleAmountStep.amountMax) {
        this.mainRiskInfo.baseAmount = this.vantStepperValue = this.calRuleAmountStep.amountMax.toFixed(1)
      } else {
        this.mainRiskInfo.baseAmount = this.vantStepperValue = num.toFixed(1)
      }
      if(this.mainRisk.calMode === "3"){
        let realPrem = this.mainRiskInfo.basePrem * this.getRate(this.calRulePremStep.premStepUnit)
        let realAmt = num * this.getRate(this.calRuleAmountStep.amountStepUnit)
        if (realAmt > realPrem) {
          this.mainRiskInfo.baseAmount = this.vantStepperValue = realPrem / this.getRate(this.calRuleAmountStep.amountStepUnit)
        }
      }
    },
    // 保额---vant步进器minus函数
    onVantAmountStepMinus() {
      this.mainRiskInfo.baseAmount = this.vantStepperValue
    },
    // 保额---vant步进器plus函数
    onVantAmountStepPlus() {
      this.mainRiskInfo.baseAmount = this.vantStepperValue
      if (this.mainRisk.calMode == "3") {
        this.onVantAmountStepBlur() //点加后需要校验，可直接调用onVantAmountStepBlur
      }
    },
    // 保费vant步进器change函数
    onVantPremStepChange(value) {
      this.vantPremStepperValue = value
    },
    // 保费vant步进器blur函数
    onVantPremStepBlur(value) {
      let num =  Math.round((this.vantPremStepperValue - this.calRulePremStep.premMin) / this.calRulePremStep.premStep)
         * this.calRulePremStep.premStep + this.calRulePremStep.premMin
      if (num < this.calRulePremStep.premMin) {
        this.mainRiskInfo.basePrem = this.vantPremStepperValue = this.calRulePremStep.premMin
      } else if (num > this.calRulePremStep.premMax) {
        this.mainRiskInfo.basePrem = this.vantPremStepperValue = this.calRulePremStep.premMax
      } else {
        this.mainRiskInfo.basePrem = this.vantPremStepperValue = num.toFixed(1)
      }
      if (this.mainRisk.calMode == "3") {
        let realPrem = num * this.getRate(this.calRulePremStep.premStepUnit)
        let realAmt = this.mainRiskInfo.baseAmount * this.getRate(this.calRuleAmountStep.amountStepUnit)
        if (realAmt > realPrem) {
          this.mainRiskInfo.baseAmount = this.vantStepperValue = realPrem / this.getRate(this.calRuleAmountStep.amountStepUnit)
        }
      }
    },
    // 保费vant步进器minus函数
    onVantPremStepMinus() {
      this.mainRiskInfo.basePrem = this.vantPremStepperValue
      if (this.mainRisk.calMode == "3") {
        this.onVantAmountStepBlur()
      }
    },
    // 保费vant步进器plus函数
    onVantPremStepPlus() {
      this.mainRiskInfo.basePrem = this.vantPremStepperValue
    },
    onSelectOccupationConfirm(data){
      this.mainRiskInfo.occupationRank = data.value
      this.occupationalCategoryText = data.text
      this.switchOccupationSelector = false
    },
    // 选择保险期间
    selectInsurePeriod(item) {
      this.mainRiskInfo.insurePeriodStr == item.insurePeriod + item.insurePeriodUnit ? true
        : this.mainRiskInfo.insurePeriodStr = item.insurePeriod + item.insurePeriodUnit
    },
    // 选择交费方式
    selectPayIntv(item) {
      if (!item.selectable) { return }
      if (this.mainRiskInfo.payIntv != item.payIntv) {
        this.mainRiskInfo.payIntv = item.payIntv
        if (item.payIntv == "0") {
          this.mainRiskInfo.payEndYearStr = "1Y"
        } else {
          this.mainRiskInfo.payEndYearStr = this.optionPayEndYear[0].payEndYear + this.optionPayEndYear[0].payEndYearUnit
        }
      }
    },
    // 选择交费期间
    selectPayEndYear(item) {
      if (!item.selectable) { return }
      this.mainRiskInfo.payEndYearStr == item.payEndYear + item.payEndYearUnit ? true : (this.mainRiskInfo.payEndYearStr = item.payEndYear + item.payEndYearUnit)
    },
    // 选择生存金
    selectGetYear(item) {
      if (!item.selectable) { return }
      this.mainRiskInfo.getYearStr == item.getYear + item.getYearUnit ? true : (this.mainRiskInfo.getYearStr = item.getYear + item.getYearUnit)
    },
    // 选择保额
    selectAmount(item) {
      this.mainRiskInfo.baseAmount == item.realAmt ? true : (this.mainRiskInfo.baseAmount = item.realAmt)
    },
    // 选择生存金领取间隔
    selectGetIntv(item) {
      this.mainRiskInfo.getIntv == item.getIntv ? true : (this.mainRiskInfo.getIntv = item.getIntv)
    },
    // 选择续保
    selectRebuyFlag(item) {
      this.mainRiskInfo.reBuyFlagShow == item.value ? true : (this.mainRiskInfo.reBuyFlagShow = item.value)
    },
    // eval判断语句
    getEvalResult(type, evalStr, el) {
      // 传入的年龄都是Y（周岁）(2020-1-7修改年龄真是传出 D/Y)
      // let insuredAgeDay = this.insureInfo.age == "0" ? 365 : this.insureInfo.age * 365
      // let insuredAge = this.insureInfo.age
      let insuredAgeDay = this.insureInfo.unit == "D" ? this.insureInfo.ageDay ? this.insureInfo.ageDay : 0
        : this.insureInfo.age*365
      let insuredAge = this.insureInfo.unit == "Y" ? this.insureInfo.age : 0
      let appntAge = ""
      let insuredSex = this.insureInfo.sex
      let payIntv = parseInt(this.mainRiskInfo.payIntv)
      let payYear = ""
      if (type == "payIntv") {
        payYear = el.payIntv == "0" ? 1 : 999
      } else if (type == "getYear") {
        payYear = parseInt(this.mainRiskInfo.payEndYearStr.substring(0, this.mainRiskInfo.payEndYearStr.length - 1))
      }
      let insuredPeriod = parseInt(this.mainRiskInfo.insurePeriodStr.substring(0, this.mainRiskInfo.insurePeriodStr.length - 1))
      let prem = ""
      let amount = ""
      let mult = ""
      let amountLevel = ""
      let socialSecurity = this.insureInfo.isHaveSocial ? 1:0 // 社保
      let mainRisk = {
        payYear: parseInt(this.mainRiskInfo.payEndYearStr.substring(0,this.mainRiskInfo.payEndYearStr.length - 1)),
        payIntv: parseInt(this.mainRiskInfo.payIntv),
        insuredPeriod: "",
        prem: "",
        amount: "",
        riskCode: this.mainRisk.riskCode
      }
      let selectedAddRiskCodes = this.selectedAddRiskCodes
      if (this.mainRisk.calMode == "0") {
        mainRisk.amount =  parseInt(this.mainRiskInfo.baseAmount)
      } else if (this.mainRisk.calMode == "1") {
        mainRisk.amount = this.mainRiskInfo.baseAmount *this.getRate(this.copyRuleAmountStep.amountStepUnit)
        mainRisk.prem =  parseInt(this.mainRiskInfo.basePrem)
      } else if (this.mainRisk.calMode == "2") {
        mainRisk.prem =  parseInt(this.mainRiskInfo.basePrem)
      } else if (this.mainRisk.calMode == "3") {
      }
      return eval(evalStr)
      // function evil(){
      //     'use strict'
      //     return new Function('insuredAgeDay','insuredAge','appntAge','payIntv','payYear','insuredPeriod','prem','amount','mult','amountLevel','mainRisk','selectedAddRiskCodes','"use strict"return (' + evalStr + ')')
      // }
      // return evil(insuredAgeDay,insuredAge,appntAge,payIntv,payYear,insuredPeriod,prem,amount,mult,amountLevel,mainRisk,selectedAddRiskCodes)
    },
  }
}
</script>

<style lang="less" scoped>
// /deep/
// .md-selector-container{
//   height: 350px;
// }
.md-field {
  .md-field-item {
    .field-right {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
      align-items: center;
      .age-range {
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        text-align: right;
      }
      .item-block {
        position: relative;
        display: block;
        text-align: center;
        color: #111a34;
        // padding: 0 13px;
        border: 1px solid #c5cad5;
        border-radius: 4px;
        box-sizing: border-box;
        margin: 15px 0 15px 20px;
        font-family: PingFangSC;
        font-weight: 400;
        min-width: 147.5px;
        height: 60px;
        line-height: 60px;
        .item-block-inner {
          font-size: 52px;
          transform: scale(0.5);
          transform-origin: 50% 51%;
        }
        .md-tag {
          position: absolute;
          top: 0;
          right: 0;
          .size-tiny {
            font-size: 10px;
          }
        }
      }
      .item-block-inner-active {color: #61A0EF;background-color:#61A0EF19;border-color: #61A0EF;}
      .item-block-inner-selectable {color: #EEEEEE!important; background-color: #FFFFFF!important;border-color: #EEEEEE!important;}
      .base-amount-unit {
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 50px;
        height: 50px;
        vertical-align: middle;
        margin: 0 0 0 15px;
      }
      .base-prem-num {
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: bold;
        color: #ed1515;
        display: inline-block;
      }
      .base-prem-unit {
        margin: 0 0 0 10px;
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: 400;
        color: #333440;
      }
      p {
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: 400;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      /deep/ .md-radio-label {
        font-size: 28px;
        font-family: PingFangSC;
        font-weight: 400;
        color: #333440;
      }
      .md-stepper {
        /deep/ .md-stepper-button:after {
          height: 1px;
        }
        /deep/ .md-stepper-button:before {
          width: 1px;
        }
      }
      .van-stepper {
        /deep/ .van-stepper__minus {
          width: 56px;
          height: 56px;
          margin: 0;
          padding: 10px;
          border: 0;
        }
        /deep/ .van-stepper__plus {
          width: 56px;
          height: 56px;
          margin: 0;
          padding: 10px;
          border: 0;
        }
        /deep/ .van-stepper__minus {
          border-radius: 8px 0 0 8px;
        }
        /deep/ .van-stepper__plus {
          border-radius: 0 8px 8px 0;
        }
        /deep/ .van-stepper__input {
          width: 64px;
          height: 56px;
          margin: 0 4px;
          font-size: 24px;
          border-width: 2px 0;
        }
        /deep/ .van-stepper__minus::before {
          width: 26px;
          height: 1px;
        }
        /deep/ .van-stepper__plus::before {
          width: 26px;
          height: 1px;
        }
        /deep/ .van-stepper__plus::after {
          width: 1px;
          height: 26px;
        }
      }
    }
    .field-right-flex {
      display: flex;
    }
    /deep/ .md-input-item-fake {
      font-size: 28px;
      font-family: PingFangSC;
      font-weight: bold;
      color: #ed1515;
    }
    /deep/ .md-field-item-title {
      font-size: 28px;
      font-family: PingFangSC;
      font-weight: 400;
    }
    /deep/ .md-field-item-content {
      &:before {
        border-bottom: 0px solid #e7e7e7;
      }
    }
  }
  .md-field-title--slot {
    position: relative;
  }
  /deep/ .no-padding {
    .md-field-item-content {
      padding: 15px 0;
    }
  }
}
.md-field-padding1 {
  margin: 0;
  padding: 0 30px;
}
.md-field-padding2 {
  margin: 20px 0 0;
  padding: 36px 28px 0;
}
.border-bottom {
  border-bottom: 1px solid #e7e7e7;
}
.insure-msg {
  font-size: 24px;
  font-family: PingFangSC;
  font-weight: 400;
  padding: 20px;
  background-color: #f5f5f5;
}
</style>