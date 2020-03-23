import router from '@/router'
import commonUtils from '@/utils/common'
import store from '@/store'
import $customer from '@/api/customer'
import { validator } from '@/utils/common'
function doFilter () {
  router.beforeEach((to, from, next) => {
    commonUtils.openGlobalMask()//打开全局遮罩
    // gd_map()
    // setTimeout(() => {
    //   commonUtils.closeGlobalMask()
    // }, 1000)
    next()
  })
  router.afterEach((to, from) => {
    commonUtils.setTitle(to.meta.title)//为每个页面单独设置title
    // setTimeout(() => {
    //   baidu_tj(to, from)
    //   tj_99click(to, from)
    // }, 20)

  })
}
// /**
//  * 百度统计
//  */
// function baidu_tj (to, from) {
//   var _hmt = _hmt || []
//   //每次执行前，先移除上次插入的代码
//   document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove()
//   var hm = document.createElement('script')
//   hm.src = 'https://hm.baidu.com/hm.js?' + process.env.VUE_APP_BAIDU_TJ_CODE
//   hm.id = 'baidu_tj'
//   var s = document.getElementsByTagName('script')[0]
//   s.parentNode.insertBefore(hm, s)
// }
// /***
// * 99Click统计
// * 调用接口，通过token获取customerId
// * 将获取到的customerId传给回调函数 ，进行后续的code统计
// */
// function tj_99click (to, from) {
//   var token = store.getters.getToken
//   if (token) {
//     $customer.accountCheck({
//       token: store.getters.getToken,
//     }).then(res => {
//       if (validator.isEmpty(res.token)) {
//         store.dispatch('setToken', res.token)
//         //调用接口获取customerID
//         $customer.accountInfo({ isUserId: 1 }).then((content) => {
//           window._ozuid = content && content.userId ? content.userId : ''
//           if (window.performance.navigation.type == 1) {
//             console.log('页面被刷新')
//           } else {
//             console.log('首次被加载')
//             //window.__ozfac2 ? window.__ozfac2('') : false
//           }
//         })
//       } else {
//         if (window.performance.navigation.type == 1) {
//           console.log('页面被刷新')
//         } else {
//           console.log('首次被加载')
//           //window.__ozfac2 ? window.__ozfac2('') : false
//         }
//       }
//     })
//   } else {
//     if (window.performance.navigation.type == 1) {
//       console.log('页面被刷新')
//     } else {
//       console.log('首次被加载')
//       //window.__ozfac2 ? window.__ozfac2('') : false
//     }
//   }
// }
// function gd_map () {
//   document.getElementById('gd_map') && document.getElementById('gd_map').remove()
//   var url = 'https://webapi.amap.com/maps?v=1.4.15&key=8731440374969a0479cd2e72770b30b8&plugin=AMap.Geocoder'
//   var jsapi = document.createElement('script')
//   jsapi.charset = 'utf-8'
//   jsapi.src = url
//   jsapi.id = 'gd_map'
//   document.head.appendChild(jsapi)
// }
export default { doFilter }