import router from '@/router'
import store from '@/store'
import app from '@/utils/app'
import $customer from '@/api/customer'
import {
  validator
} from '@/utils/common'
function doFilter () {
  router.beforeEach((to, from, next) => {
    if (to.meta.silentLogin == undefined || !to.meta.silentLogin) {
      return next()
    }
    // 判断Token有效性
    if (store.state.auth.token) {
      checkLogin().then(res => {
        if (res.token) {
          return next()
        } else {
          // 清除失效Token
          store.dispatch('removeToken')
          return goLogin(to, from, next)
        }
      })
    } else {
      return goLogin(to, from, next)
    }
  })
}

function checkLogin () {
  // TODO 调用esp/customer或者对应平台的Token验证方法
  return $customer.accountCheck({
    token: store.getters.getToken,
    third: store.getters.getThirdToken
  })
}
function goLogin (to, from, next) {
  // 进行登陆处理
  let visitType = store.getters.getVisitType
  if (visitType == 'app') {
    // 调用APP的getToken方法处理
    app.getToken().then((res) => {
      if (res.token && res.token != '') {
        store.dispatch('setToken', res.token)
        return next()
      } else {
        app.jumpValue({
          pageCode: app.PAGE_CODE_ENUM.CUSTOMER_LOGIN
        })
      }
    })
  } else if (visitType == 'wx') {
    if (!validator.isEmpty(store.getters.getThirdToken)) {
      return next()
    }
    // 根据thirdToken进行处理
    $customer.thirdLogin({
      thirdToken: store.getters.getThirdToken
    }).then(res => {
      if (res.result == '0') {
        store.dispatch('setThirdToken', res.thirdToken)
        store.dispatch('setToken', res.token)
        return next()
      }
    })
    //没有thirdToken跳登陆
  } else if (visitType == 'alipay') {
    if (!validator.isEmpty(store.getters.getThirdToken)) {
      return next()
    }
    // 根据thirdToken进行处理
    $customer.thirdLogin({
      thirdToken: store.getters.getThirdToken
    }).then(res => {
      if (res.result == '0') {
        store.dispatch('setThirdToken', res.thirdToken)
        store.dispatch('setToken', res.token)
        return next()
      }
    })
  }
  return next()
}

export default {
  doFilter
}