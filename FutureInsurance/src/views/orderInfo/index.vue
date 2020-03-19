<template>
  <div class="wrapper">
    <header class="header">
      <span class="head-back" @click="goBack()"></span>
      <span class="head-tit">{{$route.meta.title}}</span>
    </header>
    <div class="orderInfo main">
      <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
        <ul class="orderMain" v-show="mainShow">
          <li>
            <span class="span1">保单产品：</span>
            <span class="span2">{{basic.productName}}</span>
          </li>
          <li>
            <span class="span1">被保险人姓名：</span>
            <span class="span2">{{basic.insuredName}}</span>
          </li>
          <li>
            <span class="span1">车牌号：</span>
            <span class="span2">{{basic.vehicleLicenceCode}}</span>
          </li>
          <li>
            <span class="span1">投保日期：</span>
            <span class="span2">{{basic.applyDate}}</span>
          </li>
          <!-- <li>
            <span class="span1">商业险投保单号：</span>
            <span class="span2">{{item.tpBizApplyNo}}</span>
          </li>
          <li>
            <span class="span1">交强险投保单号：</span>
            <span class="span2">{{item.tpTPFApplyNo}}</span>
          </li> -->
          <!-- <li>
            <span class="span1">总保费：</span>
            <span class="span2">{{basic.totalActualSumPremium}}</span>
          </li> -->
          <!-- <button v-if="item.orderStatus == '1'" class="btn">核保中</button>
          <button v-if="item.orderStatus == '3'" class="btn">审批退回</button>
          <button v-if="item.orderStatus == '4'" class="btn" @click="$router.push({name: 'paymentPage', query: {tpBizApplyNo: tpBizApplyNo,tpTPFApplyNo: tpTPFApplyNo}})">待支付</button>
          <button v-if="item.orderStatus == '6'" class="btn">待修改</button> -->          
        </ul>
        <ul class="orderMain" v-show="bizShow">
          <li>
            <span class="span1">商业险投保单号：</span>
            <span class="span2">{{bizMap.tpBizApplyNo}}</span>
          </li>
          <li>
            <span class="span1">商业险保费：</span>
            <span class="span2">{{bizMap.premium}}</span>
          </li>
          <li>
            <span class="span1">商业险状态：</span>
            <span class="span2" v-if="bizMap.orderStatus == '1'">核保中</span>
            <span class="span2" v-if="bizMap.orderStatus == '2'">已支付</span>
            <span class="span2" v-if="bizMap.orderStatus == '3'">审批退回</span>
            <span class="span2" v-if="bizMap.orderStatus == '4'">待支付</span>
            <span class="span2" v-if="bizMap.orderStatus == '6'">待修改</span>
          </li>
        </ul>
        <ul class="orderMain" v-show="tPFShow">
          <li>
            <span class="span1">交强险投保单号：</span>
            <span class="span2">{{tPFMap.tpBizApplyNo}}</span>
          </li>
          <li>
            <span class="span1">交强险保费：</span>
            <span class="span2">{{tPFMap.premium}}</span>
          </li>
          <li>
            <span class="span1">车船税：</span>
            <span class="span2">{{tPFMap.vehicleTax}}</span>
          </li>
          <li>
            <span class="span1">交强险状态：</span>
            <span class="span2" v-if="tPFMap.orderStatus == '1'">核保中</span>
            <span class="span2" v-if="tPFMap.orderStatus == '2'">已支付</span>
            <span class="span2" v-if="tPFMap.orderStatus == '3'">审批退回</span>
            <span class="span2" v-if="tPFMap.orderStatus == '4'">待支付</span>
            <span class="span2" v-if="tPFMap.orderStatus == '6'">待修改</span>
          </li>
        </ul>
        <ul  class="orderMain" v-show="mainShow">
          <li>
            <span class="span1">总保费：</span>
            <span class="span2">{{basic.totalActualSumPremium}}</span>
          </li>
          <!-- <button v-if="basic.isPay == '1'" class="btn" @click="$router.push({name: 'paymentPage', query: {tpBizApplyNo: tpBizApplyNo,tpTPFApplyNo: tpTPFApplyNo}})">待支付</button> -->
          <button v-if="basic.isPay == '1'" class="btn" @click="payBtn ()">待支付</button>
          <button v-if="basic.isPay == '2'" class="btn" @click="$router.push({name: 'messageVerification', query: {tpBizApplyNo: tpBizApplyNo,tpTPFApplyNo: tpTPFApplyNo,tpCalulateNo: tpCalulateNo,checkBl: checkBl,checkMobile:checkMobile,checkName:checkName}})">短信验证</button>
        </ul>
      </mt-loadmore>
    </div>
    <div class="alert" v-show="tipShow">
      <!-- <p>仅商业险核保通过，是否继续支付商业险？</p> -->
      <p>{{text}}</p>
      <button class="sureBtn" @click="$router.push({name: 'paymentPage', query: {tpBizApplyNo: tpBizApplyNo,tpTPFApplyNo: tpTPFApplyNo,tpCalulateNo: tpCalulateNo}})">确定</button>
    </div>
    <!-- <div class="alert" v-show="tipShow2">
      仅交强险核保通过，是否继续支付交强险？
    </div> -->
    <div class="fade" v-show="fadeShow" @click="fade ()"></div>
    <div class="alert" v-show="timelate">
      <p>该订单已超过支付时效，请重新选择起保日期</p>
      <button class="sureBtn" @click="deleteOrder()">返回修改</button>
    </div>
  </div>
</template>

