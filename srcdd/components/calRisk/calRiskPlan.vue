<template>
  <div class="riskPlan">
    <div class="content-item">
      <slot name="riskPlanSlot"></slot>
      <template v-for="item in riskFields">
        <cal-field-check-box title="保额" v-if="item.code=='amountOptions'" :options="item.fieldItems" :desc="item.desc"
          :key="item.code" v-model="riskData.amount" :ruleParams="calRuleParams">
        </cal-field-check-box>
        <cal-stepper title="保额" v-if="item.code=='amountInterval'" :key="item.code" v-model="riskData.amount"
          :ruleParams="calRuleParams" :options="item.fieldItems" :desc="item.desc" unit="元">
        </cal-stepper>
        <cal-stepper title="份数" v-if="item.code=='mult'" :key="item.code" v-model="riskData.mult"
          :ruleParams="calRuleParams" :options="item.fieldItems" :desc="item.desc" unit="份">
        </cal-stepper>
        <cal-field-check-box title="交费方式" v-if="item.code=='payIntv'" :options="item.fieldItems" :desc="item.desc"
          :key="item.code" v-model="riskData.payIntv" :ruleParams="calRuleParams">
        </cal-field-check-box>
        <cal-field-check-box title="交费期间" v-if="item.code=='payYear'&&riskData.payIntv!='0'" :options="item.fieldItems"
          :desc="item.desc" :key="item.code" v-model="riskData.payYear" :ruleParams="calRuleParams">
        </cal-field-check-box>
        <cal-field-check-box title="保障期间" v-if="item.code=='insuredPeriod'" :options="item.fieldItems" :desc="item.desc"
          :key="item.code" v-model="riskData.insuredPeriod" :ruleParams="calRuleParams">
        </cal-field-check-box>
      </template>
      <cal-duty-check-box v-if="dutyContents&&dutyContents.length>0" v-model="dutyCodes" :dutyContents="dutyContents"
        :ruleParams="calRuleParams"></cal-duty-check-box>
      <template v-if="addRisks&&addRisks.length>0">
        <template v-for="addRisk in addRisks">
          <cal-add-risk :name="addRisk.riskName" :riskCode="addRisk.riskCode" :riskFields="addRisk.riskFields"
            :ruleParams="calRuleParams" :addRule="addRisk.rule" :notChooseRule="addRisk.notChooseRule"
            :dutyContents="addRisk.dutyContents" :requiredRule="addRisk.requiredRule" :mutualRule="addRisk.mutualRule"
            :desc="addRisk.desc" :bundledRule="addRisk.bundledRule" :displayTextExp="addRisk.displayTextExp"
            v-model="addRiskInfo[addRisk.riskCode]" :key="addRisk.riskCode">
          </cal-add-risk>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
  import {
    FieldItem,
    Icon,
    Switch,
  } from 'mand-mobile'
  import commonUtils from '@/utils/common'
  import {
    validator
  } from '@/utils/common'
  import calFieldCheckBox from '@/components/calRisk/calFieldCheckBox.vue'
  import calAddRisk from '@/components/calRisk/calAddRisk.vue'
  import calDutyCheckBox from '@/components/calRisk/calDutyCheckBox.vue'
  import calStepper from '@/components/calRisk/calStepper.vue'
  export default {
    name: 'cal-risk-plan',
    components: {
      [FieldItem.name]: FieldItem,
      [Icon.name]: Icon,
      [Switch.name]: Switch,
      'cal-field-check-box': calFieldCheckBox,
      'cal-add-risk': calAddRisk,
      'cal-duty-check-box': calDutyCheckBox,
      'cal-stepper': calStepper
    },
    props: {
      //产品编码
      productCode: {
        type: String,
        required: true
      },
      riskCode: {
        type: String,
        required: true
      },
      //可选字段
      riskFields: {
        type: Array,
        // required: true
      },
      //责任
      dutyContents: {
        type: Array,
        // required: true
      },
      addRisks: {
        type: Array,
        // required: true
      },
      ruleParams: {
        type: Object,
        required: true
      },
      value: {
        type: Object,
        // required: true
      }
    },
    data() {
      return {
        riskData: {
          insuredPeriod: '',
          payYear: '',
          payIntv: '',
          amount: '',
          mult: ''
        },
        dutyCodes: [],
        addRiskInfo: {}
      }
    },
    computed: {
      riskPlanInfo() {
        return {
          riskData: this.riskData,
          dutyCodes: this.dutyCodes,
          addRiskInfo: this.addRiskInfo
        }
      },
      calRuleParams() {
        return {
          insuredAgeDay: this.ruleParams.insuredAgeDay, //被保人年龄天数（不满一年）
          insuredAge: this.ruleParams.insuredAge, //被保人年龄（以岁计算）
          insuredSex: this.ruleParams.insuredSex,
          appntAge: this.ruleParams.appntAge, //投保人年龄
          appntSex: this.ruleParams.appntSex, //投保人性别
          insuredAppntRealation: this.ruleParams.insuredAppntRealation,
          payIntv: this.riskData.payIntv, //缴费方式
          payYear: this.riskData.payYear ? this.riskData.payYear.substring(0, this.riskData
            .payYear.length - 1) : '', //缴费期间
          payYearFlag: this.riskData.payYear ? this.riskData.payYear.substr(this.riskData
            .payYear.length - 1) : '',
          insuredPeriod: this.riskData.insuredPeriod ? this.riskData.insuredPeriod.substring(0, this.riskData
            .insuredPeriod.length - 1) : '', //保险期间
          insuredPeriodFlag: this.riskData.insuredPeriod ? this.riskData.insuredPeriod.substr(this.riskData
            .insuredPeriod.length - 1) : '', //保险期间单位 
          socialSecurity: this.ruleParams.socialSecurity,
          prem: '', //基本保费
          amount: this.riskData.amount, //基本保额
          mult: this.riskData.mult, //份数
          mainRisk: {
            payYear: this.riskData.payYear ? this.riskData.payYear.substring(0, this.riskData
              .payYear.length - 1) : '', //主险交费期间
            payYearFlag: this.riskData.payYear ? this.riskData.payYear.substr(this.riskData
              .payYear.length - 1) : '',
            payIntv: this.riskData.payIntv, //主险交费方式
            insuredPeriod: this.riskData.insuredPeriod ? this.riskData.insuredPeriod.substring(0, this.riskData
              .insuredPeriod.length - 1) : '', //主险保险期间
            insuredPeriodFlag: this.riskData.insuredPeriod ? this.riskData.insuredPeriod.substr(this.riskData
              .insuredPeriod.length - 1) : '', //保险期间单位
            prem: '', //主险保费
            amount: this.riskData.amount, //主险保额
            riskCode: this.riskCode, //主险险种编码
            selectedDutyCodes: this.dutyCodes
          },
          cityType: '', //地区分类
          selectedAddRiskCodes: this.getSelectedAddRisks(), //已选附加险编码集合
          provinceCode: this.ruleParams.provinceCode, //省编码
          cityCode: this.ruleParams.cityCode, //市编码
          countryCode: this.ruleParams.countryCode, //县编码
          riskCode: this.riskCode,
          selectedDutyCodes: this.dutyCodes
        }
      }
    },
    created() {
      if (this.value) {
        this.riskData = this.value.riskData || {}
        this.dutyCodes = [].concat(this.value.dutyCodes)
        this.addRiskInfo = this.value.addRiskInfo || {}
      }
    },
    mounted() {
      this.$nextTick(() => {
        let contentItems = document.getElementsByClassName('content-item')
        for (let i = 0; i < contentItems.length; i++) {
          let element = contentItems[i]
          if (element.getElementsByClassName('md-field-item')[0] && element.getElementsByClassName('md-field-item')[
              0].getElementsByClassName('md-field-item-content')[0]) {
            element.getElementsByClassName('md-field-item')[0].getElementsByClassName('md-field-item-content')[0]
              .style.borderTop = 'unset'
          }
        }
      })
    },
    watch: {
      riskPlanInfo: {
        handler() {
          if (this.riskPlanInfo.riskData.payIntv && this.riskPlanInfo.riskData.payIntv == '0') {
            this.riskPlanInfo.riskData.payYear = ''
          }
          this.$emit('input', this.riskPlanInfo)
        },
        deep: true
      },
    },
    methods: {
      getSelectedAddRisks() {
        let arr = []
        if (!validator.isEmpty(this.addRiskInfo)) {
          return arr
        }
        for (let item of Object.keys(this.addRiskInfo)) {
          if (this.addRiskInfo[item].isSelect) {
            arr.push(item)
          }
        }
        return arr
      },
    }


  }
