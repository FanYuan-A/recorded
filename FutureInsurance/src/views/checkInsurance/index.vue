<template>
  <div class="wrapper">
    <Header></Header>
    <div class="checkInsurance main">
      <div class="errorMessage" v-show="failMes">
        <img src="~@/assets/img/fail.png" alt="" class="fail">
        <p class="text">失败信息：{{Message}}</p>
      </div>
      <!-- <div class="successMsg" v-show="sucMsg">
        <img src="~@/assets/img/success.png" alt="" class="fail">
        <p class="text">核保成功</p>
        <mt-button type="primary" size="large" class="submitBtn" @click="$router.push({name: 'orderInfo', query: {tpBizApplyNo: tpBizApplyNo,tpTPFApplyNo: tpTPFApplyNo}})">下一步</mt-button>
      </div> -->
    </div>
  </div>
</template>

<script>
  import Header from '../../components/Header'
  export default {
    name: "checkInsurance",
    components: {
      Header
    },
    data() {
      return {
        failMes: false,
        sucMsg: false,
        Message: String,
        tpBizApplyNo: String,
        tpTPFApplyNo: String
      }
    },
    created() {
      this.TpCalulateNo = this.$route.query.TpCalulateNo
      this.checkInsur ()
    },
    methods: {
      checkInsur (){
        this.$post(this.$url.checkInsurance.verifyInsurance, {
          TpCalulateNo: this.TpCalulateNo,
          orderNo: this.$route.query.orderNo
        }).then((res) => {
          console.log(res);
          if (res.code == 201) {
            this.failMes = true
            this.Message = res.message
          } else if(res.code == 200) {
            //this.sucMsg = true
            this.tpBizApplyNo = res.response.tpBizApplyNo  //商业险投保单号
            this.tpTPFApplyNo = res.response.tpTPFApplyNo  //交强险投保单号
            this.$router.push({name: 'orderInfo', query: {tpBizApplyNo: this.tpBizApplyNo,tpTPFApplyNo: this.tpTPFApplyNo,orderNo: this.$route.query.orderNo}})
          }else if(res.code !== 201 && res.code !== 200){
            this.Toast({
              message: res.message,
              position: "bottom"
            });
          }
        });
      }
    }
  };
</script>

<style scoped>
  .fail{
    width: 55px;
    height: 55px;
    margin: 100px auto 20px;
    vertical-align:middle;
    display: table-cell;
  }
  .text{
    text-align: center;
    font-size: .16rem;
    color: #000;
    padding: 0 15%;
  }
</style>
