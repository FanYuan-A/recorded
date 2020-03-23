import http from '../utils/http'


let URL = ''
if ('true' !== process.env.VUE_APP_USE_MOCK) {
  URL = process.env.VUE_APP_BASE_ESP
}
export default{
    // 6.1产品试算
    getCustomerInsureCharge(params){
      return http.post(URL + '/customer/insure/charge',params)
    },
    //  3.5获取代理人的订单明细
    getOrderDetailAgent(params){
      return http.get(URL + '/agent/order/detail',params)
    },
    // 16.1验签获取contexttoken
    getCheckSign(params){
      console.log(params)
      return http.post(URL + '/common/checkSign',params)
    },
    //  6.3获取 客户的订单明细
    getOrderDetailCustomer(params){
      return http.post(URL + '/customer/order/detail',params)
    },
    //16.5 上传图片 
    uploaderImg(params){
      return http.post(URL + '/uploader/common',params)
    },
    // 4.2个人中心及个人信息数据查询
    agentInfo() {
      return http.post(URL + '/agent/info')
    },
    // 15.4计划书列表数据查询
    proposalList(params) {
      return http.post(URL + '/agent/proposal/queryList', params)
    },
    // 3.4订单列表数据查询
    orderList(params) {
      return http.get(URL + '/agent/order/list', params)
    },
    // 6.8健康告知数据查询
    showImpart(params) {
      return http.post(URL + '/customer/product/showImpart',params)
    },
    // 6.4投保人确认接口
    appntCheck(params) {
      return http.post(URL + '/customer/insure/appntCheck',params)
    },
    //  16.3获取图形验证码ID
    getGraphId(params){
      return http.get(URL + '/verify/graph',params)
    },
    //16.4 展示图形验证码 /showgraph/{graphId}
    getGraphCode(graphId){
      console.log(graphId)
      return `${URL + '/showgraph/'+graphId}`
      // return 'https://dat-eservice.95549.cn/eservice/cattcha.action?action=image&&a=658'
    },
    // 6.15发送短信验证码
    getNoteCode(params){
      return http.post(URL + '/verify/sms',params)
    },
    // 6.7支付承保接口
    accInsurance(params){
      return http.post(URL + '/customer/insure/accInsurance',params)
    },
    // 6.6转人工核保/线下支付接口
    artificial(params){
      return http.post(URL + '/customer/insure/artificial',params)
    },
    //15.5 获取客户的计划书详情
    getProposalDetailC(params){
      console.log(URL + '/customer/proposal/queryDetail')
      return http.post(URL + '/customer/proposal/queryDetail',params)
    },
    // 15.1利益试算接口
    benecharge(params){
      return http.post(URL + '/proposal/benecharge',params)
    },
    //15.6 获取代理人计划书详情
    getProposalDetailA(params){
      return http.post(URL + '/agent/proposal/queryDetail',params)
    },
    //3.3订单保存接口
      saveOrder(params){
          return http.post(URL + '/agent/insure/saveOrder',params)
      },
    // 登录
    login(params){
      return http.get(URL + '/account/login',params)
    },
    // 15.2生成（baocun）计划书
    savePropsal(params){  
      return http.post(URL + '/agent/proposal/save',params)
    },
    // 核保失败时->再次核保
    underWrite(params){
      return http.post(URL + '/customer/insure/underWrite',params)
    },
    // 17.1 客户列表查询接口
    qryContactInfoList(params){
      return http.post(URL + '/agent/contact/qryContactInfoList',params)
    },
    // 17.2 客户详情 
    contactDetail(params){
      return http.post(URL + '/agent/contact/contactDetail',params)
    },
    // 18.1保单列表查询接口
    policyQueryList(params){
      return http.post(URL + '/agent/policy/queryList',params)
    },
    // 18.2 保单详细查询接口
    policyQueryDetail(params){
      return http.post(URL + '/agent/policy/queryDetail',params)
    },
    // 16.1 团队信息查询接口
    queryGroupInfo(params){
      return http.post(URL + '/agent/group/queryGroupInfo',params)
    },
    // 16.2团队人员列表查询接口 
    queryGroupAgentList(params){
      return http.post(URL + '/agent/group/queryGroupAgentList',params)
    },
    // 16.3直辖部组查询接口 
    queryAgentGroupItem(params){
      return http.post(URL + '/agent/group/queryAgentGroupItem',params)
    },
    // 16.4 团队人员详情查询接口 
    queryAgentItem(params){
      return http.post(URL + '/agent/group/queryAgentItem',params)
    },
    // 订单关闭
    orderClose(params) {
      return http.get(URL + '/agent/order/close',params)
    },
    // 更新订单状态
    changeStatus(params){
      return http.post(URL + '/customer/insure/changeStatus',params)
    },
    // 17.3
    relationInfo(params){
      return http.post(URL + '/agent/contact/relationInfo',params)
    },
    // 19.6 影像件信息识别接口
    imgDiscern(params){
      return http.post(URL + '/common/imgDiscern',params)
    },
    // 6.17 告知书生成接口
    getNotification(params){
      return http.post(URL + '/customer/insure/getNotification',params)
    },
    // 3.7 撤单提交接口
    orderRevoke(params) {
      return http.get(URL + '/agent/order/revoke',params)
    },
    
    // 6.23 支付查询接口
    queryPayInfo(params) {
      return http.post(URL + '/customer/insure/queryPayInfo',params)
    },
    
    // 6.24 申请签约接口
    applyContract(params) {
      return http.post(URL + '/customer/insure/applyContract',params)
    },
    // 6.20 银行账户变更授权查询接口
    changeBankCardQuery(params) {
      return http.post(URL + '/customer/insure/changeBankCardQuery',params)
    },
    // 6.21
    changeBankCardSub(params) {
      return http.post(URL + '/customer/insure/changeBankCard',params)
    },
    // 6.18 投保人确认书查询接口
    getAppntConfirmationQrery(params){
      return http.post(URL + '/customer/insure/appntConfirmationQrery',params)
    },
    // 6.19 投保人确认书提交接口
    getAppntConfirmation(params){
      return http.post(URL + '/customer/insure/appntConfirmation',params)
    },
    // 6.22 投保人确认书提交接口
    getReceiptApply(params){
      return http.post(URL + '/customer/insure/signContract',params)
    },
    
    // 6.18 客户告知书签名提交接口
    getNoticeSignature(params){
      return http.post(URL + '/customer/insure/getNoticeSignature',params)
    },
    // 6.19 客户告知书查询接口
    qryNotificationInfo(params){
      return http.post(URL + '/customer/insure/qryNotificationInfo',params)
    },
    // 3.15 代理人告知书签名提交接口
    getAgentNoticeSignature(params){
      return http.post(URL + '/agent/notification/getNoticeSignature',params)
    },
    // 3.14 代理人告知书查询接口
    qryAgentNotificationInfo(params){
      return http.post(URL + '/agent/notification/qryNotificationInfo',params)
    },
    //  客户保单详细查询接口
    policyCustomerDetail(params){
      return http.post(URL + '/customer/policy/queryDetail',params)
    },

    // 订单关闭接口（对应订单列表‘关闭’按钮）
    orderCancel(params) {
      return http.get(URL + '/agent/order/cancel',params)
    },
}
