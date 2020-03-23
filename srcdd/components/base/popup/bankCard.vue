<template>
  <div>
    <!-- 续期银行卡 -->
    <div class="bt-40">
      <md-input-item :maxlength="24" class="bankcard" clearable title="续期银行卡号" v-model="code" align="right"
        :solid="false" type="bankCard" placeholder="请输入续期银行账户" @blur="validateName('bankCard')">
        <div slot="left">
          <i class="question-icon" @click="showPopUp()"><img :src="questionIcon" alt=""></i>
        </div>
        <p v-if="error||isError" class="error" slot="error">{{errorText}}</p>
      </md-input-item>
      <div>
        <div class="card-brief">
          <div><span>默认此银行卡为续期银行卡，续期保费将从此预留银行卡扣除</span></div>
          <div><span>请填写借记卡，不支持使用信用卡</span></div>
        </div>
      </div>
    </div>

    <md-popup v-model="isPopupShow" position="bottom">
      <md-popup-title-bar ok-text="确定" cancel-text="取消" large-radius @confirm="hidePopUp('bottom')"
        @cancel="hidePopUp('bottom')"></md-popup-title-bar>
      <div class="popup">
        <h4>支持续期银行可选范围</h4>
        <div>
          <span v-for="(item,index) in bankList" :key="index">{{item.bankName}}<i v-if="index !=bankList.length">|</i>
          </span>
        </div>
      </div>
    </md-popup>
  </div>
</template>

<script>
  import {
    Popup,
    InputItem,
    PopupTitleBar
  } from 'mand-mobile'

  export default {
    components: {
      'md-popup': Popup,
      'md-input-item': InputItem,
      'md-popup-title-bar': PopupTitleBar,
    },
    data() {
      return {
        errortext: '请输入续期银行账卡号', // 错误提示语                         
        code: '',
        error: false,
        isPopupShow: false,
        bankList: [],
        questionIcon: require('../../../assets/imgs/insure/question.png'), // 问号的图片src路径
      }
    },
    props: {
      relatInfo: {
        type: Object,
      },
      // 选中的值
      value: {
        type: String,
        required: true
      },
      // 是否展示错误提示
      isError: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String
      },
      renewalBankCodes: {
        type: Array
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
      this.bankList = this.renewalBankCodes
    },
    methods: {
      validateName(e) {
        if (e == 'bankCard') {
          let value = this.code
          if (value.length > 0 && value.length < 6) {
            this.error = true
            this.errortext = '请输入正确的银行卡号'
          } else if (value.length == 0) {
            this.error = false
          }
        } else {
          this.error = false
        }

        let result = {
          type: 'bank',
          value: this.error
        }
        this.$emit('checkresult', result)
      },
      // 展示弹出层
      showPopUp() {
        this.isPopupShow = true
      },
      hidePopUp() {
        this.isPopupShow = false
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

  /deep/.md-field-item-left {
    .question-icon {
      display: inline-block;
      width: 0.28rem;
      height: 0.28rem;
      vertical-align: middle;
      margin-left: 0.06rem;

      img {
        width: 100%;
      }
    }
  }

  .bt-40 {
    padding-bottom: 40px;
  }

  .popup {
    background: #fff;

    h4 {
      margin: 0;
      padding: 0.56rem 0.4rem 0.46rem;
    }

    div {
      color: #999;
      padding: 0 0.3rem 0.3rem 0.4rem;
      line-height: .5rem;
    }

    i {
      font-style: normal;
      margin: 0 0.1rem;
    }
  }

  .card-brief {
    padding-top: 0.2rem;
    // border-top: 2px solid #ECECEC;

    div {
      margin-bottom: 0.3rem;
    }

    div:nth-last-child(1) {
      margin-bottom: 0;
    }

    span {
      font-size: 28px;
      font-family: PingFangSC;
      color: @color-text-minor;
      line-height: 0.4rem;
    }

    span::before {
      content: '.';
      display: block;
      width: 0.1rem;
      float: left;
      margin-right: 0.2rem;
      color: #FFB142;
      font-size: 0.7rem;
      height: 0.42rem;
      line-height: 0;
    }
  }
</style>