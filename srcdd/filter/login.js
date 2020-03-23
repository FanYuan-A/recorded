import router from '@/router'
import store from '@/store'
import app from '@/utils/app'
import $customer from '@/api/customer'
import {
  validator
} from '@/utils/common'
function doFilter () {
  router.beforeEach((to, from, next) => {
    console.log(from)
    console.log(to)
    // 无需登录则跳出
    if (to.meta.loginAuth == undefined || !to.meta.loginAuth) {
      return next()
    }
    // 判断Token有效性
    if (store.getters.getToken) {
      console.log('LXB-Filter [login] - check token', store.getters.getToken)
      checkLogin().then(res => {
        if (res.token) {
          console.log('LXB-Filter [login] - check token', 'ok')
          return next()
        } else {
          // 清除失效Token
          console.log('LXB-Filter [login] - check token', 'removeToken')
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
  //let lxbUrl= 'http://localhost:3030'
  let lxbUrl= process.env.VUE_APP_BASE_LXB_H5
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
    console.log('LXB-Filter [login] - go login', store.getters.getVisitType)
    if (!validator.isEmpty(store.getters.getThirdToken)) {
      // return next({
      //   path: '/login',
      //   query: {
      //     redirect: to.fullPath
      //   }
      // })
      /**跳转lxb登录页面**/
      console.log(lxbUrl + '/login/login.html?openCallback=' + encodeURIComponent(window.location.href))
      window.location.href = lxbUrl + '/login/login.html?openCallback=' + encodeURIComponent(window.location.href)
    }
    // 根据thirdToken进行处理
    console.log('LXB-Filter [login] - do thirdLogin', store.getters.getVisitType)
    $customer.thirdLogin({
      thirdToken: store.getters.getThirdToken
    }).then(res => {
      if (res.result == '0') {
        store.dispatch('setThirdToken', res.thirdToken)
        store.dispatch('setToken', res.token)
        return next()
      } else if (res.result == '1') {
        // return next({
        //   path: '/login',
        //   query: {
        //     redirect: to.fullPath
        //   }
        // })
        /**跳转lxb登录页面**/
        console.log(lxbUrl + '/login/login.html?openCallback=' + encodeURIComponent(window.location.href))
        window.location.href = lxbUrl + '/login/login.html?openCallback=' + encodeURIComponent(window.location.href)
      } else if (res.result == '3') {
        store.dispatch('setThirdToken', res.thirdToken)
      } else if (res.result == '4') {
        store.dispatch('setThirdToken', res.thirdToken)
      } else if (res.result == '6') {
        // return next({
        //   path: '/login',
        //   query: {
        //     redirect: to.fullPath
        //   }
        // })
        /**跳转lxb登录页面**/
        console.log(lxbUrl + '/login/login.html?openCallback=' + encodeURIComponent(window.location.href))
        window.location.href = lxbUrl + '/login/login.html?openCallback=' + encodeURIComponent(window.location.href)
      }
    })
    //没有thirdToken跳登陆
  } else if (visitType == 'alipay') {
    if (!validator.isEmpty(store.getters.getThirdToken)) {
      return next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    // 根据thirdToken进行处理
    $customer.thirdLogin({
      thirdToken: store.getters.getThirdToken
    }).then(res => {
      if (res.result == '0') {
        store.dispatch('setThirdToken', res.thirdToken)
        store.dispatch('setToken', res.token)
        return next()
      } else if (res.result == '1') {
        return next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      } else if (res.result == '3') {
        store.dispatch('setThirdToken', res.thirdToken)
        //跳用户授权页
      } else if (res.result == '4') {
        store.dispatch('setThirdToken', res.thirdToken)
        //手机认证页
      } else if (res.result == '6') {
        return next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      }
    })
  } else {
    // return next({
    //   path: '/login',
    //   query: {
    //     redirect: to.fullPath
    //   }
    // })
    /**跳转lxb登录页面**/
    console.log(lxbUrl + '/login/login.html?openCallback=' + encodeURIComponent(window.location.href))
    window.location.href = lxbUrl + '/login/login.html?openCallback=' + encodeURIComponent(window.location.href)
  }
}

export default {
  doFilter
}