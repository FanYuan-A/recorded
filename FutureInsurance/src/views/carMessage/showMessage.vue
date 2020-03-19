<template>
  <div class="showMessage wrapper" v-show="showMessage">
    <header class="header">
      <span class="head-back" @click="showMessage=!showMessage"></span>
      <span class="head-tit">{{$route.meta.title}}</span>
      <slot></slot>
    </header>
    <div class="top">
      <input placeholder="请输入车辆品牌型号" type="text" class="mint-field-core" v-model="carMessage">
      <!--<mt-button type="primary" size="small" @click.native="queryCar">搜索</mt-button>-->
      <div @click="queryCar" class="search-btn">搜索</div>
    </div>
    <div class="main">
      <div class="content">
        <p v-for="(item,index) in cars" @click="getCarId(item)"
           :key="index">
          {{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "showMessage",
    data() {
      return {
        showMessage: false,
        carMessage: '',
        cars: []
      }
    },
    mounted() {
    },
    methods: {
      queryCar() {
        this.$post(this.$url.car.message, {
          vehicleName: this.carMessage,
          userId: ''
        }).then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: "bottom"
            });
          } else {
            this.cars = res.response.list;
          }
        });
      },
      getCarId(carInfo) {
        this.$emit('getCarId', carInfo);
        this.show();
      },
      show() {
        this.carMessage = '';
        this.cars = [];
        this.showMessage = !this.showMessage;
      },
      setCarMessage(val) {
        this.carMessage = val;
      },
    }
  };
</script>

<style>
  .showMessage {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
  }

  .showMessage .top {
    width: 100%;
    padding: .15rem;
    background: #eaeaea;
    position: relative;
    top: 0;
    left: 0;
  }

  .showMessage .top > input {
    width: 77%;
    padding: .05rem .08rem;
    border-radius: .03rem;
    display: inline-block;
    vertical-align: middle;
    text-align: left;
  }

  /*.showMessage .mint-button {*/
  /*margin-top: 0;*/
  /*height: .3rem;*/
  /*line-height: .3rem;*/
  /*display: inline-block;*/
  /*vertical-align: middle;*/
  /*margin-left: .2rem;*/
  /*}*/

  /*.showMessage .mint-button--primary {*/
  /*background: #26a2ff;*/
  /*font-size: .14rem;*/
  /*}*/

  .showMessage .content {
    padding: .15rem;
    font-size: .14rem;
    color: #3EABEE;
    background: #ffffff;
  }

  .showMessage .content p {
    line-height: .2rem;
    margin-bottom: .15rem;
  }

  .showMessage .search-btn {
    background: #26a2ff;
    font-size: .14rem;
    margin-top: 0;
    height: .3rem;
    line-height: .3rem;
    display: inline-block;
    vertical-align: middle;
    margin-left: .2rem;
    color: #ffffff;
    padding: 0 .15rem;
    border-radius: .05rem;
  }

  .showMessage .header {
    position: relative;
    height: 44px;
    -padding-top: 20px;
    line-height: 44px;
    font-size: 0.17rem;
    color: #fff;
    text-align: center;
    background: #F15B5A;

  }

  .showMessage .head-back {
    position: absolute;
    left: 0;
    top: 0px;
    width: 44px;
    height: 44px;
    background: url('../../assets/img/back.png') no-repeat center center;
    background-size: 9px 17px;
  }
</style>


