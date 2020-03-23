import http from '../utils/http'


let URL = ''
if ('true' !== process.env.VUE_APP_USE_MOCK) {
  URL = process.env.VUE_APP_BASE_AS
}

export default{
  // 首页数据查询
  homeConfig(params) {
    return http.post(URL + '/config/home',params)
  },
  // 产品列表页数据查询
  productList() {
    return http.post(URL + '/item/list')
  },
  // 投保信息查询接口
  insuranceList(params) {
    return http.post(URL + '/item/form',params)
  },
  // 分享信息查询接口
  share(params) {
    return http.post(URL + '/util/share', params)
  },
  // 获取银行限额
  getBankLimit(params) {
    return http.post(URL + '/pay/payLimit',params)
  },
  // 获取银行信息
  getBankDetail(params){
    return http.post(URL + '/pay/cardbin',params)
  },
  // 获取计划书详情的配置信息
  getConfDetail(params){
    return http.post(URL + '/proposal/getShow',params)
  },
  // 获取产品详情
  getItem(params){
    console.log(params)
    return http.post(URL + '/item/get',params)
  },
  // 根据订单状态获取订单话术和链接
  getOrderStatus(params){
    return http.post(URL + '/order/status',params)
  },
  // 制作计划书查询接口
  getConfig(params){
    return http.post(URL + '/proposal/getConfig',params)
  },
  // 信泰产品换取全url接口
  signUrl(params) {
    return http.post(URL + '/util/signUrl', params)
  },
  getActivityInfo(params){
    return http.post(URL + '/activity/getActivityInfo', params)
  },
  // 获取计划书详情的配置信息
  getCombinationShow(params){
    return http.post(URL + '/proposal/getCombinationShow',params)
  },
  // 获取产品列表的对应的年龄
  getProductAge(params){
    return http.post(URL + '/risk/getRiskConfig',params)
  }
}

