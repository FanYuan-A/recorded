import Vue from 'vue'
import Router from 'vue-router'
import carMessage from '../views/carMessage'
import peopleMessage from '../views/peopleMessage'
import insuranceType from '../views/insuranceType'
import insuranceDetails from '../views/insuranceType/insuranceDetails'
import uploadImg from '../views/uploadImg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/carMessage",
    },
    // 车辆信息
    {
      path: "/carMessage",
      name: "carMessage",
      meta: {
        title: '车辆信息'
      },
      component: carMessage
    },
    // 车主,被保人,投保人信息
    {
      path: "/peopleMessage",
      name: "peopleMessage",
      meta: {
        title: '投保信息'
      },
      component: peopleMessage
    },
    // 险种选择
    {
      path: "/insuranceType",
      name: "insuranceType",
      meta: {
        title: '选择险种'
      },
      component: insuranceType
    },
    {
      path: "/insuranceDetails",
      name: "insuranceDetails",
      meta: {
        title: '报价详情'
      },
      component: insuranceDetails
    },
    //上传照片
    {
      path: "/uploadImg",
      name: "uploadImg",
      meta: {
        title: '上传照片',
      },
      component: uploadImg
    },
    //订单状态信息
    {
      path: "/orderInfo",
      name: "orderInfo",
      meta: {
        title: '订单信息',
      },
      component: resolve => require(["../views/orderInfo"], resolve)
    },
    //核保页面
    {
      path: "/checkInsurance",
      name: "checkInsurance",
      meta: {
        title: '投保信息',
      },
      component: resolve => require(["../views/checkInsurance"], resolve)
    },
    //选择支付方式页面
    {
      path: "/paymentPage",
      name: "paymentPage",
      meta: {
        title: '支付',
      },
      component: resolve => require(["../views/paymentPage"], resolve)
    },
    //支付成功
    {
      path: "/paySuccess",
      name: "paySuccess",
      meta: {
        title: '支付成功',
      },
      component: resolve => require(["../views/paySuccess"], resolve)
    },
    {
      path: "/messageVerification",
      name: "messageVerification",
      meta: {
        title: '短信验证',
      },
      component: resolve => require(["../views/messageVerification"], resolve)
    }
  ]
})

