import http from '../utils/http'
import store from '../store/index'

const URL = process.env.VUE_APP_BASE_CUSTOMER
// if ('true' !== process.env.VUE_APP_USE_MOCK) {
//   URL = process.env.VUE_APP_BASE_CUSTOMER
// }

export default {
  // 验证用户登录状态
  // accountCheck (params = {}) {
  //   params.type = store.getters.getType
  //   params.system = store.getters.getSystem
  //   params.third = store.getters.getThirdToken
  //   params.token = store.getters.getToken
  //   return http.get(URL + '/account/check', params)
  // },
  accountCheck (params) {
    return http.get(URL + '/account/check', params)
  },
  //获取第三方信息
  thirdInfo (params) {
    return http.get(URL + '/third/info', params)
  },
  //使用第三方账户进行账户登陆
  thirdLogin (params) {
    return http.get(URL + '/third/login', params)
  },
  //第三方快捷登陆
  thirdAuth (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    return http.get(URL + '/third/auth', params)
  },
  //登陆
  login (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    return http.get(URL + '/account/login', params)
  },
  //获取用户信息
  accountInfo (params) {
    return http.post(URL + '/account/info', params)
  },
  //发送短信验证码
  smsSend (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    return http.post(URL + '/verify/sms', {
      data: params,
      contentType: 'form'
    })
  },
  //微信授权分享
  chImg (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    params.thirdType = store.getters.getThirdType
    return http.post(URL + '/common/initParams', {
      data: params,
      contentType: 'form'
    })
  },
  getUserList (params) {
    return http.get(URL + '/user/listpage', params)
  },
  // 图形验证码获取
  graphSend () {
    return http.get(URL + '/verify/graph')
  },
  //快捷登录
  quickLogin (data) {
    data.type = store.getters.getType
    data.system = store.getters.getSystem
    return http.post(URL + '/account/quickLogin', {
      data: data,
      contentType: 'form'
    })
  },
  // 验证用户信息是否一致
  verifyByNameIdcard (params) {
    return http.get(URL + '/account/verifyByNameIdcard', params)
  },


}