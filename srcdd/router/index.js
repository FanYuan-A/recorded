import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

/* eslint-disable */
export default new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_PUBLIC_PATH,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () =>
        import( /* webpackChunkName: 'demo' */ '../views/demo/login.vue'),
      meta: {
        title: '登录',
        // 是否需要登陆
        loginAuth: false,
        // 是否需要验证投保用户权限
        customerAuth: false,
        // 是否需要获取第三方信息(当无需登录，且通过微信、支付宝等第三方访问时有效)
        thirdAuth: false,
        // 第三方登陆方式(base、userinfo)
        thirdScopeType: 'base',
        app: {
          canShare: true
        }
      }
    },
    // 产品列表
    {
      path: '/product/list',
      name: 'productList',
      component: () =>import( /* webpackChunkName: 'product' */ '../views/product/productList.vue'),
      meta: {
        title: '计划书',
        // 是否需要登陆
        loginAuth: true,
        // 是否需要验证投保用户权限
        customerAuth: false,
        // 是否需要获取第三方信息(当无需登录，且通过微信、支付宝等第三方访问时有效)
        thirdAuth: true,
        // 第三方登陆方式(base、userinfo)
        thirdScopeType: 'userinfo',
        wx: {
          sign: true, //该页面是否需要验签
          jsApiList: ['hideAllNonBaseMenuItem']
        }
      },
    },
    {
      path: '/proposal/make',
      name: 'proposalComMake',
      component: () =>import( /* webpackChunkName: 'product' */ '../views/proposal/proposalComMake.vue'),
      meta: {
        title: '制作计划书',
        // 是否需要登陆
        loginAuth: true,
        // 是否需要验证投保用户权限
        customerAuth: false,
        // 是否需要获取第三方信息(当无需登录，且通过微信、支付宝等第三方访问时有效)
        thirdAuth: true,
        // 第三方登陆方式(base、userinfo)
        thirdScopeType: 'userinfo',
        wx: {
          sign: true, //该页面是否需要验签
          jsApiList: ['hideAllNonBaseMenuItem']
        }
      },
    },
    {
      path: '/proposal/list',
      name: 'proposalList',
      component: () =>import( /* webpackChunkName: 'product' */ '../views/proposal/proposalList.vue'),
      meta: {
        title: '历史计划书',
        // 是否需要登陆
        loginAuth: true,
        // 是否需要验证投保用户权限
        customerAuth: false,
        // 是否需要获取第三方信息(当无需登录，且通过微信、支付宝等第三方访问时有效)
        thirdAuth: true,
        // 第三方登陆方式(base、userinfo)
        thirdScopeType: 'userinfo',
        wx: {
          sign: true, //该页面是否需要验签
          jsApiList: ['hideAllNonBaseMenuItem']
        }
      },
    },
    // 建议书详情——代理人
    {
      path: '/proposal/detail',
      name: 'proposalDetail',
      component: () =>import( /* webpackChunkName: 'product' */ '../views/proposal/proposalDetail.vue'),
      meta: {
        title: '计划书',
        loginAuth: true,
        customerAuth: false,
        thirdAuth: true,
        thirdScopeType: 'userinfo',
        wx: {
          sign: true, //该页面是否需要验签
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline']
        }
      }
    },
    // 建议书详情——客户
    {
      path: '/proposal/proposalnologin',
      name: 'proposalNologin',
      component: () =>import( /* webpackChunkName: 'product' */ '../views/proposal/proposalNologin.vue'),
      meta: {
        title: '计划书',
        loginAuth: false,
        customerAuth: false,
        thirdAuth: false,
        thirdScopeType: 'userinfo',
        wx: {
          sign: true, //该页面是否需要验签
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline']
        }
      }
    },
    // 7.利益演示表
    {
      path: '/proposal/benefitTable',
      name: 'benefitTable',
      component: () =>import( /* webpackChunkName: 'product' */ '../views/proposal/benefitTable.vue'),
      meta: {
        title: '利益演示',
        loginAuth: false,
        customerAuth: false,
        thirdAuth: false,
        thirdScopeType: 'userinfo',
      }
    },
    // {
    //   path: '/product/productDetail/:itemCode',
    //   name: 'productDetail',
    //   component: () => import( /* webpackChunkName: 'product' */ '../views/product/productDetail.vue'),
    //   meta: {
    //     title: '',
    //     // 是否需要登陆
    //     loginAuth: false,
    //     // 是否需要验证投保用户权限
    //     customerAuth: false,
    //     // 是否需要获取第三方信息(当无需登录，且通过微信、支付宝等第三方访问时有效)
    //     thirdAuth: true,
    //     // 第三方登陆方式(base、userinfo)
    //     thirdScopeType: 'base',
    //     app: {
    //       canShare: true
    //     },
    //     wx: {
    //       sign: true, //该页面是否需要验签
    //       jsApiList: ['chooseWXPay', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'updateAppMessageShareData', 'updateTimelineShareData'] //该页面需要用到的方法 chooseWXPay onMenuShareAppMessage onMenuShareTimeline
    //     }
    //   }
    // },
  ]
})