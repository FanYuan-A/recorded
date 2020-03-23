import Cookies from 'js-cookie'

const state = {
  token: '',
  thirdToken: '',
  redirectUrl: ''
}

// getters
const getters = {
  getToken: state => state.token ? state.token : Cookies.get('h5_token'),
  getThirdToken: state => state.thirdToken ? state.thirdToken : Cookies.get('h5_third'),
  getRedirectUrl: state => state.redirectUrl ? state.redirectUrl : sessionStorage.getItem('redirectUrl')
}

// actions
const actions = {
  setToken ({ commit }, token) {
    commit('SET_TOKEN', { token })
  },
  removeToken ({ commit }) {
    commit('REMOVE_TOKEN')
  },
  setThirdToken ({ commit }, token) {
    commit('SET_THIRD_TOKEN', { token })
  },
  removeThirdToken ({ commit }) {
    commit('REMOVE_THIRD_TOKEN')
  },
  setRedirectUrl({commit},url){commit('SET_REDIRECT_URL',url)},
  removeRedirectUrl({commit},url){commit('REMOVE_REDIRECT_URL',url)}
}

// mutations
const mutations = {
  SET_TOKEN (state, { token }) {
    state.token = token
    Cookies.set('h5_token', token)
  },
  REMOVE_TOKEN (state) {
    state.token = null
    Cookies.remove('h5_token')
  },
  SET_THIRD_TOKEN (state, { token }) {
    state.thirdToken = token
    Cookies.set('h5_third', token)
  },
  REMOVE_THIRD_TOKEN (state) {
    state.thirdToken = null
    Cookies.remove('h5_third')
  },
  SET_REDIRECT_URL(state,{redirectUrl}){
    state.redirectUrl = redirectUrl
    sessionStorage.setItem('redirectUrl',redirectUrl)
  },
  REMOVE_REDIRECT_URL(state){
    state.redirectUrl = null
    sessionStorage.removeItem('redirectUrl')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
