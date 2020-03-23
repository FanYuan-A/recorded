<template>
	<div id="risk-info-form">
		<md-field class="md-field-padding2">
			<div slot="header" class="md-field-heading">
				<p class="md-field-title" @click="riskInfo.active=!riskInfo.active">{{riskInfo.addRiskBasic.riskName}}</p>
				<p class="md-field-brief">{{riskInfo.addRiskBasic.rejectMessage}}</p>
			</div>
      <md-switch  v-model="riskInfo.active" slot="action" :disabled="!riskInfo.selectable"></md-switch>
			<div v-if="riskInfo.active">
				<md-field-item title="份数" class="border-bottom" v-if="riskInfo.addMultStep && riskInfo.addMultStep.display == '1'">
					<div class="field-right">
						<van-stepper
							:value="vantMultStepperValue"
							:step="calRulemultStep.multStep"
							:min="calRulemultStep.multMin"
							:max="calRulemultStep.multMax"
							input-width="42px"
							integer
							async-change
							@change="onVantMultStepChange"
							@blur="onVantMultStepBlur"
							@minus="onVantMultStepMinus"
							@plus="onVantMultStepPlus"
						/>
					</div>
				</md-field-item>
				<md-field-item solid title="保险期间" class="no-padding border-bottom" v-if="riskInfo.addInsurePeriod.display == '1'" >
					<div class="field-right">
						<div
							:key="index"
							class="item-block"
							v-for="(item,index) of calOptionInsurePeriod"
							:class="{
                        'item-block-inner-active':(item.insurePeriod + item.insurePeriodUnit) == addiRiskInfo.insurePeriodStr,
                        'item-block-inner-selectable':!item.selectable
                      }"
							@click="selectInsurePeriod(item)"
						>
							<div class="item-block-inner">{{item.dspInsurePeriod}}</div>
						</div>
					</div>
				</md-field-item>
				<md-field-item solid title="交费方式" class="no-padding border-bottom" v-if="riskInfo.addPayIntv.display == '1'">
					<div class="field-right">
						<div
							:key="index"
							class="item-block"
							v-for="(item,index) of calOptionPayIntv"
							:class="{
                        'item-block-inner-active':addiRiskInfo.payIntv == item.payIntv,
                        'item-block-inner-selectable':!item.selectable    
                      }"
							@click="selectPayIntv(item)"
						>
							<div class="item-block-inner">{{item.dspPayIntv}}</div>
						</div>
					</div>
				</md-field-item>
				<md-field-item solid title="交费期间" class="no-padding border-bottom" v-if="riskInfo.addPayEndYear.display == '1' && addiRiskInfo.payIntv != '0'">
					<div class="field-right">
						<div
							:key="index"
							class="item-block"
							v-for="(item,index) of calOptionPayEndYear"
							:class="{
												'item-block-inner-active':addiRiskInfo.payEndYearStr == (item.payEndYear + item.payEndYearUnit),
												'item-block-inner-selectable':!item.selectable
											}"
							@click="selectPayEndYear(item)"
						>
							<div class="item-block-inner">{{item.dspPayEndYear}}</div>
						</div>
					</div>
				</md-field-item>
				<md-field-item solid title="保额档次" class="no-padding border-bottom" v-if="riskInfo.addPlanLevel && riskInfo.addPlanLevel.display == '1'" >
					<div class="field-right">
						<div
							:key="index"
							class="item-block"
							v-for="(item,index) of calPlanLevel"
							:class="{
												'item-block-inner-active':addiRiskInfo.planLevel == item.planLevel,
												'item-block-inner-selectable':!item.selectable
											}"
							@click="selectPlanLevel(item)"
						>
							<div class="item-block-inner">{{item.dspPlanLevel}}</div>
						</div>
					</div>
				</md-field-item>
				<md-field-item solid arrow title="保险责任" class="no-padding border-bottom" v-if="riskInfo.addRiskDuty && riskInfo.addRiskDuty.display == '1'" >
					<div class="field-right" @click="switchSelector = true">
						<p>{{calRiskDuty}}</p>
					</div>
				</md-field-item>
				<md-field-item title="生存金领取间隔" class="no-padding border-bottom" v-if="optionGetIntv.length > 0">
					<div class="field-right">
						<div class="item-block" :class="{'item-block-inner-active':addiRiskInfo.getIntv == (item.getIntv)}"
							@click="selectGetIntv(item)" v-for="(item,index) of optionGetIntv" :key="index">
							<div class="item-block-inner">{{item.dspGetIntv}}</div>
						</div>
					</div>
				</md-field-item>
				<!-- 只展示保费 -->
				<!-- <div class="add-cal-mode-0" v-if="riskInfo.addCalMode == '0'">
          <md-field-item solid title="保险费">
          </md-field-item> 
				</div> -->
				<!-- 录保额算保费 -->
				<div class="add-cal-mode-1" v-if="riskInfo.addCalMode == '1'">
					<md-field-item title="基础保额" class="no-padding border-bottom" v-if="riskInfo.addCalMode == '1'">
						<div class="field-right">
							<van-stepper
								:value="vantAmountStepperValue"
								:step="calRuleAmountStep.amountStep"
								:min="calRuleAmountStep.amountMin"
								:max="calRuleAmountStep.amountMax"
								:async-change="true"
								input-width="42px"
								@change="onVantAmountStepChange"
								@blur="onVantAmountStepBlur"
								@minus="onVantAmountStepMinus"
								@plus="onVantAmountStepPlus"
							/>
							<span class="base-amount-unit">{{calRuleAmountStep.amountStepUnit | stepUnitFilter}}</span>
						</div>
					</md-field-item>
				</div>
				<!-- 选保额算保费 -->
				<div class="add-cal-mode-2" v-if="riskInfo.addCalMode == '2'">
					<md-field-item title="基础保额" class="no-padding border-bottom" v-if="calOptionAmountSelect.length > 0">
						<div class="field-right">
							<div class="item-block"
								v-for="(item,index) of calOptionAmountSelect" :key="index" @click="selectAmount(item)"
								:class="{'item-block-inner-active':addiRiskInfo.baseAmount == item.realAmt, 'item-block-inner-selectable':!item.selectable }">
								<div class="item-block-inner">{{item.dspAmt}}</div>
							</div>
						</div>
					</md-field-item>
				</div>
				<!-- 录保费算保额 -->
				<div class="add-cal-mode-3" v-if="riskInfo.addCalMode == '3'">
					<md-field-item solid title="保险费" class="border-bottom">
						<div class="field-right">
							<van-stepper
								:value="vantPremStepperValue"
								:step="calRulePremStep.premStep"
								:min="calRulePremStep.premMin"
								:max="calRulePremStep.premMax"
								:async-change="true"
								input-width="42px"
								@change="onVantPremStepChange"
								@blur="onVantPremStepBlur"
								@minus="onVantPremStepMinus"
								@plus="onVantPremStepPlus"
							/>
							<span class="base-amount-unit">{{calRulePremStep.premStepUnit | stepUnitFilter}}</span>
						</div>
					</md-field-item>
				</div>
				<div class="add-cal-mode-4" v-if="riskInfo.addCalMode == '4'"></div>
			</div>
		</md-field>
		<md-selector
			ref="selector"
      :mask-closable="false"
      max-height="200px"
			v-model="switchSelector"
			:data="optionRiskDuty"
			title="选择保险责任"
			okText="确认"
			:default-value="addiRiskInfo.riskDuty"
			@confirm="onSelectorConfirm"
		></md-selector>
	</div>
