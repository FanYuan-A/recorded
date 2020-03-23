<template>
  <div class="addRisk">
    <!-- <div class="content-item"> -->
    <md-field-item :title="name">
      <div slot="right">
        <md-switch v-model="isSelect" :disabled="isDisable"></md-switch>
        <!-- <md-agree v-model="isSelect" :disabled="isDisable"></md-agree> -->
      </div>
      <div slot="default" v-if="desc">
        <img src="../../assets/imgs/insure/desc_icon.png" class="desc_icon" @click="isShowDesc=true">
      </div>
      <!-- <div slot="right">
        <div class="displayTextBox" v-if="displayTextExp">
          {{checkRule(displayTextExp)}}
        </div>
      </div> -->
    </md-field-item>
    <div v-show="isSelect">
      <template v-for="item in riskFields">
        <cal-field-check-box title="投保人性别" v-if="item.code=='appntSex'" :options="item.fieldItems" :desc="item.desc"
          :key="item.code" v-model="riskData.appntSex" :ruleParams="calRuleParams">
        </cal-field-check-box>
        <cal-field-check-box title="保额" v-if="item.code=='amountOptions'" :options="item.fieldItems" :desc="item.desc"
          :key="item.code" v-model="riskData.amount" :ruleParams="calRuleParams">
        </cal-field-check-box>
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
    </div>
    <!-- </div> -->
    <desc-popup v-model="isShowDesc" :name="name" :desc="desc"></desc-popup>
  </div>
</template>

