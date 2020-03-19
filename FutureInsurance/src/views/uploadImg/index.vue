<template>
  <div class="wrapper">
    <Header></Header>
    <div class="upload main">
      <div class="basic_info">
        <span class="up_title">验车照片</span>
        <p class="detail">验车照片需要上传6张，分别为：</p>
        <div class="basicImgwrap">
          <div class="wrapTitle">
            <p>1.左前方45度角照片</p>
            <div class="basicImg">
              <img alt="" class="basicupload" :src="oneImg">
              <input type="file" class="basicfile" @change="uploadImg($event, 'one')">
            </div>           
          </div>
          <div class="wrapTitle wrapTitle2">
            <p>2.右前方45度角照片</p>
            <div class="basicImg">
              <img alt="" class="basicupload" :src="twoImg">
              <input type="file" class="basicfile" @change="uploadImg($event, 'two')">
            </div>            
          </div>
          <div class="wrapTitle">
            <p>3.左后方45度角照片</p>
            <div class="basicImg">
              <img alt="" class="basicupload" :src="threeImg">
              <input type="file" class="basicfile" @change="uploadImg($event, 'three')">
            </div>            
          </div>
          <div class="wrapTitle wrapTitle2">
            <p>4.右后方45度角照片</p>
            <div class="basicImg">
              <img alt="" class="basicupload" :src="fourImg">
              <input type="file" class="basicfile" @change="uploadImg($event, 'four')">
            </div>            
          </div>
          <div class="wrapTitle">
            <p>5.车架号照片</p>
            <div class="basicImg">
              <img alt="" class="basicupload" :src="fiveImg">
              <input type="file" class="basicfile" @change="uploadImg($event, 'five')">
            </div>            
          </div>
          <div class="wrapTitle wrapTitle2">
            <p>6.仪表盘照片</p>
            <div class="basicImg">
              <img alt="" class="basicupload" :src="sixImg">
              <input type="file" class="basicfile" @change="uploadImg($event, 'six')">
            </div>            
          </div>
        </div>
      </div>
      <div class="basic_info">
        <span class="up_title">身份证照片</span>
        <p class="detail">身份证照片需要上传2张，分别为：</p>
        <div class="basicImgwrap">
          <div class="wrapTitle">
            <p>1.身份证正面</p>
            <div class="basicImg">
              <img alt="" class="basicupload" :src="sevenImg">
              <input type="file" class="basicfile" @change="uploadImg($event, 'seven')">
            </div>           
          </div>
          <div class="wrapTitle wrapTitle2">
            <p>2.身份证反面</p>
            <div class="basicImg">
              <img alt="" class="basicupload" :src="eightImg">
              <input type="file" class="basicfile" @change="uploadImg($event, 'eight')">
            </div>            
          </div>
        </div>
      </div>
      <div class="basic_info">
        <span class="up_title">行驶证照片</span>
        <p class="detail">行驶证照片需要上传2张，分别为：</p>
        <div class="basicImgwrap">
          <div class="wrapTitle">
            <p>1.行驶证主页</p>
            <div class="basicImg">
              <img alt="" class="basicupload" :src="nineImg">
              <input type="file" class="basicfile" @change="uploadImg($event, 'nine')">
            </div>           
          </div>
          <div class="wrapTitle wrapTitle2">
            <p>2.行驶证副本</p>
            <div class="basicImg">
              <img alt="" class="basicupload" :src="tenImg">
              <input type="file" class="basicfile" @change="uploadImg($event, 'ten')">
            </div>            
          </div>
        </div>
      </div>
      <mt-button type="primary" size="large" class="submitBtn imgBtn" @click="submitInsur()">提交核保</mt-button>
    </div>
  </div>
</template>

