import http from '../utils/http'
import store from '../store/index'

const URL = process.env.VUE_APP_BASE_HRP_NEW
const URL_REWARD_NEW = process.env.VUE_APP_BASE_REWARD




export default {
  // 产品页面所需内容查询
  getProductInfo (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    // params.type = 'wx'
    // params.system = 'hr'
    return http.get(URL + '/item/getProductPageInfo', params)
  },
  trialPrem (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    return http.post(URL + '/item/calPrem', params)
  },
  getAreaJson (params) {
    return http.getCache('https://cdn1.huaruisales.com/mobsite/json/area_' + params.code + '.json')
  },
  getProfesJson (params) {
    return http.getCache('https://cdn1.huaruisales.com/mobsite/json/profession_' + params.code + '.json')
  },
  getUserCouponList (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    return http.get(URL_REWARD_NEW + '/coupon/userCouponList', params)
  },
  //年金产品页面查询
  getAnnuityProductPageInfo (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    return http.get(URL + '/item/getAnnuityProductPageInfo', params)
  },
  //2.4.年金类产品初始利益试算接口
  calAnnuityInitBenefit (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    return http.post(URL + '/item/calAnnuityInitBenefit', params)
  },
  uploadUnderwriteImage (params) {
    params.append('type', store.getters.getType)
    params.append('system', store.getters.getSystem)
    console.log(params)

    return http.post(URL + '/image/uploadUnderwriteImage', {
      data: params,
      contentType: 'formData'
    })
  },
  imageUnderwrite (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    return http.post(URL + '/image/imageUnderwrite', params)
  },
  getOrderDetail (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    return http.post(URL + '/order/getOrderDetail', params)
  },
  saveTmpOrder (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    return http.post(URL + '/order/saveTmpOrder', params)
  },
  getSubscribeConsultPage (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    return http.get(URL + '/activity/getSubscribeConsultPage', params)
  },
  customerInfoSubmit (params) {
    params.type = store.getters.getType
    params.system = store.getters.getSystem
    return http.post(URL + '/activity/customerInfoSubmit', params)
  },

}