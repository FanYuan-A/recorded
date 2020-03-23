import http from '../utils/http'


let plannerUrl = ''
if ('true' !== process.env.VUE_APP_USE_MOCK) {
    plannerUrl= process.env.VUE_APP_BASE_PLANNER
}
export default{
    // 2.1产品试算
    getNewInsureCharge(params){
        return http.post(plannerUrl + '/product/calculation',params)
    },
    // 2.4生成计划书
    saveNewPropsal(params){
        return http.post(plannerUrl + '/proposal/create',params)
    },
    // 2.2 利益试算接口
    getBenefitCalculation(params){
        return http.post(plannerUrl + '/proposal/benefitCalculation',params)
    },
    // 2.6 计划书列表查询接口
    getQueryList(params){
        return http.post(plannerUrl + '/agent/proposal/queryList',params)
    },
    // 2.7 计划书详细查询接口（代理人）
    getQueryDetailA(params){
        return http.post(plannerUrl + '/agent/proposal/queryDetail',params)
    },
    // 2.8 计划书详情查询接口（客户）
    getQueryDetailC(params){
        return http.post(plannerUrl + '/customer/proposal/queryDetail',params)
    },
    // 2.11 计划书分享（签名）
    initSign(params){
        return http.post(plannerUrl + '/agent/proposal/initSign', params)
    },
    // 2.12 计划书查看（客户从分享链接进入验签）
    checkSign(params){
        return http.post(plannerUrl + '/customer/proposal/checkSign', params)
    },
}
