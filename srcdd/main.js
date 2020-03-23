import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filter from './filter'
import app from './utils/app'
import Mock from './mock'
// import appMock from './mock/app'//用于测试app方法,测试完可以注释此行
import 'babel-polyfill'
import 'normalize.css'
import '@/assets/css/global.less'
import _ from 'lodash'
import FastClick from 'fastclick'
// import VueWechatTitle from 'vue-wechat-title'
/* eslint-disable */
Vue.prototype._ = _

FastClick.attach(document.body)
Vue.config.productionTip = false

//vconsole插件
if (process.env.VUE_APP_USE_VCONSOLE === 'true') {
  /* eslint-disable no-unused-vars */
  var vConsole = require('vconsole')
  /* eslint-disable no-unused-vars */
  let vconsole = new vConsole()
}

// 初始化浏览器类型，设置系统、平台类型参数
store.dispatch('initSystemType')

// 执行全局初始化（APP等）
Vue.prototype.$app = app
app.init()
// 全局过滤处理
filter.doFilters()

// 是否使用MOCK接口
if ('true' === process.env.VUE_APP_USE_MOCK) {
  console.log('mock' + process.env.VUE_APP_USE_MOCK)
  Mock.bootstrap()
}
//解决ios移动端input调软键盘问题
FastClick.prototype.focus = function (targetElement) {
  let length;
  let isIphone = navigator.userAgent.indexOf("iPhone") != -1;
  if (
    isIphone &&
    targetElement.setSelectionRange &&
    targetElement.type.indexOf("date") !== 0 &&
    targetElement.type !== "time" &&
    targetElement.type !== "month" &&
    targetElement.type !== "email"
  ) {
    length = targetElement.value.length;
    targetElement.setSelectionRange(length, length);
    /*修复bug ios 11.3不弹出键盘，这里加上聚焦代码，让其强制聚焦弹出键盘*/
    targetElement.focus();
  } else {
    targetElement.focus();
  }
}
Vue.use(require('vue-wechat-title'))
// appMock.doAppMock()//用于测试app方法,测试完可以注释此行
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
