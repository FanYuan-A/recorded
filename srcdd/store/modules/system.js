import CommonUtil from '@/utils/common'
import config from '@/config'

const state = {
  visitType: null,
  domain: null,
  system: null,
  type: null,
  thirdType: null,
  thirdAppId: null,
  appType: null,
  imgBaseUrl: null
}

// getters
const getters = {
  getVisitType: state => state.visitType,
  getDomain: state => state.domain,
  getSystem: state => state.system,
  getType: state => state.type,
  getThirdType: state => state.thirdType,
  getThirdAppId: state => state.thirdAppId,
  getAppType: state => state.appType,
  getImgBaseUrl: state => state.imgBaseUrl
}

// actions
const actions = {
  initSystemType ({ commit }) {
    let visitType = CommonUtil.getUserAgentType()
    let domain = CommonUtil.getDomain()
    console.log(domain)
    let appType, system, type, thirdType, thirdAppId, imgBaseUrl
    if (visitType == 'ios' || visitType == 'android') {
      appType = visitType
      visitType = 'app'
    }
    console.log(visitType)
    console.log(process.env.VUE_APP_BASEURL)
    // 遍历config.system.params，获取对应的params参数
    for (let i = 0; i < config.system.params.length; i++) {
      let obj = config.system.params[i]
      if (visitType == obj.system_type && domain == obj.domain) {
        console.log(obj.system_type)
        console.log(obj.params.thirdType)
        console.log(obj.params.system)
        console.log(obj.params.type)
        console.log(obj.params.appId)

        system = obj.params.system
        type = obj.params.type
        thirdType = obj.params.thirdType
        thirdAppId = obj.params.appId
        imgBaseUrl = obj.params.imgBaseUrl
      }
    }
    // 根据配置初始化浏览器、系统平台类型
    commit('INIT_SYSTEM_TYPE', { visitType, appType ,domain, system, type, thirdType, thirdAppId, imgBaseUrl})
  }
}

// mutations
const mutations = {
  INIT_SYSTEM_TYPE (state, { visitType, appType, domain, system, type, thirdType, thirdAppId, imgBaseUrl }) {
    state.visitType = visitType
    state.domain = domain
    state.system = system
    state.type = type
    state.thirdType = thirdType
    state.thirdAppId = thirdAppId
    state.appType = appType
    state.imgBaseUrl = imgBaseUrl
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
