const state = {
  globalMaskShow:true, //全局遮罩
  title:'',
  htmlViewerCfg:{title:'', url:'',html:''}
}

// getters
const getters = {
  getGlobalMaskShow: state => state.globalMaskShow,
  getTitle: state => state.title,
  getHtmlViewerCfg: state => state.htmlViewerCfg,
}

// actions
const actions = {
  
}

// mutations
const mutations = {
  GLOBALMASK_OPEN (state) {
    state.globalMaskShow = true
  },
  GLOBALMASK_CLOSE (state) {
    state.globalMaskShow = false
  },
  SET_TITLE (state, { title}){
    state.title=title
  },
  setHtmlViewerCfg(state, cfg){
    state.htmlViewerCfg = cfg
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}