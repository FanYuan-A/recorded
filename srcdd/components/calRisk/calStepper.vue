<template>
  <div class="calStepper">
    <md-field-item :title="title">
      <div slot="default" v-if="desc">
        <img src="../../assets/imgs/insure/desc_icon.png" class="desc_icon" @click="isShowDesc=true">
      </div>
      <div slot="right">
        <van-stepper v-model="currentValue" :step="calOptions.step" :min="calOptions.min" :max="calOptions.max"
          button-size="22px" :attr-unit="unit" :integer="integer" @blur="onBlur()" @focus="onFocus()" />
      </div>
    </md-field-item>
    <desc-popup v-model="isShowDesc" :desc="desc"></desc-popup>
  </div>
</template>
<script>
  import {
    Stepper
  } from 'vant'
  import {
    FieldItem,
    Icon,
  } from 'mand-mobile'
  import {
    validator
  } from '@/utils/common'
  import descPopup from '@/components/global/descPopup.vue'
  export default {
    name: 'cal-stepper',
    components: {
      [FieldItem.name]: FieldItem,
      [Icon.name]: Icon,
      [Stepper.name]: Stepper,
      'desc-popup': descPopup
    },
    data() {
      return {
        currentValue: null,
        isShowDesc: false,
        isInputting: false
      }
    },
    props: {
      title: {
        type: String,
        // required: true
      },
      options: {
        type: Array,
        // required: true
        default: () => {
          return []
        }
      },
      ruleParams: {
        type: Object,
        // required: true
        default: () => {
          return {}
        }
      },
      desc: {
        type: String,
        // required: true
      },
      unit: {
        type: String
      },
      integer: {
        type: Boolean,
        default: () => {
          return true
        }
      },
      value: {
        // type: String,
        // required: true
      },
    },
    computed: {
      calOptions() {
        let _this = this
        let arr = [].concat(_this.options)
        let obj = {
          min: 1,
          max: Number.MAX_VALUE,
          step: 1
        }
        for (let i = 0; i < arr.length; i++) {
          let item = arr[i]
          if (_this.checkRule(item.rule)) {
            obj.min = validator.isEmpty(item.start) ? item.start - 0 : 1
            obj.max = validator.isEmpty(item.end) ? item.end - 0 : Number.MAX_VALUE
            obj.step = validator.isEmpty(item.increase) ? item.increase - 0 : 1
            if (!_this.isInputting) {
              _this.currentValue = validator.isEmpty(item.increase) ? _this.currentValue - _this.currentValue % item
                .increase - 0 : _this.currentValue
              if (_this.currentValue < obj.min) {
                _this.currentValue = obj.min
              }
              if (_this.currentValue > obj.max) {
                _this.currentValue = obj.max
              }
            }

            break
          }
        }
        return obj
      }
    },
    watch: {
      currentValue: {
        handler() {
          if (!this.isInputting) {
            this.$emit('input', this.currentValue)
          }
        }
      },
      value: {
        handler() {
          validator.isEmpty(this.value) && this.value === this.currentValue ? false : this.currentValue = this.value
        },
        deep: true
      }
    },
    created() {
      this.currentValue = this.value
    },
    methods: {
      onBlur() {
        let _this = this
        _this.isInputting = false
        let arr = [].concat(_this.options)
        for (let i = 0; i < arr.length; i++) {
          let item = arr[i]
          if (_this.checkRule(item.rule)) {
            _this.currentValue = validator.isEmpty(item.increase) ? _this.currentValue - _this.currentValue % item
              .increase - 0 : _this.currentValue
            break
          }
        }
      },
      onFocus() {
        this.isInputting = true
      },
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
          payIntv = this.ruleParams.payIntv, //缴费方式
          payYears = this.ruleParams.payYears, //缴费期间
          payYearFlag = this.ruleParams.payYearFlag,
          insuredPeriod = this.ruleParams.insuredPeriod, //保险期间
          insuredPeriodFlag = this.ruleParams.insuredPeriodFlag,
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
      padding: 24px 0px;
      align-items: unset;

      .md-field-item-title {
        font-size: @font-body-large;
        max-width: 196px;
        line-height: 39px;
      }

      .md-field-item-right {
        min-height: 60px;
        font-size: 0px;
        max-width: 76%;

        .van-stepper {
          button {
            border-radius: 8px;
            border: 2px solid @color-primary;
            background-color: @color-text-base-inverse;
            color: @color-primary;
          }

          button::before {
            width: 27px;
            height: 4px;
            border-radius: 2px;
          }

          button::after {
            width: 4px;
            height: 27px;
            border-radius: 2px;
          }

          button.van-stepper__minus--disabled {
            border: 2px solid @color-border-base;
            color: @color-text-minor
          }

          button.van-stepper__plus--disabled {
            border: 2px solid @color-border-base;
            color: @color-text-minor
          }

          .van-stepper__input {
            background-color: @color-text-base-inverse;
            font-size: @font-title-large;
            font-family: @font-family-base;
            // font-weight: bold;
            color: @color-text-base;
            width: 130px;
          }
        }

        .van-stepper::after {
          content: attr(attr-unit);
          display: block;
          // width: 26px;
          height: 44px;
          font-size: 24px;
          font-family: @font-family-base;
          color: @color-text-base;
          line-height: 44px;
          float: right;
          margin-left: 10px;
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