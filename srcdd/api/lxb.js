import http from "../utils/http";
let URL = process.env.VUE_APP_BASE_LXB;

/**
 * 自己后台的接口
 */
export default {
  /** 产品列表类型 */
  getProductTypeList(){
    return http.post(URL+'/proposal/type?_=1577257254216');
  },
  /**
   * 产品列表
   * isFromPlanBook=1:查询计划书的产品列表
   */
  getProductList(type){
    return http.post(`${URL}/product/list?productSubType=${type}&isFromPlanBook=1`);
  },
  /**
   * 产品配置
   */
  getProductConfig(itemCode){return http.post(`${URL}/proposal/getConfig`,{itemCode:itemCode})},
  // 获取计划书详情的配置信息
  getCombinationShow(params){
    return http.post(URL + '/proposal/getShow',params)
  },
}