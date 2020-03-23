<template>
  <div>
    <!-- input录入项 -->
    <md-input-item clearable :title="title" :type="type" align="right" :readonly='readonly'
      :placeholder='placeholderText' v-model='code' @blur="validateName">
      <p v-if="error||isError" class="error" slot="error">{{errorText}}</p>
    </md-input-item>
  </div>
</template>

<script>
  import {
    InputItem
  } from 'mand-mobile'
  import $validator from '@/utils/validator'

  export default {
    components: {
      'md-input-item': InputItem,
    },
    data() {
      return {
        errortext: '', // 错误提示语
        code: '',
        error: false,
        placeholderText: this.placeholder
      }
    },
    props: {
      // 录入项左边展示文字
      title: {
        type: String,
      },
      // 录入的值
      value: {
        type: String,
        required: true
      },
      relatInfo: {
        type: Object,
      },
      // 是否展示错误提示
      isError: {
        type: Boolean,
        default: false
      },
      // 是否只读
      readonly: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        required: true
      },
      ruletype: {
        type: String,
      },
      type: {
        type: String,
        default: 'text'
      },
      isErrorText: {
        type: String
      }
    },
    computed: {
      errorText() {
        if (this.isErrorText) {
          return this.isErrorText
        }
        return this.errortext
      }
    },
    created() {
      if (this.value) {
        this.code = this.value
      }
      this.errortext = '请输入' + this.title

      if (this.relatInfo && this.relatInfo.remark) {
        this.placeholderText = this.relatInfo.remark
      }
    },
    methods: {
      // 校验
      validateName() {
        let type = this.ruletype

        if (type == 'name') {
          let reg = /^[\u2E80-\u9FFF]+$/ //Unicode编码中的汉字范围        
          let value = this.code

          if (reg.test(value) && value.length >= 2 && value.length <= 20) {
            this.error = false

          } else if (value.length == 0) {
            this.error = false

          } else {
            this.error = true
            this.errortext = '请输入正确的姓名（2-20个汉字）'

          }
        } else if (type == 'idNo') {
          let idNovalue = this.code

          if ($validator.isIDNum(idNovalue)) {
            this.error = false

          } else if (idNovalue.length == 0) {
            this.error = false

          } else {
            this.error = true
            this.errortext = '请输入正确的身份证号码'

          }
        } else if (type == 'mobile') {
          let tel = /^1\d{10}$/ //手机号
          let value = this.code

          if (tel.test(value)) {
            this.error = false

          } else if (value.length == 0) {
            this.error = false

          } else {
            this.error = true
            this.errortext = '请输入正确的手机号'

          }
        } else if (type == 'email') {
          let value = this.code

          if ($validator.isEmail(value)) {
            this.error = false

          } else if (value.length == 0) {
            this.error = false
          } else {
            this.error = true
            this.errortext = '请输入正确的邮箱'
          }
        } else {
          this.error = false
        }
        let result = {
          type: this.ruletype,
          value: this.error
        }
        this.$emit('checkresult', result)
      },
    },
    watch: {
      code: {
        handler() {
          this.$emit('input', this.code)
        },
        deep: true
      }
    }
  }
</script>

<style lang="less" scoped>
  /deep/ .md-field-item-content {
    padding: 0;
  }

  /deep/ .md-field-item-content:before {
    border-bottom: none;
    height: 1px;
    background-color: #ECECEC;
    -webkit-transform: none;
    transform: none;
    -webkit-transform-origin: unset;
    transform-origin: unset;
  }

  /deep/ .md-input-item.is-error .md-field-item-content:before {
    height: 1px !important;
    background: #ff5257 !important;
  }

  /deep/ .md-input-item.is-error .md-field-item-content:before {
    border-bottom: none;
  }
</style>