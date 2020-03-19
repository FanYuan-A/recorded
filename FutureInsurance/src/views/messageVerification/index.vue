<template>
  <div class="wrapper">
    <Header></Header>
    <div class="orderInfo main">
      <ul class="orderMain">
        <li>
          <span class="span1">{{nameTitle}}</span>
          <span class="span2">{{checkName}}</span>
        </li>
        <li>
          <span class="span1">{{phoneTitle}}</span>
          <span class="span2">{{checkMobile}}</span>
        </li>
        <div class="mvTip">
          <span>短信验证码：</span>
          <input type="text" v-model="codeNumber">
          <span class="btn" @click="getVerifyCode()" v-show="sendCode">获取验证码</span>
          <span class="btn" v-show="!sendCode">{{authTime}}后重新获取</span>
        </div>
      </ul>
      <mt-button type="primary" size="large" class="submitBtn" @click="Checkverificationcode()">立即支付</mt-button>
    </div>
  </div>
</template>

<script>
  import Header from '../../components/Header'
  export default {
    name: "messageVerification",
    components: {
      Header
    },
    data() {
      return {
        sendCode: true,
        authTime: 0,
        codeNumber: '',
        nameTitle: String,
        phoneTitle: String,
      }
    },
    created() {
      this.tpBizApplyNo = this.$route.query.tpBizApplyNo
      this.tpTPFApplyNo = this.$route.query.tpTPFApplyNo
      this.tpCalulateNo = this.$route.query.tpCalulateNo //保单号
      this.checkBl = this.$route.query.checkBl
      this.checkMobile = this.$route.query.checkMobile
      this.checkName = this.$route.query.checkName
      if(this.checkBl == '0'){ //0代表投保人
        this.nameTitle = '投保人姓名：'
        this.phoneTitle = '投保人手机号：'
      }else if(this.checkBl == '1'){ //1代表被保人
        this.nameTitle = '被保人姓名：'
        this.phoneTitle = '被保人手机号：'
      }
    },
    methods: {
      getVerifyCode(){       
        this.sendCode = false;
        this.authTime = 60;
        var auth_timetimer =  setInterval(()=>{
            this.authTime--;
            if(this.authTime<=0){
                this.sendCode = true;
                clearInterval(auth_timetimer);
            }
        }, 1000);
        this.$post(this.$url.checkInsurance.getVerification, {
          BizApplication: this.tpBizApplyNo,
          TPFApplication: this.tpTPFApplyNo
        }).then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: "bottom"
            });
          } else {
            this.status = res.response.status
            if(this.status == 1){
              this.Toast({
                message: '验证码获取失败，请重试！',
                position: "bottom"
              });
            }
          }
        });
      },
      Checkverificationcode(){
        if(this.codeNumber == ''){
          this.Toast({
            message: '请填写短信验证码',
            position: "bottom"
          });
          return
        }else{
          this.$post(this.$url.checkInsurance.sendVerification, {
            Verificate: this.codeNumber,
            BizApplication: this.tpBizApplyNo,
            TPFApplication: this.tpTPFApplyNo
          }).then((res) => {
            console.log(res);
            if (res.code != 200) {
              this.Toast({
                message: res.message,
                position: "bottom"
              });
            } else {
              this.status = res.response.status
              if(this.status == 1){
                this.Toast({
                  message: '验证码提交失败，请重试！',
                  position: "bottom"
                });
              }else if(this.status == 0){
                this.$router.push({name: 'paymentPage', query: {tpBizApplyNo: this.tpBizApplyNo,tpTPFApplyNo: this.tpTPFApplyNo,tpCalulateNo: this.tpCalulateNo}})
              }
            }
          });
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
  .mvTip{
    padding: .08rem 0;
    color: #000;
    font-size: .14rem;
  }
  .mvTip input{
    border: none;
    width: 30%;
    height: .4rem;
    border: 1px solid #ccc;
    margin-left: 4%;
  }
  .mvTip .btn{
    float:right;
    display: inline-block;
    width: 30%;
    height: .3rem;
    margin-top: .05rem;
    line-height: .3rem;
    background: #FD4545;
    text-align: center;
    font-size: .14rem;
    color: #fff; 
    border-radius:3px; 
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