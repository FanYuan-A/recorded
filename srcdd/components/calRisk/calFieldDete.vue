<template>
  <div class="calFieldDete">
    <md-field-item :title="title">
      <div slot="default" v-if="desc">
        <img src="../../assets/imgs/insure/desc_icon.png" class="desc_icon">
      </div>
      <div slot="right" @click="isDatePickerShow=true">
        <p>{{formatDate(currentDate)}}
          <img class="arrow-right" src="../../assets/imgs/insure/arrowRight2.png">
        </p>
      </div>
    </md-field-item>
    <md-date-picker ref="datePicker" v-if="calLimit" v-model="isDatePickerShow" :min-date="calLimit.minDate"
      :max-date="calLimit.maxDate" type="date" :default-date="defaultDete" @confirm="onDetePickerConfirm">
    </md-date-picker>
  </div>
</template>

<script>
  import {
    FieldItem,
    DatePicker,
    Icon,
  } from 'mand-mobile'
  import {
    validator
  } from '@/utils/common'
  import commonUtils from '@/utils/common'
  export default {
    name: 'cal-field-date',
    components: {
      [FieldItem.name]: FieldItem,
      [DatePicker.name]: DatePicker,
      [Icon.name]: Icon,
    },
    props: {
      title: {
        type: String,
        required: true
      },
      limit: {
        type: Object,
        // required: true
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
        required: true
      }
    },
    data() {
      return {
        currentDate: null,
        defaultDete: null,
        isDatePickerShow: false
      }
    },
    computed: {
      calLimit() {
        let _this = this
        let obj = commonUtils.getBirthdayByAge(_this.limit.startNum, _this.limit.startFlag, _this.limit.endNum,
          _this.limit.endFlag)
        let params = {
          minDate: obj.minDate || new Date(),
          maxDate: obj.maxDate || new Date(),
        }
        return params
      }
    },
    created() {

      let obj = commonUtils.getBirthdayByAge(this.limit.startNum, this.limit.startFlag, this.limit.endNum,
        this.limit.endFlag)
      let maxDate = obj.maxDate || new Date()
      let minDate = obj.minDate || new Date()
      this.defaultDete = this.value ? new Date(this.value) : new Date(((maxDate.getTime() - minDate.getTime()) /
          2) +
        minDate.getTime())
      this.currentDate = this.value ? new Date(this.value) : new Date(((maxDate.getTime() - minDate.getTime()) / 2) +
        minDate.getTime())
    },
    watch: {
      currentDate: {
        handler() {
          let _this = this
          _this.$emit('input', _this.formatDate(_this.currentDate, 'yyyy-MM-dd'))
        }
      }
    },
    methods: {
      onDetePickerConfirm() {
        this.currentDate = new Date(this.$refs.datePicker.getFormatDate('yyyy-MM-dd'))
      },
      formatDate(date, fmt = 'yyyy-MM-dd') {
        if (validator.isEmpty(date)) {
          return commonUtils.formatDate(date, fmt)
        }
      }
    }

  }
</script>
<style lang="less" scoped>
  /deep/.md-field-item {
    .desc_icon {
      width: 28px;
      height: 28px;
      // padding-top: 8px;
      vertical-align: middle;
    }

    .md-field-item-content {
      min-height: 60px;
      padding: 24px 0px;

      .md-field-item-title {
        font-size: @font-body-large;
        max-width: 196px;
        line-height: 39px;
      }

      .md-field-item-right {
        min-height: 60px;
        font-size: 0px;
        max-width: 76%;



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
      }
    }
  }
</style>