</script>
<style lang="less" scoped>
  .content-item {
    border-top: 20px solid @color-bg-base;
    padding: 0 30px;
    font-size: 0px;
    font-family: @font-family-base;

    div.md-field-item:nth-last-of-type(1) {
      /deep/.md-field-item-content::before {
        height: auto;
      }
    }

    /deep/.md-field-item {
      .md-field-item-content {
        min-height: 60px;
        padding: 24px 0px;
        align-items: center;

        .md-field-item-title {
          font-size: @font-body-large;
          max-width: 280px;
          line-height: 39px;
        }

        .md-field-item-right {
          .arrow-right {
            width: 0.29rem;
            height: 0.24rem;
            margin-left: 0.14rem;

            img {
              width: 100%;
            }
          }
        }

        .md-field-item-right {
          p {
            font-size: @font-body-large;
            font-family: @font-family-base;
            color: @color-text-base;
            line-height: 28px;
          }

          p.price {
            font-size: @font-body-large;
            font-family: @font-family-base;
            color: @color-text-caption;
          }

          i {
            font-size: @font-minor-normal;
            color: @color-primary;
            line-height: 28px;
            width: 29px;
          }
        }
      }

    }

    .title {
      padding: 45px 0px 42px 0px;
      font-weight: bold;
      font-size: @font-title-large;
      font-family: @font-family-base;
      line-height: @font-title-large;
    }

    .title::before {
      content: ' ';
      display: inline-block;
      width: 8px;
      height: 30px;
      background: @color-primary;
      margin-right: 17px;
      vertical-align: top;
    }

  }

  // .content-item {
  //   div.md-field-item:nth-last-of-type(1) {
  //     .md-field-item-content::before {
  //       height: auto;
  //     }
  //   }
  // }
</style>