<template>
  <div class="dutyCheckBox" v-if="dutyContents">
    <template v-for="duty in calOptions">
      <md-field-item :title="duty.name" :key="duty.code">
        <div slot="default" v-if="duty.desc">
          <img src="../../assets/imgs/insure/desc_icon.png" class="desc_icon" @click="isShowDesc[duty.code]=true">
          <desc-popup v-if="duty.desc" v-model="isShowDesc[duty.code]" :name="duty.name" :desc="duty.desc">
          </desc-popup>
        </div>
        <div slot="right">
          <div class="flex-check-box">
            <md-check-box :name="duty.code+'_N'" v-model="selectedDuty[duty.code]" label="不投保"
              :disabled="!duty.selectable" />
            <md-check-box :name="duty.code+'_Y'" v-model="selectedDuty[duty.code]" label="投保"
              :disabled="!duty.selectable" />
          </div>
        </div>
      </md-field-item>
    </template>
  </div>
</template>
<script>
  import {
    Button,
    Field,
    FieldItem,
    CheckBox,
    DatePicker,
    Picker,
    TabBar,
    Icon,
    Switch,
    ActionBar,
    Popup,
    PopupTitleBar,
    Stepper,
    Radio
  } from 'mand-mobile'
  import descPopup from '@/components/global/descPopup.vue'
  import {
    validator
  } from '@/utils/common'
  export default {
    name: 'cal-duty-check-box',
    components: {
      [Field.name]: Field,
      [Button.name]: Button,
      [FieldItem.name]: FieldItem,
      [CheckBox.name]: CheckBox,
      [DatePicker.name]: DatePicker,
      [Picker.name]: Picker,
      [TabBar.name]: TabBar,
      [Icon.name]: Icon,
      [Switch.name]: Switch,
      [ActionBar.name]: ActionBar,
      [Popup.name]: Popup,
      [PopupTitleBar.name]: PopupTitleBar,
      [Stepper.name]: Stepper,
      [Radio.name]: Radio,
      'desc-popup': descPopup
    },
    props: {
      dutyContents: {
        type: Array,
        required: true
      },
      ruleParams: {
        type: Object,
        required: true
      },
      value: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        selectedDuty: {},
        isShowDesc: {}
      }
    },
    computed: {
      calOptions() {
        let _this = this
        let arr = [].concat(_this.dutyContents)
        for (let i = 0; i < arr.length; i++) {
          let item = arr[i]
          item.selectable = true
          item.selectedDuty = _this.selectedDuty[item.code]
          if (validator.isEmpty(item.rule) && !_this.checkRule(item.rule)) {
            item.selectable = false
            item.selectedDuty = item.code + '_N'
          }
          if (validator.isEmpty(item.requriedRule) && _this.checkRule(item.requriedRule)) {
            item.selectable = false
            item.selectedDuty = item.code + '_Y'
          }
        }
        return arr
      },
      currentValue() {
        let _this = this
        let arr = []
        if (!validator.isEmpty(_this.selectedDuty)) {
          return arr
        }
        for (let item of Object.keys(_this.selectedDuty)) {
          if (_this.selectedDuty[item] == item + '_Y') {
            arr.push(item)
          }
        }
        return arr
      }
    },
    created() {
      this.isShowDesc = {}
      if (this.dutyContents && this.dutyContents.length > 0) {
        for (let i = 0; i < this.dutyContents.length; i++) {
          this.$set(this.isShowDesc, this.dutyContents[i].code, false)
          this.$set(this.selectedDuty, this.dutyContents[i].code, false)
        }
      }
      if (this.value && this.value.length > 0) {
        for (let i = 0; i < this.value.length; i++) {
          this.selectedDuty[this.value[i]] = this.value[i] + '_Y'
        }
      }
    },
    mounted() {

    },
    watch: {
      currentValue: {
        handler() {
          this.$emit('input', this.currentValue)
        }
      },
      calOptions: {
        handler() {
          let _this = this
          for (let i = 0; i < _this.calOptions.length; i++) {
            let item = _this.calOptions[i]
            _this.selectedDuty[item.code] = item.selectedDuty
          }
        },
        deep: true
      },
      // value: {
      //   handler() {
      //     // this.value === this.currentValue ? false : this.currentValue = this.value
      //     if (this.value && this.value.length > 0) {
      //       for (let i = 0; i < this.value.length; i++) {
      //         this.selectedDuty[this.value[i]] = this.value[i] + '_Y'
      //       }
      //     }
      //   },
      //   deep: true
      // }
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
          payYears = this.ruleParams.payYear, //缴费期间
          payYearFlag = this.ruleParams.payYearFlag,
          insuredPeriod = this.ruleParams.insuredPeriod || '', //保险期间
          insuredPeriodFlag = this.ruleParams.insuredPeriod || '',
          prem = '', //基本保费
          amount = this.ruleParams.amount, //基本保额
          mult = '', //份数
          cityType = '', //地区分类
          mainRisk = {
            payYear: this.ruleParams.mainRisk.payYear, //主险交费期间
            payYearFlag: this.ruleParams.mainRisk.payYearFlag,
            payIntv: this.ruleParams.mainRisk.payIntv, //主险交费方式
            insuredPeriod: this.ruleParams.mainRisk.insuredPeriod || '', //主险保险期间
            insuredPeriodFlag: this.ruleParams.mainRisk.insuredPeriod || '', //保险期间单位
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
      }
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

      .md-field-item-control {
        // order: 1;

        .desc_icon {
          width: 28px;
          height: 28px;
          display: inline-block;
          // padding-top: 8px;
          vertical-align: middle;
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