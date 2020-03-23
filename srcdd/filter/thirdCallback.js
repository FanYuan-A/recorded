import router from '@/router/'
import store from '@/store'
import $customer from '@/api/customer'
import { validator } from '@/utils/common'
import common from '@/utils/common'
function doFilter () {
  router.beforeEach((to, from, next) => {
    console.log(from)
    console.log(to)

    let thirType = store.getters.getThirdType
    console.log('LXB-Filter thirdCallback.js [thirType]', thirType)
    console.log('LXB-Filter thirdCallback.js [thirdAuth]', to.meta.thirdAuth)
    //非第三方环境不处
    if (!validator.isEmpty(thirType)) {
      return next()
    }
    if (!to.meta.thirdAuth) {
      return next()
    }
    let third_redirect_code = common.getUrlCode().code || common.getUrlCode().auth_code
    console.log('LXB-Filter thirdCallback.js [third_redirect_code]', third_redirect_code)
    if (!validator.isEmpty(third_redirect_code)) {
      return next()
    }
    // 根据不同的thirdType和后端交互，创建thirdToken
    $customer.thirdAuth({
      scope: to.meta.thirdScopeType || '',
      thirdType: thirType,
      code: third_redirect_code
    }).then((res1) => {
      if (validator.isEmpty(res1.thirdToken)) {
        store.dispatch('setThirdToken', res1.thirdToken)
        if ((!validator.isEmpty(store.getters.getNickName)) && (!validator.isEmpty(store.getters.getImgUrl))) {
          $customer.thirdInfo({
            thirdToken: store.getters.getThirdToken
          }).then((res2) => {
            if (validator.isEmpty(res2.thirdUserName) || validator.isEmpty(res2.thirdImageUrl)) {
              store.dispatch('setThirdInfo', { nickName: res2.thirdUserName, imgUrl: res2.thirdImageUrl })
            }
            return next()
          })
        } else {
          return next()
        }
      }
      return next()
    })
  })
}

export default { doFilter }