<template>
  <div class="wrapper">
    <Header></Header>
    <div class="paymentPage main">
      <div class="pay">
        <div class="commonpay" v-for="(item,index) in payArr" @click="changePay(index)" :key="index" :class="{select:item.a,noselect:!item.a}">
          <img :src="item.img" alt="" class="img">
          <span>{{item.text}}</span>
        </div>
      </div>
      <mt-button type="primary" size="large" class="submitBtn" @click="choosePayment ()">立即支付</mt-button>
      <div class="alert" v-show="popShow">
        <p class="contine">是否继续支付</p>
        <form :action="zhifuUrl" method="post" accept-charset="GBK">
          <input type="hidden" name="requestDoc" v-model="zhifuXml">
          <input type="submit" class="formbtn" value="继续支付">
        </form>
      </div>
      <div class="fade" v-show="fadePop" @click="fade ()"></div>
    </div>
  </div>
</template>
<script>
  import Header from '../../components/Header'
  //import axios from "axios"
  //import Qs from 'qs'
  import wechat from '@/assets/img/wechat.png'
  import zhi from '@/assets/img/zhi.png'
  import Bankcard from '@/assets/img/Bankcard.png'

  export default {
    name: "paymentPage",
    components: {
      Header
    },
    data() {
      return {
        payArr:[
          /*{"img":wechat,"text":"微信支付",'a':false},
          {"img":zhi,"text":"支付宝支付",'a':false},*/
          {"img":Bankcard,"text":"支付收银台",'a':true},
        ],
        payM:'8',
        zhifuUrl: '',
        zhifuXml: '',
        popShow: false,
        fadePop: false,
        tpCalulateNo: String
      }
    },
    created() {
      this.tpBizApplyNo = this.$route.query.tpBizApplyNo
      this.TpfApplyNo = this.$route.query.tpTPFApplyNo
      this.tpCalulateNo = this.$route.query.tpCalulateNo
      //this.choosePayment ()
    },
    methods: {
      changePay(i){
        for(let j=0;j<this.payArr.length;j++){
          this.payArr[j].a=false;
        }
        this.payArr[i].a=true;
        if(i==0){
          this.payM='20';
        }else if(i==1){
          this.payM='10';
        }else if(i==2){
          this.payM='8';
        }else{
          return false;
        }
      },
      choosePayment (){
        this.$post(this.$url.checkInsurance.pay, {
          BizApplyNo: this.tpBizApplyNo,  //商业险投保单号
          TpfApplyNo: this.TpfApplyNo,  //交强险投保单号
          PayMentMode: '8',
          //PayMentMode: this.payM,  //支付方式 3:POS机、8:支付收银台、10:支付宝、20:微信
          PageUrl: 'http://59.110.11.191:8082'+'/futureInsurance/payCallback/'+this.tpCalulateNo,  //支付成功后跳转的页面地址
        }).then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: "bottom"
            })
          } else {
            this.zhifuUrl = res.response.zhifuUrl
            this.zhifuXml = res.response.zhifuXml
            this.popShow = true
            this.fadePop = true
            /*this.$post(this.zhifuUrl, {
              requestDoc: this.zhifuXml
            }).then((res) => {
              console.log(res);

            });*/
            /*axios({
              url: this.zhifuUrl,
              method: 'POST',
              data: {
                requestDoc: this.zhifuXml
              },
              transformRequest: [function (data) {
                data = Qs.stringify(data);
                return data;
              }],
              headers:{'Content-Type':'application/x-www-form-urlencoded','accept-charset':'GBK'}
            }).then((res)=>{
              console.log(res);*/
              /*const div = document.createElement('div');
              div.innerHTML = res.data;
              document.body.appendChild(div);
              document.forms[0].submit();*/
              /*const div = document.createElement('div');
              div.innerHTML = res.data;
              document.body.appendChild(div);*/
              /*document.write(res.data)
            })*/
          }
        })
      },
      fade (){
        this.popShow = false
        this.fadePop = false
      }
    }
  };
</script>

<style scoped>
.paymentPage{
  padding-top: .2rem;
}
.commonpay{
  padding: 0 8%;
  border-bottom: 1px solid #eee;
  font-size: .14rem;
  color: #000;
  overflow: hidden;
  height: .7rem;
  line-height: .7rem;
  display: flex;
  align-items: center;
  -background: #fff;

}
.noselect{
  background: #fff url('../../assets/img/noselected.png') no-repeat 90% center;
  background-size: 18px 18px;
}
.select{
  background: #fff url('../../assets/img/selected.png') no-repeat 90% center;
  background-size: 18px 18px;
}
.commonpay .img{
  width: 7%;
  margin-right: .1rem;
  vertical-align:middle;
  display: table-cell;
  align-items: center;
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
.formbtn{
  width: 100%;
  height: .4rem;
  line-height: .4rem;
  text-align: center;
  background: #F15B5A;
  color: #fff;
  position: fixed;
  bottom: 0;
  -webkit-appearance: none;
}
.contine{
  font-size: .14rem;
  color: #000;
  text-align: center;
  padding-top: .3rem;
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
