<template>
  <header class="header">
    <span class="head-back" @click="goBack()"></span>
    <span class="head-tit" v-if="headerText">{{headerText}}</span>
    <span class="head-tit" v-if="!headerText">{{$route.meta.title}}</span>
    <slot></slot>
  </header>
</template>

<script>

  export default {
    name: 'myHeader',
    props: {
      headerText: {
        type: String
      },
      hiddenMsgBox: {}
    },
    data() {
      return {};
    },
    methods: {
      goBack() {
        if (this.hiddenMsgBox) {
          this.mobileBack();
        } else {
          this.MessageBox.confirm('返回将退出保险流程?').then(() => {
            this.mobileBack();
          });
        }
      },
      mobileBack() {
        // android
        if (window.android) {
          window.android.back();
        }
        // ios
        if (window.back) {
          window.back();
        }
      },
    }
  };
</script>

<style>
  .header {
    position: relative;
    height: 44px;
    -padding-top: 20px;
    line-height: 44px;
    font-size: 0.17rem;
    color: #fff;
    text-align: center;
    background: #F15B5A;

  }

  .head-back {
    position: absolute;
    left: 0;
    top: 0px;
    width: 44px;
    height: 44px;
    background: url('../assets/img/back.png') no-repeat center center;
    background-size: 9px 17px;
  }

  .mint-msgbox-message {
    text-align: center !important;
    line-height: 31px !important;;
  }
</style>
