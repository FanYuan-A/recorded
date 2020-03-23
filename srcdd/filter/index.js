import third from './third'
import thirdCallback from './thirdCallback'
import login from './login'
import wx from './weixin'
import common from './common'
import silentLogin from './silentLogin'

function doFilters () {
  common.doFilter()
  third.doFilter()
  thirdCallback.doFilter()
  login.doFilter()
  wx.doFilter()
  // silentLogin.doFilter()
  //customer.doFilter()
}

export default {
  doFilters
}