</template>

<script>
/* eslint-disable */
import {Field,FieldItem,DatePicker,Radio,Switch,Icon,InputItem,Picker,Selector,} from 'mand-mobile'
import { Stepper } from 'vant'
import { constants } from 'crypto'
import mixinForSaleInfo from '@/components/mixin/mixinForSaleInfo.js'
export default {
  name: 'riskInfoForm',
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [DatePicker.name]: DatePicker,
    [Stepper.name]: Stepper,
    [Radio.name]: Radio,
    [Switch.name]: Switch,
    [Icon.name]: Icon,
    [InputItem.name]: InputItem,
    [Picker.name]: Picker,
    [Selector.name]: Selector
  },
  mixins: [mixinForSaleInfo],
  props: {
    mainRisk: { //主险
      type: Object,
      required: true
    },
    riskInfo: { // 附加险信息
      type: Object,
      required: true,
    },
    insureInfo: { // 被保人
      type: [Object],
      required: true
		},
		appntInfo: { // 投保人
			type: [Object],
			required: true
		},
		selectedAddRiskCodes: { // 计算已经选择的的附加险
      type: [Array],
      required: true
		},
    mainRiskSaleInfo: { // 主险页面选择数据
      type: Object,
      required: true
    },
    popInpopFlag:{
      type:[Boolean],
      default:false
    }
  },
  data() {
    return {
      // 附加险表单
      addiRiskInfo: {
        mult: '', // 步进，初始化会赋最小值
        insurePeriodStr: '',//保障期间
        payIntv: '',//交费方式
        payEndYearStr: '',//缴费期间
        planLevel: '',//档次
        riskDuty: '',//责任
        getIntv:'',// 生存金领取间隔
        baseAmount: '',
        basePrem: '',
      },
      ruleMultStep: [],// 份数
      optionInsurePeriod: [],// 保险期间
      optionPayIntv: [],// 交费方式
      optionPayEndYear: [], // 交费期间
      optionPlanLevel: [],// 保额档次
      optionRiskDuty: [],// 保险责任
      ruleAmountStep: [],// 保额步进规则
      optionAmountSelect: [], // 选保额算保费
      rulePremStep: [],  // 保费步进规则
      optionPremSelect: [], // 选保费算保额
      optionGetIntv: [],// 生存金领取间隔
      switchSelector: false, // 保险责任的select是否显示
      vantAmountStepperValue: '', // 保额步进显示值
      vantPremStepperValue: '', // 保费步进显示值
      vantMultStepperValue: '' // 份数步进显示值
    }
  },
  computed: {
		// 根据投保人生日算年龄
		calAppntAge(){ // birthAge:"27Y" birthAgeNum:"27" birthAgeUnit:"Y"
			return this.appntInfo.birthday ? this.getBirthAge(this.appntInfo.birthday) : ''
		},
    // 计算保险责任的展示值(纯展示)
    calRiskDuty() {
      let text = ''
      this.optionRiskDuty.forEach(el => {
        if (this.addiRiskInfo.riskDuty == el.value) {
          text = el.text
        }
      })
      return text ? text : '请选择保险责任'
    },
    // 计算保险期间
    calOptionInsurePeriod() {
      let arr = [].concat(this.optionInsurePeriod)
      arr.forEach(el => {
        el.applyRule ? el.selectable = this.getEvalResult('payIntv', el.applyRule, el) : true
      })
      return arr
    },
    // 计算交费方式
    calOptionPayIntv() {
      let arr = [].concat(this.optionPayIntv)
      arr.forEach(el => {
        el.applyRule ? el.selectable = this.getEvalResult('payIntv', el.applyRule, el)
          : true
      })
      return arr
    },
    // 计算交费期间
    calOptionPayEndYear() {
      let arr = [].concat(this.optionPayEndYear)
      arr.forEach(el => {
        el.applyRule ? el.selectable = this.getEvalResult('payEndYear', el.applyRule, el)
          : true
      })
      return arr
    },
    // 计算保额档次
    calPlanLevel() {
      let arr = [].concat(this.optionPlanLevel)
      arr.forEach(el => {
        el.applyRule ? el.selectable = this.getEvalResult('', el.applyRule, el) : true
      })
      return arr
    },
    // 计算保额步进规则
    calRuleAmountStep() {
      // 附加险的保额暂没有rule
      let arr = [].concat(this.ruleAmountStep)
      let ruleIndex = null
      arr.forEach((el, index) => {
        el.applyRule ? this.getEvalResult('', el.applyRule, el) ? ruleIndex = index : false
          : ruleIndex = 0
      })
      if (ruleIndex !== null) {
        return {
          amountMin: !!arr[ruleIndex].amountMin ? parseFloat(arr[ruleIndex].amountMin) : 1,
          amountMax: !!arr[ruleIndex].amountMax ? parseFloat(arr[ruleIndex].amountMax) : 1.7976931348623157e308,
          amountStep: !!arr[ruleIndex].amountStep ? parseFloat(arr[ruleIndex].amountStep) : 1,
          amountStepUnit: arr[ruleIndex].amountStepUnit
        }
      } else {
        return {
          amountMin: 1,
          amountMax: 1.7976931348623157e308,
          amountStep: 1,
          amountStepUnit: 'Y1'
        }
      }
    },
    // 计算保额选项
    calOptionAmountSelect() {
      let arr = [].concat(this.optionAmountSelect)
      arr.forEach(el => {
        el.applyRule ? el.selectable = this.getEvalResult('', el.applyRule, el) : true
      })
      return arr
    },
    // 计算保费步进规则
    calRulePremStep() {
      let arr = [].concat(this.rulePremStep)
      let ruleIndex = null
      arr.forEach(el => {
        el.applyRule ? this.getEvalResult('', el.applyRule, el) ? ruleIndex = index : false
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
        return {
          premMin: 1,
          premMax: 1.7976931348623157e308,
          premStep: 1,
          premStepUnit: 'Y1'
        }
      }
    },
    // 份数步进规则
    calRulemultStep() {
      let arr = [].concat(this.ruleMultStep)
      let ruleIndex = null
      arr.forEach((el, index) => {
        el.applyRule ? this.getEvalResult('', el.applyRule, el) ? ruleIndex = index : false
          : (ruleIndex = 0)
      })
      if (ruleIndex !== null) {
        return {
          multMin: !!arr[ruleIndex].multMin ? parseInt(arr[ruleIndex].multMin) : 1,
          multMax: !!arr[ruleIndex].multMax ? parseInt(arr[ruleIndex].multMax) : 1.7976931348623157e308,
          multStep: !!arr[ruleIndex].multStep ? parseInt(arr[ruleIndex].multStep) : 1
        }
      } else {
        return {
          multMin: 1,
          multMax: 1.7976931348623157e308,
          multStep: 1,
          unit: ''
        }
      }
    },
    // 计算附加险的试算参数
    calAddiRiskInfo() {
      let obj = {
        active: this.riskInfo.active,
        mainRiskCode: this.mainRisk.riskCode,
        riskCode: this.riskInfo.addRiskBasic.riskCode,
        riskName: this.riskInfo.addRiskBasic.riskName,
        isMainRisk: '0',
        mult: this.addiRiskInfo.mult.toString(),
        insuYear: this.addiRiskInfo.insurePeriodStr.substring(0,this.addiRiskInfo.insurePeriodStr.length - 1),
        insuYearFlag: this.addiRiskInfo.insurePeriodStr.substring(this.addiRiskInfo.insurePeriodStr.length - 1),
        payIntv: this.addiRiskInfo.payIntv,
        payEndYear: this.addiRiskInfo.payEndYearStr.substring(0,this.addiRiskInfo.payEndYearStr.length - 1),
        payEndYearFlag: this.addiRiskInfo.payEndYearStr.substring(this.addiRiskInfo.payEndYearStr.length - 1),
        planLevel: this.addiRiskInfo.planLevel,
        dutyCodeList: this.addiRiskInfo.riskDuty ? [this.addiRiskInfo.riskDuty] : [], //参数改成数组，但是交互仍然是单选，输出的是字符串。记于2019-9-18 20:25
        liveGetMode: '',
        getIntv: this.addiRiskInfo.getIntv,
        openFlag: true,
        isHaveInfo: true,//信息是否录全
        isHaveAppnt: this.riskInfo.addRiskBasic.needAppnt == '1' ? true : false,// 是否需要投保人信息
        isAnnuity: this.riskInfo.addRiskBasic.isAnnuity //是否为年金 1-是，0-否，默认0
      }
      if (this.riskInfo.addCalMode == '0') {
        obj.amt = ''
        obj.prem = ''
      } else if (this.riskInfo.addCalMode == '1') {
        obj.amt = this.addiRiskInfo.baseAmount * this.getRate(this.calRuleAmountStep.amountStepUnit)
        obj.prem = ''
      } else if (this.riskInfo.addCalMode == '2') {
        obj.amt = this.addiRiskInfo.baseAmount
        obj.prem = ''
      } else if (this.riskInfo.addCalMode == '3') {
        obj.amt = ''
        obj.prem = this.addiRiskInfo.basePrem * this.getRate(this.calRulePremStep.premStepUnit)
      } else if (this.riskInfo.addCalMode == '4') {
				obj.amt = ''
				obj.prem = this.addiRiskInfo.basePrem
      }
      return {
        riskPremInfo: obj,
        duty: this.riskInfo.duty
      }
    },
  },
  watch: {
    switchSelector(newVal, oldVal){
      this.$emit('outputSwitch',newVal)
    },
    // mainRiskSaleInfo:{
    //   handler(newVal, oldVal){
    //     // console.log(newVal, oldVal)
    //     this.reselectSaleInfoValue('payIntv')
    //     this.reselectSaleInfoValue('insurePeriod')
    //     this.reselectSaleInfoValue('payEndYear')
    //     this.reselectSaleInfoValue('planLevel')
    //     this.reselectSaleInfoValue('Amt')
    //   },
    //   immediate:true,
    //   deep:true
    // },
    // 主险的交费方式
    'mainRiskSaleInfo.payIntv':{
      handler(newVal, oldVal){
        this.reselectSaleInfoValue('payIntv')
      },
      // immediate:true,
    },
		// 主险的保障期间
		'mainRiskSaleInfo.insurePeriodStr': {
			handler(newVal, oldVal){
				this.reselectSaleInfoValue('insurePeriod')
			},
			// immediate:true,
		},
    // 主险的交费期间
    'mainRiskSaleInfo.payEndYearStr': {
      handler(newVal, oldVal){
        this.reselectSaleInfoValue('insurePeriod')
        this.reselectSaleInfoValue('payEndYear')
        this.reselectSaleInfoValue('planLevel')
      },
      // immediate:true,
    },
    // 主险的保额
    'mainRiskSaleInfo.baseAmount': {
      handler(newVal, oldVal){
        this.reselectSaleInfoValue('planLevel')
        this.reselectSaleInfoValue('Amt')
      },
      // immediate:true,
    },
    // 主险的保费
    'mainRiskSaleInfo.basePrem': {
      handler(newVal, oldVal){
        this.reselectSaleInfoValue('planLevel')
      },
      // immediate:true,
    },
    'addiRiskInfo.insurePeriodStr'(newVal, oldVal) {
      this.reselectSaleInfoValue('payEndYear')
    },
    // 附加险的交费方式
    'addiRiskInfo.payIntv'(newVal, oldVal) {
      newVal == '0' ? (this.addiRiskInfo.payEndYearStr = '1Y') : this.reselectSaleInfoValue('payEndYear')
		},
    // 保额规则
    calRuleAmountStep: {
      handler(newVal,oldVal){
        if(this.riskInfo.addCalMode === '1'){
          if (this.addiRiskInfo.baseAmount === '' || this.addiRiskInfo.baseAmount  <= newVal.amountMin) {
            this.addiRiskInfo.baseAmount = this.vantAmountStepperValue = newVal.amountMin
            console.log(this.addiRiskInfo.baseAmount , this.vantAmountStepperValue , newVal.amountMin)
          }
        }
      },
    },
    // 保费规则
    calRulePremStep(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        if (this.riskInfo.addCalMode == '3') {
          if(this.addiRiskInfo.basePrem === '' || this.addiRiskInfo.basePrem < newVal.premMin){
            this.addiRiskInfo.basePrem = this.vantPremStepperValue = newVal.premMin
          }
        }
      }
    },
    // 份数
    calRulemultStep(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        if(this.addiRiskInfo.mult === '' || this.addiRiskInfo.mult < newVal.multMin){
          this.addiRiskInfo.mult = this.vantMultStepperValue = this.calRulemultStep.multMin
        }
      }
    },
    // watch附加险的参数，将参数输出到主险
    calAddiRiskInfo(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        let obj = {
          riskPremInfo: newVal.riskPremInfo,
          active: this.riskInfo.active,
          rejectRisks: this.riskInfo.addRiskBasic.rejectRisks,
          relatedRisks: this.riskInfo.addRiskBasic.relatedRisks
        }
        this.$emit('outputAddRisk', obj)
      }
    },
  },
  created() {
    // 附加险基本信息
    Object.keys(this.riskInfo.addRiskBasic).forEach(el => {
      this[el] = this.riskInfo.addRiskBasic[el]
    })
    // 份数[[..]/null]
    if (this.riskInfo.addMultStep) {
      this.ruleMultStep = this.riskInfo.addMultStep.multStep.forEach(el => {
        this.$set(el, 'selectable', true)
      })
      this.ruleMultStep = this.riskInfo.addMultStep.multStep
    }
    // 保障期间
    this.riskInfo.addInsurePeriod.insurePeriod.forEach(el => {
      this.$set(el, 'selectable', true)
    })
    this.optionInsurePeriod = this.riskInfo.addInsurePeriod.insurePeriod
    // 交费方式
    this.riskInfo.addPayIntv.payIntv.forEach(el => {
      this.$set(el, 'selectable', true)
    })
    this.optionPayIntv = this.riskInfo.addPayIntv.payIntv
    // 交费期间
    if (this.riskInfo.addPayEndYear.payEndYear) {
      this.riskInfo.addPayEndYear.payEndYear.forEach(el => {
        this.$set(el, 'selectable', true)
      })
      this.optionPayEndYear = this.riskInfo.addPayEndYear.payEndYear
    }
    // 保额档次
    if (this.riskInfo.addPlanLevel) {
      this.riskInfo.addPlanLevel.planLevel.forEach(el => {
        this.$set(el, 'selectable', true)
      })
      this.riskInfo.addPlanLevel.planLevel ? this.optionPlanLevel = this.riskInfo.addPlanLevel.planLevel : false
      // 保额档次赋值
      this.riskInfo.addPlanLevel.planLevel ? this.addiRiskInfo.planLevel = this.riskInfo.addPlanLevel.planLevel[0].planLevel : false
    }
    // 保险责任
    if (this.riskInfo.addRiskDuty) {
      this.optionRiskDuty = this.riskInfo.addRiskDuty.riskDuty.map(el => {
        return {
          value: el.riskDuty,
          text: el.dspRiskDuty
        }
      })
      // 保额档次赋值
      this.addiRiskInfo.riskDuty = this.optionRiskDuty[0].value
    }
    // 生存金领取规则
    if (this.riskInfo.addGetIntv) {
      this.optionGetIntv = this.riskInfo.addGetIntv.getIntv
      //生存金领取间隔赋值
      this.addiRiskInfo.getIntv = this.riskInfo.addGetIntv.getIntv[0].getIntv
    }
    // 附加险保额保费模式
    if (this.riskInfo.addCalMode == '1') {
      //0-只展示保费 1-录保额算保费 2-选保额算保费 3-录保费算保额 4-选保费算保额
      this.ruleAmountStep = this.riskInfo.addAmount.amountStep
    } else if (this.riskInfo.addCalMode == '2') {
      this.riskInfo.addAmountSelect.amountSelect.forEach(el => {
        el.realAmt = parseInt(el.realAmt)
        this.$set(el, 'selectable', true)
      })
      this.optionAmountSelect = this.riskInfo.addAmountSelect.amountSelect
    } else if (this.riskInfo.addCalMode == '3') {
      this.riskInfo.addPrem.premStep.forEach(el => {
        this.$set(el, 'selectable', true)
      })
      this.rulePremStep = this.riskInfo.addPrem.premStep
    } else if (this.riskInfo.addCalMode == '4') {
      this.optionPremSelect = this.riskInfo.addPremSelect.premSelect
    }
    // 附加险表单缓存回显
    console.log(this.riskInfo.session)
    if (this.riskInfo.session) {
      this.addiRiskInfo.mult = this.vantMultStepperValue = this.riskInfo.session.mult
      this.addiRiskInfo.insurePeriodStr = this.riskInfo.session.insuYear + this.riskInfo.session.insuYearFlag
      this.addiRiskInfo.payIntv = this.riskInfo.session.payIntv
      this.addiRiskInfo.payEndYearStr = this.riskInfo.session.payEndYear + this.riskInfo.session.payEndYearFlag
      this.addiRiskInfo.planLevel = this.riskInfo.session.planLevel
      this.addiRiskInfo.riskDuty = this.riskInfo.session.dutyCodeList[0]
      this.addiRiskInfo.getIntv = this.riskInfo.session.getIntv
      //0-只展示保费 1-录保额算保费 2-选保额算保费 3-录保费算保额 4-选保费算保额
       if (this.riskInfo.addCalMode == '1') {
          this.addiRiskInfo.baseAmount = this.vantAmountStepperValue = this.calRuleAmountStep.amountStepUnit == 'Y' ? this.riskInfo.session.amt :
            this.calRuleAmountStep.amountStepUnit == 'W' ? this.riskInfo.session.amt / 10000 : this.riskInfo.session.amt / 1000
        } else if (this.riskInfo.addCalMode == '2') {
          this.addiRiskInfo.baseAmount = this.riskInfo.session.amt
        } else if (this.riskInfo.addCalMode == '3') {
          this.addiRiskInfo.basePrem = this.vantPremStepperValue = this.calRulePremStep.premStepUnit == 'Y' ? this.riskInfo.session.prem :
            this.calRulePremStep.premStepUnit == 'W' ? this.riskInfo.session.prem / 10000 : this.riskInfo.session.prem / 1000
        } else if (this.riskInfo.addCalMode == '4') {
        }
    } else {
      // this.addiRiskInfo.insurePeriodStr = this.optionInsurePeriod[0].insurePeriod + this.optionInsurePeriod[0].insurePeriodUnit
      // this.addiRiskInfo.payIntv = this.optionPayIntv[0].payIntv
      this.reselectSaleInfoValue('insurePeriod')
      this.reselectSaleInfoValue('payIntv')
      this.reselectSaleInfoValue('Amt')
    }
  },
  methods: {
    // mixinForSaleInfo:getDate,getRangeDate,getMiddleDate,getRate
    // 表单选项变化时的对象表单值重选
    reselectSaleInfoValue (value) {     
      console.log(value)      
      let self = this
      let map = {
        // 将表单里值和选项对应起来的映射对象
        insurePeriod: 'calOptionInsurePeriod',
        payIntv: 'calOptionPayIntv',
        payEndYear: 'calOptionPayEndYear',
        planLevel: 'calPlanLevel',
        Amt: 'calOptionAmountSelect'
      }
      let booleanArr = self[map[value]].map(function(el) {
        return el.selectable
      })

      self[map[value]].forEach(function(el, index) {
        //这里区别开，逻辑一样，只因ChargePeriod和insurePeriod是组合值，需要拼装才能和表单值对应上。看else的逻辑好理解。
        let firstTrueIndex = booleanArr.indexOf(true)
        if (value == 'payEndYear' || value == 'getYear' || value == 'insurePeriod') {
          if (self.addiRiskInfo[value + 'Str'] == el[value] + el[value + 'Unit'] ) {
            if (!el.selectable) {
              if (firstTrueIndex >= 0) {
                self.addiRiskInfo[value + 'Str'] = self[map[value]][firstTrueIndex][value] + self[map[value]][firstTrueIndex][value + 'Unit']
              } else {
                self.addiRiskInfo[value + 'Str'] = ''
              }
            }
          } else if (self.addiRiskInfo[value + 'Str'] != el[value] + el[value + 'Unit'] && index == self[map[value]].length - 1 &&
            (self.addiRiskInfo[value + 'Str'] == '' || self.addiRiskInfo.payEndYearStr == '1Y') //payEndYear的判断要加上1Y，因为1Y不是交费期间的选项，会造成无法重选。
          ) {
            if (firstTrueIndex >= 0) {
              self.addiRiskInfo[value + 'Str'] = self[map[value]][firstTrueIndex][value] + self[map[value]][firstTrueIndex][value + 'Unit']
            }
          }
        } else if (value == 'Amt') {
          if (self.addiRiskInfo.baseAmount == el[`real${value}`]) {
            if (!el.selectable) {
              if (firstTrueIndex >= 0) {
                self.addiRiskInfo.baseAmount = self[map[value]][firstTrueIndex][`real${value}`]
              } else {
                self.addiRiskInfo.baseAmount = ''
              }
            }
          } else if (self.addiRiskInfo.baseAmount != el[`real${value}`] && index == self[map[value]].length - 1 && self.addiRiskInfo.baseAmount == '') {
            if (firstTrueIndex >= 0) {
              self.addiRiskInfo.baseAmount = self[map[value]][firstTrueIndex][`real${value}`]
            }
          }
        } else {
          // 先看表单里值和对应的选项，选项是可选的-不管他，选项是不可选的-从选项里找第一个可选的
          if (self.addiRiskInfo[value] == el[value]) {
            if (!el.selectable) {
              if (firstTrueIndex >= 0) {
                self.addiRiskInfo[value] = self[map[value]][firstTrueIndex][value]
              } else {
                self.addiRiskInfo[value] = ''
              }
            }
            // 此处对应表单里值为空字符串时的自动选值
          } else if (self.addiRiskInfo[value] != el[value] && index == self[map[value]].length - 1 && self.addiRiskInfo[value] == '') {
            // 无匹配选项，而且循环到最后一项时，寻找选项中第一个可选项给表单对应值赋值
            if (firstTrueIndex >= 0) {
              self.addiRiskInfo[value] = self[map[value]][firstTrueIndex][value]
            }
          }
        }
      })
    },
    onSelectorConfirm(data) {
      this.addiRiskInfo.riskDuty = data.value
      this.switchSelector = false
    },
    // 份数vant步进器change函数
    onVantMultStepChange(value) {
      this.vantMultStepperValue = value
    },
    // 份数vant步进器blur函数
    onVantMultStepBlur() {
      if (this.vantMultStepperValue < this.calRulemultStep.multMin) {
        this.addiRiskInfo.mult = this.calRulemultStep.multMin
      } else if (this.vantMultStepperValue > this.calRulemultStep.multMax) {
        this.addiRiskInfo.mult = this.calRulemultStep.multMax
      } else {
        this.addiRiskInfo.mult = this.vantMultStepperValue
      }
    },
    // 份数vant步进器minus函数
    onVantMultStepMinus() {
      this.addiRiskInfo.mult = this.vantMultStepperValue
    },
    // 份数vant步进器plus函数
    onVantMultStepPlus() {
      this.addiRiskInfo.mult = this.vantMultStepperValue
    },
    // 保额vant步进器change函数
    onVantAmountStepChange(value) {
      this.vantAmountStepperValue = value
    },
    // 保额vant步进器blur函数
    onVantAmountStepBlur(value) {
      let num =  Math.round((this.vantAmountStepperValue - this.calRuleAmountStep.amountMin) / this.calRuleAmountStep.amountStep) *
          this.calRuleAmountStep.amountStep + this.calRuleAmountStep.amountMin
      if (num < this.calRuleAmountStep.amountMin) {
        this.addiRiskInfo.baseAmount = this.vantAmountStepperValue = this.calRuleAmountStep.amountMin.toFixed(1)
      } else if (num > this.calRuleAmountStep.amountMax) {
        this.addiRiskInfo.baseAmount = this.vantAmountStepperValue = this.calRuleAmountStep.amountMax.toFixed(1)
      } else {
        this.addiRiskInfo.baseAmount = this.vantAmountStepperValue = num.toFixed(1)
      }
    },
    // 保额vant步进器minus函数
    onVantAmountStepMinus() {
      this.addiRiskInfo.baseAmount = this.vantAmountStepperValue
    },
    // 保额vant步进器plus函数
    onVantAmountStepPlus() {
      this.addiRiskInfo.baseAmount = this.vantAmountStepperValue
    },
    // 保费vant步进器change函数
    onVantPremStepChange(value) {
      this.vantPremStepperValue = value
    },
    // 保费vant步进器blur函数
    onVantPremStepBlur(value) {
      let num =  Math.round( (this.vantPremStepperValue - this.calRulePremStep.premMin) / this.calRulePremStep.premStep) 
        * this.calRulePremStep.premStep + this.calRulePremStep.premMin
      if (num < this.calRulePremStep.premMin) {
        this.addiRiskInfo.basePrem = this.vantPremStepperValue = this.calRulePremStep.premMin
      } else if (num > this.calRulePremStep.premMax) {
        this.addiRiskInfo.basePrem = this.vantPremStepperValue = this.calRulePremStep.premMax
      } else {
        this.addiRiskInfo.basePrem = this.vantPremStepperValue = num.toFixed(1)
      }
    },
    // 保费vant步进器minus函数
    onVantPremStepMinus() {
      this.addiRiskInfo.basePrem = this.vantPremStepperValue
    },
    // 保费vant步进器plus函数
    onVantPremStepPlus() {
      this.addiRiskInfo.basePrem = this.vantPremStepperValue
    },
    // 选择保险期间
    selectInsurePeriod(item) {
      if (!item.selectable) {
        return
      }
      this.addiRiskInfo.insurePeriodStr == item.insurePeriod + item.insurePeriodUnit ? true
        : (this.addiRiskInfo.insurePeriodStr = item.insurePeriod + item.insurePeriodUnit)
    },
    // 选择交费方式
    selectPayIntv(item) {
      if (!item.selectable) {
        return
      }
      if (this.addiRiskInfo.payIntv != item.payIntv) {
        this.addiRiskInfo.payIntv = item.payIntv
        if (item.payIntv == '0') {
          this.addiRiskInfo.payEndYearStr = '1Y'
        } else {
          this.addiRiskInfo.payEndYearStr = this.optionPayEndYear[0].payEndYear + this.optionPayEndYear[0].payEndYearUnit
        }
      }
    },
    // 选择交费期间
    selectPayEndYear(item) {
      if (!item.selectable) {
        return
      }
      this.addiRiskInfo.payEndYearStr == item.payEndYear + item.payEndYearUnit
        ? true : this.addiRiskInfo.payEndYearStr = item.payEndYear + item.payEndYearUnit
    },
    // 选择保额档次
    selectPlanLevel(item) {
      if (!item.selectable) {
        return
      }
      this.addiRiskInfo.planLevel == item.planLevel ? true : (this.addiRiskInfo.planLevel = item.planLevel)
    },
    // 选择生存金领取规则
    selectGetIntv(item) {
      this.addiRiskInfo.getIntv == item.getIntv ? true : (this.addiRiskInfo.getIntv = item.getIntv)
    },
    // 选择保额
    selectAmount(item) {
      if (!item.selectable) {
        return
      }
      this.addiRiskInfo.baseAmount == item.realAmt ? true
        : (this.addiRiskInfo.baseAmount = item.realAmt)
    },
    getEvalResult(type, evalStr, el) {
			// 传入的年龄都是Y（周岁）(2020-1-7修改年龄真是传出 D/Y)
			// let insuredAgeDay = this.insureInfo.age == "0" ? 365 : this.insureInfo.age * 365
			// let insuredAge = this.insureInfo.age
			let insuredAgeDay = this.insureInfo.unit == "D" ? this.insureInfo.ageDay ? this.insureInfo.ageDay : 0
				: this.insureInfo.age*365
			let insuredAge = this.insureInfo.unit == "Y" ? this.insureInfo.age : 0
			let insuredSex = this.insureInfo.sex
			let appntAge = this.calAppntAge ? this.calAppntAge.birthAgeNum * 1 : ''
      let payIntv = ''
      let payYear = ''
      if (type == 'payIntv' && this.mainRisk.companyCode == 'GH') {
        payYear = el.payIntv == '0' ? 1 : 999
      } else if (type == 'payEndYear' && this.mainRisk.companyCode == 'GH') {
        payYear = parseInt(el.payEndYear)
      } else if (type == 'payEndYear' && this.mainRisk.companyCode == 'ZY') {
        payYear = parseInt(el.payEndYear)
      } else if (type == 'payEndYear' && this.mainRisk.companyCode == 'XT') {
      }
      let insuredPeriod = parseInt(this.addiRiskInfo.insurePeriodStr.substring( 0, this.addiRiskInfo.insurePeriodStr.length - 1) )
      let insuredPeriodFlag = this.addiRiskInfo.insurePeriodStr.substring( this.addiRiskInfo.insurePeriodStr.length - 1)
      let prem = ''
      let amount = ''
      let mult = ''
      let amountLevel = ''
      let socialSecurity = this.insureInfo.isHaveSocial ? 1:0 // 社保
      let mainRisk = {
        payYear: parseInt(this.mainRiskSaleInfo.payEndYearStr.substring(0, this.mainRiskSaleInfo.payEndYearStr.length - 1) ),
        payIntv: parseInt(this.mainRiskSaleInfo.payIntv),
        insuredPeriod: parseInt(this.mainRiskSaleInfo.insurePeriodStr.substring(0, this.mainRiskSaleInfo.insurePeriodStr.length - 1) ),
        insuredPeriodFlag: this.mainRiskSaleInfo.insurePeriodStr.substring(this.mainRiskSaleInfo.insurePeriodStr.length - 1),
        prem:  parseInt(this.mainRiskSaleInfo.basePrem),
        amount: parseInt(this.mainRiskSaleInfo.baseAmount)
				}
      let selectedAddRiskCodes = this.selectedAddRiskCodes
      return eval(evalStr)
    }
  }
}
</script>

<style lang="less" scoped>
#risk-info-form {
  padding: 20px 0 0;
  background-color: #f5f5f5;
}
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
      font-weight: 400;
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
.md-field-padding2 {
  margin: 0;
  padding: 36px 28px 0;
}
.md-field-title {
  font-size: 30px;
  font-family: PingFangSC;
  font-weight: bold;
  color: #000000;
  margin-bottom: 26px;
}
.md-field-brief {
  font-size: 24px;
  font-family: PingFangSC;
  font-weight: 500;
  color: #999999;
}
.border-bottom {
  border-bottom: 1px solid #e7e7e7;
}
</style>