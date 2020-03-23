import http from '../utils/http'
import store from '../store/index'

const URL = process.env.VUE_APP_BASE_HRP

export default {
  // 核保接口
  underWrite (data) {
    return http.post(URL + '/safeguard/insure/underWrite', data)
  },
  checkRenewalBankAccNo (data) {
    return http.post(URL + '/renewal/checkBankNo', {
      data: data,
      contentType: 'form'
    })
  },
  // 智能核保接口
  doIntelUnderwrite (params) {
    params.platformType = store.getters.getType
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    // params.platformType = 'wx'
    return http.post(URL + '/safeguard/insure/doIntelUnderwrite', params)
  },
  // 支付承保接口
  payAndSign (params) {
    return http.post(URL + '/safeguard/insure/payAndSign', params)
  },
  //订单明细查询接口
  getOrderDetail (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    // params.type = 'page'
    // params.system = 'hr'
    return http.get(URL + '/safeguard/order/detail', params)
  },
  activityInvolveCheck (params) {
    return http.post(URL + '/activity/involveCheck', params)
  },
  activityInvolve (params) {
    return http.post(URL + '/activity/involve', {
      data: params,
      contentType: 'form'
    })
  },
  //支付信息查询接口
  getPayInfo (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    // params.type = 'page'
    // params.system = 'hr'
    return http.get(URL + '/safeguard/insure/getPayInfo', params)
  }
}