<script>
  import Header from '../../components/Header'
  import canvasResize from 'canvas-resize'
  export default {
    name: "uploadImg",
    components: {
      Header
    },
    data() {
      return {
        oneImg: require('@/assets/img/1.png'),
        twoImg: require('@/assets/img/2.png'),
        threeImg: require('@/assets/img/3.png'),
        fourImg: require('@/assets/img/4.png'),
        fiveImg: require('@/assets/img/5.png'),
        sixImg: require('@/assets/img/6.png'),
        sevenImg: require('@/assets/img/7.png'),
        eightImg: require('@/assets/img/8.png'),
        nineImg: require('@/assets/img/9.png'),
        tenImg: require('@/assets/img/10.png'),
        arr:[],
      }
    },
    created() {
      this.TpCalulateNo = this.$route.query.TpCalulateNo
      this.orderNo = this.$route.query.orderNo
    },
    mounted() {

    },
    methods: {
      uploadImg (ipt, type) {
        let vm = this
        canvasResize(ipt.target.files[0], {
          crop: false,
          quality: 0.3,
          rotate: 0,
          callback: function (baseStr) {
            let baseUri = baseStr.substring(baseStr.indexOf('base64,') + 7)
            //vm.uploading = true
            vm.$post(vm.$url.checkInsurance.uploadPicture, {
              img: baseUri,
              type: 2
            }).then((res) => {
              console.log(res)
              if (res.code != 200) {
                vm.Toast({
                  message: res.message,
                  position: "bottom"
                });
              } else {
                //type === 'sy' ? vm.syImgUrl = res.response.imgUrl : vm.jqImgUrl = res.response.imgUrl
                vm.attachmentNo = res.response.attachmentNo
                vm.attachmentName = res.response.attachmentName
                vm.Attachment={"AttachmentNo":vm.attachmentNo,"AttachmentName":vm.attachmentName};
                //vm.arr.length=10;
                if(type === 'one'){
                  vm.oneImg = res.response.imgUrl;
                  vm.arr[0]=vm.Attachment;
                }else if(type === 'two'){
                  vm.twoImg = res.response.imgUrl;
                  vm.arr[1]=vm.Attachment;
                }else if(type === 'three'){
                  vm.threeImg = res.response.imgUrl;
                  vm.arr[2]=vm.Attachment;
                }else if(type === 'four'){
                  vm.fourImg = res.response.imgUrl;
                  vm.arr[3]=vm.Attachment;
                }else if(type === 'five'){
                  vm.fiveImg = res.response.imgUrl;
                  vm.arr[4]=vm.Attachment;
                }else if(type === 'six'){
                  vm.sixImg = res.response.imgUrl;
                  vm.arr[5]=vm.Attachment;
                }else if(type === 'seven'){
                  vm.sevenImg = res.response.imgUrl;
                  vm.arr[6]=vm.Attachment;
                }else if(type === 'eight'){
                  vm.eightImg = res.response.imgUrl;
                  vm.arr[7]=vm.Attachment;
                }else if(type === 'nine'){
                  vm.nineImg = res.response.imgUrl;
                  vm.arr[8]=vm.Attachment;
                }else if(type === 'ten'){
                  vm.tenImg = res.response.imgUrl;
                  vm.arr[9]=vm.Attachment;
                }
              }
            });
          }
        });
        // vm.AttachmentList=vm.removeEmptyArray(vm.arr);
        // console.log(vm.AttachmentList);
      },
      submitInsur(){
        if(this.arr.length != 0){
          this.$post(this.$url.checkInsurance.verifyInsurance, {
            TpCalulateNo: this.TpCalulateNo, 
            orderNo: this.orderNo, 
            AttachmentList: this.arr
          }).then((res) => {
            console.log(res);
            if (res.code != 200) {
              this.Toast({
                message: res.message,
                position: "bottom" 
              })
            } else {
              this.tpBizApplyNo = res.response.tpBizApplyNo  //商业险投保单号 
              this.tpTPFApplyNo = res.response.tpTPFApplyNo  //交强险投保单号 
              this.$router.push({name: 'orderInfo', query: {tpBizApplyNo: this.tpBizApplyNo,tpTPFApplyNo: this.tpTPFApplyNo}})
              
            }
          })
        }else{
          this.Toast({
            message: '请至少上传一张照片',
            position: "bottom"
          })
        }
      },
    }
  };
</script>

<style scoped>
  .upload {
    color: #000;
  }
  .basic_info{
    background: #fff;
    padding-top: .2rem;
    padding-left: .1rem;
    padding-right: .1rem;
  }
  .up_title{
    display: block; 
    line-height: .3rem;
    text-align: left;
    font-size: .18rem;
    color: #000;
    font-weight: 900;
  }
  .basic_info .detail{
    background: #fff;
    text-align: left;
    color: #666;
  }
  .basicImgwrap{
    width: 335px;
    padding: .2rem 0% .15rem;
    margin: 0 auto;
  }
  .wrapTitle{
    width: 160px;
    display: inline-block;
    margin-right: 10px;
  }
  .wrapTitle2{
    margin-right: 0;
  }
  .wrapTitle p{
    padding-bottom: 0.1rem;
    font-size: .12rem;
    text-align: left;
    color: #000;
  }
  .basicImg{
    -width: 95px;
    -height: 95px;
    width: 160px;
    height: 108px;
    position: relative;
    display: inline-block;
  }
  .basicupload{
    width: 100%;
    height: 100%;
  }
  .basicfile{
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  .imgBtn{
    z-index: 100;
  }
  
</style>
