import wx from 'weixin-js-sdk'
import store from '@/store'
import {
  validator
} from '@/utils/common'
import $customer from '@/api/customer'
let wxSignParams = {
  signUrl: window.location.href.indexOf('?') == -1 ? window.location.href : window.location.href,
  // signUrl: 'http://dat-m.my1000.cn/',
  timestamp: null,
  nonceStr: null,
  signature: null,
  errorCount: 3
}

function init (params) {
  console.log('wxParams_1'+JSON.stringify(params))
  console.log('wxwxSignParams_1'+JSON.stringify(wxSignParams))
  wxSignParams.signUrl = window.location.href.indexOf('?') == -1 ? window.location.href : window.location.href
  console.log('weixin-init-params',params)
  if (validator.isEmpty(store.getters.getType) && store.getters.getType == 'wx') {
    console.log('weixin-before-chImg----wxSignParams.signUrl',wxSignParams.signUrl)
    $customer.chImg({
      shareUrl: wxSignParams.signUrl
    }).then((res) => {
      console.log('weixin-in-chImg')
      wxSignParams.timestamp = res.timestamp
      wxSignParams.nonceStr = res.nonceStr
      wxSignParams.signature = res.signature
      store.dispatch('setSignInfo', { timestamp: wxSignParams.timestamp, nonceStr: wxSignParams.nonceStr, signature: wxSignParams.signature })
      console.log('wxParams_2'+JSON.stringify(params))
      console.log('wxwxSignParams_2'+JSON.stringify(wxSignParams))
      wxConfig(params)
    })
  }
}

function wxConfig (params) {
  console.log('wxParams_3'+JSON.stringify(params))
  console.log('wxwxSignParams_3'+JSON.stringify(wxSignParams))
  console.log('appid'+process.env.VUE_APP_WX_APPID)
  wx.config({
    debug: false,
    appId: store.getters.getThirdAppId,
    timestamp: wxSignParams.timestamp,
    nonceStr: wxSignParams.nonceStr,
    signature: wxSignParams.signature,
    jsApiList: params.apiList
  })
  wx.error((res) => {
    console.log(res)
    if (wxSignParams.errorCount >= 0) {
      wxSignParams.errorCount = wxSignParams.errorCount - 1
      wxSignParams.signUrl = window.location.href.indexOf('?') == -1 ? window.location.href : window.location.href
      init(params)
    }
  })
}
function pay (params) {
  return new Promise((resolve) => {
    wx.ready(() => {
      wx.chooseWXPay({
        timestamp: store.getters.getTimestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: store.getters.getNonceStr, // 支付签名随机串，不长于 32 位
        package: 'prepay_id=' + params.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: params.paySign, // 支付签名

        success: function (res) {
          resolve('success', res)
        },
        cancel: function (res) {
          resolve('cancel', res)
        },
        fail: function (res) {
          resolve('fail', res)
        }
      })
    })
  })
}
function share (params) {
  // params.link = params.link.indexOf('?') == -1 ? params.link : params.link.split('?')[0] + encodeURIComponent('?' + params.link.split('?')[1])
  console.log(params)

  wx.ready(() => {
    store.dispatch('setSignInfo', { timestamp: wxSignParams.timestamp, nonceStr: wxSignParams.nonceStr, signature: wxSignParams.signature })
    // wx.updateAppMessageShareData({
    //   title: params.title, // 分享标题
    //   desc: params.desc, // 分享描述
    //   link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //   imgUrl: params.imgUrl, // 分享图标
    //   success: function (res) {
    //     // 设置成功

    //   }
    // })
    // wx.updateTimelineShareData({
    //   title: params.title, // 分享标题
    //   link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //   imgUrl: params.imgUrl, // 分享图标
    //   success: function (res) {
    //     // 设置成功
    //   }
    // })
    wx.onMenuShareAppMessage({
      title: params.title,
      desc: params.desc,
      link: params.link,
      imgUrl: params.imgUrl,

      trigger: function (res) {
        console.log(res)
      },
      success: function (res) {
        console.log(res)
        if (window._scratchLottery) {
          window._scratchLottery()
        }

      },
      cancel: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
    wx.onMenuShareTimeline({
      title: params.title,
      link: params.link,
      imgUrl: params.imgUrl,

      trigger: function (res) {
        console.log(res)
      },
      success: function (res) {
        console.log(res)
        if (window._scratchLottery) {
          setTimeout(() => { window._scratchLottery() }, 500)
        }
      },
      cancel: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  })
}
function shareAppMessage (params) {
  wx.onMenuShareAppMessage({
    title: params.title,
    desc: params.desc,
    link: params.link,
    imgUrl: params.imgUrl,

    trigger: function (res) {
      console.log(res)
    },
    success: function (res) {
      console.log(res)
    },
    cancel: function (res) {
      console.log(res)
    },
    fail: function (res) {
      console.log(res)
    }
  })
}
function shareTimeline (params) {
  wx.onMenuShareTimeline({
    title: params.title,
    link: params.link,
    imgUrl: params.imgUrl,

    trigger: function (res) {
      console.log(res)
    },
    success: function (res) {
      console.log(res)
    },
    cancel: function (res) {
      console.log(res)
    },
    fail: function (res) {
      console.log(res)
    }
  })
}
function updateTimelineShareData (params) {
  wx.updateTimelineShareData({
    title: params.title, // 分享标题
    link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: params.imgUrl, // 分享图标
    success: function () {
      // 设置成功
    }
  })
}
function updateAppMessageShareData (params) {
  wx.updateAppMessageShareData({
    title: params.title, // 分享标题
    desc: params.desc, // 分享描述
    link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: params.imgUrl, // 分享图标
    success: function () {
      // 设置成功
    }
  })
}
/**
 * 
 * @param {*} type // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
 * 
 * return  Promise  
 *           {
 *          latitude : res.latitude; // 纬度，浮点数，范围为90 ~ -90
            longitude : res.longitude; // 经度，浮点数，范围为180 ~ -180。
            speed : res.speed; // 速度，以米/每秒计
            accuracy : res.accuracy; // 位置精度
            }
 */
function getLocation (type = 'wgs84') {
  return new Promise((resolve) => {
    wx.ready(() => {
      wx.getLocation({
        type: type,
        success: function (res) {
          resolve(res)
        }
      })
    })
  })
}
export default {
  init,
  //微信支付
  pay,
  //微信分享
  share,
  //分享给朋友
  shareAppMessage,
  //分享到朋友圈
  shareTimeline,
  //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
  updateTimelineShareData,
  //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
  updateAppMessageShareData,
  //获取地理位置经纬度
  getLocation
}