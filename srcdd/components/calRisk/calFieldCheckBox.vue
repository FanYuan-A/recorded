<template>
  <div class="calFieldCheckBox">
    <md-field-item :title="title">
      <div slot="default" v-if="desc">
        <img src="../../assets/imgs/insure/desc_icon.png" class="desc_icon" @click="isShowDesc=true">
      </div>
      <div slot="right">
        <div class="flex-check-box">
          <template v-for="fieldItem in calOptions">
            <md-check-box :name="fieldItem.value" v-model="currentValue" :label="fieldItem.valueLabel"
              :key="fieldItem.id" :disabled="!fieldItem.selectable" v-if="fieldItem.isShow" />
          </template>
        </div>
      </div>
    </md-field-item>
    <desc-popup v-model="isShowDesc" :desc="desc"></desc-popup>
  </div>
</template>
<script>
  import {
    FieldItem,
    CheckBox,
    Icon,
  } from 'mand-mobile'
  import {
    validator
  } from '@/utils/common'
  import descPopup from '@/components/global/descPopup.vue'
  export default {
    name: 'cal-field-check-box',
    components: {
      [FieldItem.name]: FieldItem,
      [CheckBox.name]: CheckBox,
      [Icon.name]: Icon,
      'desc-popup': descPopup
    },
    props: {
      title: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      },
      ruleParams: {
        type: Object,
        required: true
      },
      desc: {
        type: String,
        // required: true
      },
      value: {
        type: String,
        // required: true
      },
    },
    data() {
      return {
        currentValue: '',
        isShowDesc: false
      }
    },
    computed: {
      calOptions() {
        let _this = this
        let arr = [].concat(_this.options)
        let defauleValue = ''
        arr.forEach(item => {
          item.selectable = true
          item.selectable = _this.checkRule(item.rule)
          item.isShow = _this.checkRule(item.showRule)
          if (item.selectable) {
            (!validator.isEmpty(defauleValue)) && (defauleValue = item.value)
          } else {
            _this.currentValue == item.value && (_this.currentValue = '')
          }
          return
        })
        if (!validator.isEmpty(_this.currentValue)) {
          _this.currentValue = defauleValue
        }
        return arr
      }
    },
    created() {
      this.currentValue = this.value
    },
    watch: {
      currentValue: {
        handler() {
          this.$emit('input', this.currentValue)
        }
      },
      value: {
        handler() {
          this.value === this.currentValue ? false : this.currentValue = this.value
        },
        deep: true
      }
    },
    methods: {
      //校验规则方法
      checkRule(ruleStr) {
        console.log(this.title + '**********' + ruleStr)
        let insuredAgeDay = this.ruleParams.insuredAgeDay, //被保人年龄天数（不满一年）
          insuredAge = this.ruleParams.insuredAge, //被保人年龄（以岁计算）
          insuredSex = this.ruleParams.insuredSex,
          appntAge = this.ruleParams.appntAge, //投保人年龄
          appntSex = this.ruleParams.appntSex, //投保人性别
          payIntv = this.ruleParams.payIntv, //缴费方式
          payYears = this.ruleParams.payYears, //缴费期间
          payYearFlag = this.ruleParams.payYearFlag,
          insuredPeriod = this.ruleParams.insuredPeriod, //保险期间
          insuredPeriodFlag = this.ruleParams.insuredPeriodFlag,
          insuredAppntRealation = this.ruleParams.insuredAppntRealation,
          socialSecurity = this.ruleParams.socialSecurity,
          prem = this.ruleParams.prem, //基本保费
          amount = this.ruleParams.amount, //基本保额
          mult = this.ruleParams.mult, //份数
          cityType = this.ruleParams.hasOwnProperty('cityType') ? this.ruleParams.cityType : '', //地区分类
          mainRisk = {
            payYear: (this.ruleParams.mainRisk.payYear - 0) || '', //主险交费期间
            payYearFlag: this.ruleParams.mainRisk.payYearFlag,
            payIntv: this.ruleParams.mainRisk.payIntv, //主险交费方式
            insuredPeriod: (this.ruleParams.mainRisk.insuredPeriod - 0) || '', //主险保险期间
            insuredPeriodFlag: this.ruleParams.mainRisk.insuredPeriodFlag || '', //保险期间单位
            prem: '', //主险保费
            amount: this.ruleParams.mainRisk.amount, //主险保额
            riskCode: this.ruleParams.mainRisk.riskCode, //主险险种编码
            selectedDutyCodes: this.ruleParams.mainRisk.selectedDutyCodes
          },
          provinceCode = this.ruleParams.provinceCode, //省编码
          cityCode = this.ruleParams.cityCode, //市编码
          countryCode = this.ruleParams.countryCode, //县编码
          selectedDutyCodes = this.ruleParams.selectedDutyCodes
        return validator.isEmpty(ruleStr) ? eval(ruleStr) : true
      },
    }

  }
</script>
<style lang="less" scoped>
  /deep/.md-field-item {
    .desc_icon {
      width: 28px;
      height: 28px;
      padding-top: 28px;
    }

    .md-field-item-content {
      min-height: 60px;
      padding: 14px 0px !important;
      align-items: unset !important;

      .md-field-item-title {
        font-size: @font-body-large;
        max-width: 196px;
        line-height: 39px;
        padding-top: 24px;
      }

      .md-field-item-right {
        min-height: 60px;
        font-size: 0px;
        max-width: 76%;

        .flex-check-box {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          align-content: flex-start;

          .md-check-box {
            border-radius: @radius-primary;
            min-width: 110px;
            height: 60px;
            border: @border-width-base solid @color-border-base;
            font-size: @font-body-normal;
            font-family: @font-family-base;
            color: @color-text-minor;
            margin: 12px 0px 12px 20px;
            padding: 15px 13px;
            line-height: 26px;

            .md-tag {
              display: none;
            }
          }

          .md-check-box.is-disabled {
            background: rgba(250, 250, 250, 1);
            border: 1px solid rgba(216, 216, 216, 1);
            color: rgba(216, 216, 216, 1);
          }

          .md-check-box.is-checked {
            font-size: @font-body-normal;
            font-family: @font-family-base;
            background: @color-primary;
            color: @color-text-base-inverse;
            border: @border-width-base solid @color-primary;
          }

          .md-check-box:last-child {
            margin-right: 0px;
          }
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
</style>