<script>
  import {
    Button,
    FieldItem,
    Switch,
    Icon,
    Popup,
    Agree,
    CheckBox
  } from 'mand-mobile'
  import commonUtils from '@/utils/common'
  import {
    validator
  } from '@/utils/common'
  import calFieldCheckBox from '@/components/calRisk/calFieldCheckBox.vue'
  import descPopup from '@/components/global/descPopup.vue'
  import calDutyCheckBox from '@/components/calRisk/calDutyCheckBox.vue'
  export default {
    name: 'cal-add-risk',
    components: {
      [Popup.name]: Popup,
      [Button.name]: Button,
      [FieldItem.name]: FieldItem,
      [Icon.name]: Icon,
      [Switch.name]: Switch,
      'cal-field-check-box': calFieldCheckBox,
      'desc-popup': descPopup,
      'cal-duty-check-box': calDutyCheckBox,
      [Agree.name]: Agree,
      [CheckBox.name]: CheckBox,
    },
    props: {
      //附加险名称
      name: {
        type: String,
        required: true
      },
      //附加险code
      riskCode: {
        type: String,
        required: true
      },
      //附加险可选字段
      riskFields: {
        type: Array,
        // required: true
      },
      //附加险责任
      dutyContents: {
        type: Array,
        // required: true
      },
      //附加险说明
      desc: {
        type: String,
        // required: true
      },
      //可附加规则
      addRule: {
        type: String,
        // required: true
      },
      //互斥规则
      mutualRule: {
        type: String,
        // required: true
      },
      requiredRule: {
        type: String,

      },
      //捆绑规则
      bundledRule: {
        type: String,
        // required: true
      },
      ruleParams: {
        type: Object,
        required: true
      },
      value: {
        type: Object,
        // required: true
      },
      displayTextExp: {
        type: String
      }
    },
    data() {
      return {
        isSelect: false,
        isDisable: false,
        riskData: {
          insuredPeriod: '',
          payYear: '',
          payIntv: '',
          appntSex: ''
        },
        dutyCodes: [],
        isSelfChange: false,
        isShowDesc: false
      }
    },
    computed: {
      addRiskData() {
        return {
          isSelect: this.isSelect,
          riskData: this.riskData,
          dutyCodes: this.dutyCodes,
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
          socialSecurity: this.ruleParams.socialSecurity,
          payIntv: '', //缴费方式
          payYears: this.riskData.payYears, //缴费期间
          insuredPeriod: this.riskData.insuredPeriods, //保险期间
          prem: '', //基本保费
          amount: '', //基本保额
          mult: '', //份数
          cityType: '', //地区分类
          mainRisk: {
            payYear: this.ruleParams.payYear, //主险交费期间
            payYearFlag: this.ruleParams.payYearFlag,
            payIntv: this.ruleParams.payIntv, //主险交费方式
            insuredPeriod: this.ruleParams.insuredPeriod || '', //主险保险期间
            insuredPeriodFlag: this.ruleParams.insuredPeriodFlag || '', //保险期间单位
            prem: '', //主险保费
            amount: this.ruleParams.amount, //主险保额
            riskCode: this.ruleParams.riskCode, //主险险种编码
            selectedDutyCodes: this.ruleParams.selectedDutyCodes
          },
          provinceCode: this.ruleParams.provinceCode, //省编码
          cityCode: this.ruleParams.cityCode, //市编码
          countryCode: this.ruleParams.countryCode, //县编码
          selectedDutyCodes: this.addRiskData.dutyCodes
        }
      }
    },
    created() {
      if (this.value) {
        this.isSelect = this.value.isSelect
        this.riskData = this.value.riskData
        this.dutyCodes = [].concat(this.value.dutyCodes)
      }
    },
    mounted() {
      this.$nextTick(() => {
        let contentItems = document.querySelectorAll('.content-item')
        for (let i = 0; i < contentItems.length; i++) {
          let element = contentItems[i]
          if (element.querySelectorAll('.md-field-item')[0] && element.querySelectorAll('.md-field-item')[0]
            .querySelectorAll('.md-field-item-content')[0]) {
            element.querySelectorAll('.md-field-item')[0].querySelectorAll('.md-field-item-content')[0]
              .style.borderTop = 'unset'
          }
        }
        let addRisks = document.querySelectorAll('.addRisk')
        for (let i = 0; i < addRisks.length; i++) {
          let element = addRisks[i]
          if (element.querySelectorAll('.calFieldCheckBox')[0]) {
            if (element.querySelectorAll('.calFieldCheckBox')[0].querySelectorAll('.md-field-item-content')[0]) {
              element.querySelectorAll('.calFieldCheckBox')[0].querySelectorAll('.md-field-item-content')[0]
                .style.border = 'unset'
            }
          }
        }
      })
    },
    updated() {
      this.$nextTick(() => {
        let addRisks = document.querySelectorAll('.addRisk')
        for (let i = 0; i < addRisks.length; i++) {
          let element = addRisks[i]
          if (element.querySelectorAll('.calFieldCheckBox')[0]) {
            if (element.querySelectorAll('.calFieldCheckBox')[0].querySelectorAll('.md-field-item-content')[0]) {
              element.querySelectorAll('.calFieldCheckBox')[0].querySelectorAll('.md-field-item-content')[0]
                .style.border = 'unset'
            }
          }

        }
      })
    },
    watch: {
      addRiskData: {
        handler() {
          this.isSelfChange = true
          this.$emit('input', this.addRiskData)
        }
      },
      ruleParams: {
        handler() {
          if (!this.checkRule(this.addRule)) {
            this.isDisable = true
            this.isSelect = false
            this.isSelfChange = false
            return
          } else {
            this.isDisable = false
          }
          if (!this.checkRule(this.notChooseRule)) {
            this.isDisable = true
            this.isSelect = false
          }
          if (!this.isSelfChange && !this.checkRule(this.mutualRule)) {
            this.isSelect = false
          }
          if (this.bundledRule && this.checkRule(this.bundledRule)) {
            this.isSelect = true
          }
          if (validator.isEmpty(this.requiredRule) && this.checkRule(this.requiredRule)) {
            this.isSelect = true
            this.isDisable = true
            return
          }
          this.isSelfChange = false
        },
        deep: true
      },

    },
    methods: {
      //校验规则方法
      checkRule(ruleStr) {
        console.log(ruleStr)
        let insuredAgeDay = this.ruleParams.insuredAgeDay, //被保人年龄天数（不满一年）
          insuredAge = this.ruleParams.insuredAge, //被保人年龄（以岁计算）
          insuredSex = this.ruleParams.insuredSex,
          appntAge = this.ruleParams.appntAge, //投保人年龄
          appntSex = this.ruleParams.appntSex, //投保人性别
          insuredAppntRealation = this.ruleParams.insuredAppntRealation,
          socialSecurity = this.ruleParams.socialSecurity,
          payIntv = '', //缴费方式
          payYears = '', //缴费期间
          insuredPeriod = '', //保险期间
          prem = '', //基本保费
          amount = '', //基本保额
          mult = '', //份数
          cityType = '', //地区分类
          selectedAddRiskCodes = this.ruleParams.selectedAddRiskCodes,
          mainRisk = {
            payYear: this.ruleParams.payYear - 0, //主险交费期间
            payYearFlag: this.ruleParams.payYearFlag,
            payIntv: (this.ruleParams.payIntv - 0), //主险交费方式
            insuredPeriod: (this.ruleParams.insuredPeriod - 0) || '', //主险保险期间
            insuredPeriodFlag: this.ruleParams.insuredPeriodFlag || '', //保险期间单位
            prem: '', //主险保费
            amount: this.ruleParams.amount, //主险保额
            riskCode: this.ruleParams.riskCode, //主险险种编码
            selectDutyCode: this.ruleParams.selectDutyCode
          },
          provinceCode = this.ruleParams.provinceCode, //省编码
          cityCode = this.ruleParams.cityCode, //市编码
          countryCode = this.ruleParams.countryCode, //县编码
          selectDutyCode = this.addRiskData.dutyCodes
        return validator.isEmpty(ruleStr) ? eval(ruleStr) : true
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

    // div.md-field-item:nth-last-of-type(1) {
    //   .md-field-item-content::before {
    //     height: auto;
    //   }
    // }

    .md-field-item {
      .calFieldCheckBox:nth-child(1) {
        .md-field-item-content {
          border: none;
        }
      }

      /deep/.md-field-item-content {
        min-height: 60px;
        padding: 24px 0px;
        align-items: unset !important;

        .md-field-item-title {
          font-size: @font-body-large;
          max-width: 240px;
          line-height: 39px;
          order: 1;
        }

        .md-field-item-left {
          order: 0;

          .md-agree {
            .md-agree-icon {
              padding: 0;
              margin: 0;
            }
          }
        }

        .md-field-item-control {
          order: 1;

          .desc_icon {
            width: 28px;
            height: 28px;
            display: inline-block;
            // padding-top: 8px;
            vertical-align: middle;
          }

        }

        .md-field-item-right {
          min-height: 60px;
          font-size: 0px;
          max-width: 76%;
          order: 2;

          .displayTextBox {
            border-radius: @radius-primary;
            min-width: 110px;
            font-size: @font-body-normal;
            font-family: @font-family-base;
            margin: 12px 0px 12px 20px;
            padding: 15px 13px;
            line-height: 26px;
            background: @color-primary;
            color: @color-text-base-inverse;
            border: @border-width-base solid @color-primary;
            box-sizing: border-box;
            text-align: center;
          }

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

  .content-item {
    .md-field-item:nth-last-of-type(1) {
      /deep/.md-field-item-content::before {
        height: auto;
      }
    }
  }
</style>