import Vue from "vue";
import {post, fetch} from "../config/server";

//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = fetch;

const API = {
  /*"车辆信息"***********************/
  car:{
    ocr: '/futureInsurance/ocr',  // ocr
    insuredStart: '/futureInsurance/insuredStart',
    vehicleInfo: '/futureInsurance/vehicleInfo',   // 查询车辆信息    type: 1查询  2保存
    basicInformation: '/futureInsurance/basicInformation',   // 查询人员信息    type: 1查询  2保存
    insuranceInfo: '/futureInsurance/insuranceInfo',   // 查询险种    type: 1查询  2保存
    message: '/futureInsurance/carModelQuery',
    vehicleStyleQuery: '/futureInsurance/vehicleStyleQuery',
    insurancePlanQuery: '/futureInsurance/insurancePlanQuery',  //  查询险种
    insuranceQuotes: '/futureInsurance/insuranceQuotes',  //  立即报价
    getOrderDetails: '/order/orderDetails',  //  查询订单状态
    checkVerifyInsurance: '/futureInsurance/checkVerifyInsurance',  //  查询订单状态
  },
  checkInsurance: {
    verifyInsurance: "/futureInsurance/verifyInsurance",//核保
    orderInfoQuery: "/futureInsurance/orderInfoQuery",//订单信息
    pay: "/futureInsurance/pay",//支付
    uploadPicture: "/futureInsurance/uploadPicture", //上传照片
    deleteOrder: "/futureInsurance/deleteOrder",//点击返回修改，改变订单信息
    getVerification: "/futureInsurance/getVerification",//获取验证码
    sendVerification: "/futureInsurance/sendVerification",//校验验证码
  }
};


export default API;

Vue.prototype.$url = API;
