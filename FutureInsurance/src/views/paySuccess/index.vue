<template>
  <div class="wrapper">
    <header class="header">
      <!-- <span class="head-back"></span> -->
      <span class="head-tit">{{$route.meta.title}}</span>
    </header>
    <div class="paySuccess main">
      <img src="~@/assets/img/success.png" alt="" class="suc">
      <p class="text">恭喜您，支付成功</p>
      <mt-button type="primary" size="large" class="submitBtn" @click="goOrder()">查看我的订单</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "paySuccess",
    data() {
      return {
        
      }
    },
    created() {
      
    },
    methods: {
      goOrder(){
        if (window.android) {
          window.android.goList();
        }else{
          window.goList();
        }
      }
    }
  };
</script>

<style scoped>
  .suc{
    width: 55px;
    height: 55px;
    margin: 100px auto 20px;
    vertical-align:middle;
    display: table-cell;
  }
  .text{
    font-size: .16rem;
    text-align: center;
    color: #000;
  }
</style>
<style scoped>
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

  /* .head-back {
    position: absolute;
    left: 0;
    top: 0px;
    width: 44px;
    height: 44px;
    background: url('../assets/img/back.png') no-repeat center center;
    background-size: 9px 17px;
  } */
</style>