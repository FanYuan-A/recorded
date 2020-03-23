<template>
  <div class="login">
    <md-field>
      <md-input-item ref="name" title="手机号" v-model="mobile" placeholder="请输入手机号" clearable is-title-latent>
      </md-input-item>
      <md-input-item ref="id" title="验证码" v-model="smsCode" placeholder="请输入验证码" clearable is-title-latent>
        <div class="input-operator" slot="right">
          <md-button :type="smsSendLoginFlag?'disabled':'primary'" size="small" inline round @click="smsSend()">
            {{smsSendLoginFlag?(sendSmsTime+'重新发送'):'获取验证码'}}</md-button>
        </div>
      </md-input-item>
    </md-field>
    <md-button class="loginBtn" :type="loginLodingFlag?'disabled':'primary'" @click="login()"
      :loading="loginLodingFlag">登陆</md-button>
  </div>
</template>
<script>
  import {
    Button,
    InputItem,
    Field,
    Toast
  } from 'mand-mobile'
  // import $customer from '@/api/customer'
  import {
    validator
  } from '@/utils/common'
  import esp from '@/api/esp.js'
  import CommonUtils from '@/utils/common.js'
  export default {
    data() {
      return {
        loginLodingFlag: false,
        smsSendLoginFlag: false,
        mobile: '',
        smsId: '',
        smsCode: '',
        sendSmsTime: 60,
        timer: null

      }
    },
    components: {
      'md-button': Button,
      'md-field': Field,
      'md-input-item': InputItem,
    },
    created() {
      // $customer.getUserList().then(res=>{
      //   console.log(res)
      // })
      CommonUtils.closeGlobalMask() // 全局加载中的样式
    },
    methods: {
      login() {
        let _this = this
        if (!validator.isEmpty(_this.mobile)) {
          return Toast.info('请输入手机号')
        }
        if (!(validator.isEmpty(_this.smsId) && validator.isEmpty(_this.smsCode))) {
          return Toast.info('请输入验证码')
        }
        _this.loginLodingFlag = true
        // $customer.login({
        //   loginflag: 'loginMobile',
        //   name: _this.mobile,
        //   smsId: _this.smsId,
        //   smsCode: _this.smsCode,
        //   thirdToken: _this.$store.getters.getThirdToken
        // }).then((res) => {
        //   if (validator.isEmpty(res) && res.result == '0' && validator.isEmpty(res.token)) {
        //     _this.$store.dispatch('setToken', res.token)
        //     console.log(_this.$router)
        //     _this.$router.push({
        //       path: decodeURIComponent(_this.$route.query.redirect || '/')
        //     })
        //   }
        // })
        esp.login({
          //loginflag: 'loginMobile',
          mobile: _this.mobile,
          smsId: _this.smsId,
          smsCode: _this.smsCode,
          type:'hrgxapp',
          system:'hr'
        }).then((res) => {
          if (validator.isEmpty(res) && res.result == '0' && validator.isEmpty(res.token)) {
            _this.$store.dispatch('setToken', res.token)
            console.log(_this.$router)
            _this.$router.push({ path: decodeURIComponent(_this.$route.query.redirect || '/') })
          }
        })
      },
      smsSend() {
        let _this = this
        if (!validator.isEmpty(_this.mobile)) {
          return Toast.info('请输入手机号')
        }
        _this.smsSendLoginFlag = true
        // $customer.smsSend({
        //   operateType: 'smslogin',
        //   mobile: _this.mobile,
        //   thirdToken: _this.$store.getters.getThirdToken
        // }).then((res) => {
        //   if (validator.isEmpty(res) && res.result == '0') {
        //     _this.smsId = res.smsId
        //     Toast.info('已发送手机号至您的手机' + res.mobileStar)
        //   } else {
        //     Toast.info(res.resultMessage)
        //   }
        //   _this.timer = setInterval(() => {
        //     _this.sendSmsTime--
        //     if (_this.sendSmsTime <= 0) {
        //       _this.smsSendLoginFlag = false
        //       _this.sendSmsTime = 60
        //       clearInterval(_this.timer)
        //     }
        //   }, 1000)
        // })
        esp.getNoteCode({
          operateType: 'hrsmslogin',
          mobile: _this.mobile,
          contextFix: 'esp',
          type:'hrgxapp',
          system:'hr'
        }).then((res) => {
          if (validator.isEmpty(res) && res.result == '0') {
            _this.smsId = res.smsId
            Toast.info('已发送手机号至您的手机' + res.mobileStar)
          } else {
            Toast.info(res.resultMessage)
          }
          _this.timer = setInterval(() => {
            _this.sendSmsTime--
            if (_this.sendSmsTime <= 0) {
              _this.smsSendLoginFlag = false
              _this.sendSmsTime = 60
              clearInterval(_this.timer)
            }
          }, 1000)
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .loginBtn {
    width: 92%;
    margin: auto;
    margin-top: 1rem;
  }
</style>