<script>
  //import Header from '../../components/Header'
  //import { Loadmore } from 'mint-ui';
  //Vue.component(Loadmore.name, Loadmore);
  export default {
    //@click="$router.push($route.meta.comeFrom)"
    name: "orderInfo",
    data() {
      return {
        mainShow: false,
        basic: {},
        bizMap: {},
        bizShow: false,
        tPFMap: {},
        tPFShow: false,
        tipShow: false,
        fadeShow: false,
        timelate: false,
        /*state: String,
        stateDescription: String,
        topStatus: '',*/
        //isTBA: String
        isPrompt: String,
        text: String,
        tpCalulateNo: String,
        checkBl: String,
        checkMobile: String,
        checkName: String
      }
    },
    created() {
      this.from = this.$route.query.from
      this.tpBizApplyNo = this.$route.query.tpBizApplyNo
      this.tpTPFApplyNo = this.$route.query.tpTPFApplyNo
      this.orderNo = this.$route.query.orderNo
      this.orderInfor ()
    },
    methods: {
      orderInfor (){
        this.$post(this.$url.checkInsurance.orderInfoQuery, {
          TpBizApplyNo: this.tpBizApplyNo,//商业险投保单号
          TpTPFApplyNo: this.tpTPFApplyNo,//交强险投保单号
          userId: ''
        }).then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: "bottom"
            });
          } else {
            //isTBA 0:交强商业都没有 1：商业 2：交强 3：交强和商业
            //isPay 1：待支付按钮
            //isPrompt 1：商业  2：交强 3：商业和交强(点击支付弹框判断依据)
            this.mainShow = true
            this.basic = res.response.basic
            this.isTBA = res.response.basic.isTBA
            this.isPrompt = res.response.basic.isPrompt
            this.tpCalulateNo = res.response.tpCalulateNo
            this.checkBl = res.response.checkBl
            this.checkMobile = res.response.checkMobile
            this.checkName = res.response.checkName
            if(this.basic.isPay == 10){
              this.fadeShow = true
              this.timelate = true
            }
            if(this.isTBA == 1){
              this.bizShow = true
              this.bizMap = res.response.bizMap
            }else if(this.isTBA == 2){
              this.tPFShow = true
              this.tPFMap = res.response.tPFMap
            }else if(this.isTBA == 3){
              this.bizShow = true
              this.tPFShow = true
              this.bizMap = res.response.bizMap
              this.tPFMap = res.response.tPFMap
            }
          }
        });
      },
      deleteOrder(){
        this.$post(this.$url.checkInsurance.deleteOrder, {
          orderNo: this.orderNo,
          userId: ''
        }).then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: "bottom"
            });
          } else {
            this.$router.push({name: 'insuranceType', query: {orderNo: this.orderNo}})
          }
        });
      },
      payBtn (){
        if(this.isPrompt == 1){
          this.tipShow = true
          this.fadeShow = true
          this.text = "仅商业险核保通过，是否继续支付商业险？"
        }else if(this.isPrompt == 2){
          this.tipShow = true
          this.fadeShow = true
          this.text = "仅交强险核保通过，是否继续支付交强险？"
        }else if(this.isPrompt == 3){
          this.$router.push({name: 'paymentPage', query: {tpBizApplyNo: this.tpBizApplyNo,tpTPFApplyNo: this.tpTPFApplyNo,tpCalulateNo: this.tpCalulateNo}})
        }
      },
      fade (){
        this.tipShow = false
        this.fadeShow = false
        this.timelate = false
      },
      loadTop() {
        // 加载更多数据
        this.$refs.loadmore.onTopLoaded()
      },
      handleTopChange(status) {
        this.orderInfor ()
      },
      goBack() {
        if(this.from == "app"){
          if (window.android) {
            window.android.back();
          }
          // ios
          if (window.back) {
            window.back();
          }
        }else{
          this.goOrder();
        }
      },
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
  .orderMain{
    width: 100%;
    padding: .1rem 3% .1rem 3%;
    background: #fff;
    border-bottom: 1px solid #eee;
    overflow: hidden;
  }
  .orderMain li{
    width: 100%;
    padding: .08rem 0;
  }
  .orderMain li span{
    display: inline-block;
    font-size: .14rem;
    color: #000;
  }
  .orderMain li .span1{
    width: 33%;
  }
  .orderMain li .span2{
    width: 67%;
    text-align: right;
  }  
  .btn{
    float: right;
    width: 30%;
    height: .3rem;
    line-height: .3rem;
    background: #FD4545;
    text-align: center;
    font-size: .16rem;
    color: #fff; 
    border-radius:3px;   
  }
  .alert{
    position: fixed;
    z-index: 101;
    top: 50%;
    left: 50%;
    width: 2rem;
    height: 1rem;
    background: #fff;
    transform:translate(-50%,-50%); 
    -webkit-transform:translate(-50%,-50%);
    border-radius: 5px;
  } 
  .alert p{
    padding: .1rem .1rem 0;
    text-align: center;
  }
  .sureBtn{
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    font-size: .16rem;
    color: #fff;
    background: #F15B5A;
    position: fixed;
    bottom: 0;
  }
  .fade{
    position: fixed; 
    top: 0;
    left: 0; 
    background: #000; 
    z-index: 2; 
    opacity: 0.6;
    filter: alpha(opacity=60);
    width: 100%; 
    height: 100%;
    -top: 64px;
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

  .head-back {
    position: absolute;
    left: 0;
    top: 0px;
    width: 44px;
    height: 44px;
    background: url('../../assets/img/back.png') no-repeat center center;
    background-size: 9px 17px;
  } 
</style>