import router from '@/router'
import store from '@/store'
import {
  validator
} from '@/utils/common'
import wx from '@/utils/weixin'
export default {
  doFilter () {
    router.beforeEach((to, from, next) => {
      console.log('测试getType'+store.getters.getType)
      if (store.getters.getType == 'wx' &&
        validator.isEmpty(to.meta.wx) &&
        validator.isEmpty(to.meta.wx.sign) &&
        to.meta.wx.sign &&
        validator.isEmpty(to.meta.wx.jsApiList) &&
        validator.isArray(to.meta.wx.jsApiList) &&
        to.meta.wx.jsApiList.length > 0) {
        console.log('微信分享初始化')
        wx.init({
          apiList: to.meta.wx.jsApiList
        })
      }
      return next()
    })
  }
}