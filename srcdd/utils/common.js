import validator from '@/utils/validator'
import store from '@/store'
import $wx from '@/utils/weixin'
export default {
  getUserAgentType () {
    let ua = navigator.userAgent.toLowerCase()
    console.log(navigator.userAgent)

    if (ua.indexOf('app_ios') != -1) {
      return 'ios'
    } else if (ua.indexOf('app_android') != -1) {
      return 'android'
    } else if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return 'wx'
    } else if (ua.match(/AlipayClient/i) == 'alipayclient') {
      return 'alipay'
    } else {
      return 'page'
    }
  },
  getDomain () {
    return window.location.host
  },
  getUrlCode () {
    // 截取url中的code方法
    var url = window.location.search
    this.winUrl = url
    var theRequest = new Object()
    if (url.indexOf('?') != -1) {
      var str = url.substr(1)
      var strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
      }
    }
    return theRequest
  },
  formatDate (date, fmt) {
    /**
     * date:需要格式化的日期Date()类型
     * fmt：日期格式 yyyy-MM-dd
     * @param  {[Date,str]} y [description]
     * @return {[type]}   [description]
     */
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
        )
      }
    }
    return fmt
  },
  formatNumber (number, decimals, dec_point, thousands_sep) {
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
      sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
      dec = typeof dec_point === 'undefined' ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
        let k = Math.pow(10, prec)
        return '' + Math.ceil(n * k) / k
      }

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    let re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2')
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
  },
  getAgeByBirthday (strBirthday) {
    /**
     *参数strBirthday已经是正确格式的2017-12-12这样的日期字符串
     */
    let returnAge = null
    let strBirthdayArr = strBirthday.split('-')
    let birthYear = strBirthdayArr[0]
    let birthMonth = strBirthdayArr[1]
    let birthDay = strBirthdayArr[2]

    let d = new Date()
    let nowYear = d.getFullYear()
    let nowMonth = d.getMonth() + 1
    let nowDay = d.getDate()

    if (nowYear == birthYear) {
      returnAge = 0 //同年 则为0岁
    } else {
      let ageDiff = nowYear - birthYear //年之差
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          let dayDiff = nowDay - birthDay //日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1
          } else {
            returnAge = ageDiff
          }
        } else {
          let monthDiff = nowMonth - birthMonth //月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1
          } else {
            returnAge = ageDiff
          }
        }
      } else {
        returnAge = -1 //返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge //返回周岁年龄
  },
  /**
   * @param idCard
   */
  getBirthdayByIdNo (idCard) {
    let birthday = ''
    if (idCard != null && idCard != '') {
      if (idCard.length == 15) {
        birthday = '19' + idCard.slice(6, 12)
      } else if (idCard.length == 18) {
        birthday = idCard.slice(6, 14)
      }
      birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
      //通过正则表达式来指定输出格式为:1990-01-01
    }
    return birthday
  },
  /**
   * @param idCard
   * '0' 男
   * '1' 女
   */
  getSexByBirthday (idCard) {
    let sexStr = ''
    if (parseInt(idCard.slice(-2, -1)) % 2 == 1) {
      sexStr = '0'
    } else {
      sexStr = '1'
    }
    return sexStr
  },
  setSessionStore (key, value) {
    let system = store.getters.getSystem
    let type = store.getters.getType
    window.sessionStorage.setItem(
      system + '_' + type + '_redirect_' + key,
      JSON.stringify(value)
    )
  },
  getSessionStore (key) {
    let system = store.getters.getSystem
    let type = store.getters.getType
    let sessionStoreObj = window.sessionStorage.getItem(
      system + '_' + type + '_redirect_' + key
    )
    return validator.isEmpty(sessionStoreObj)
      ? JSON.parse(sessionStoreObj)
      : null
  },
  removeSessionStore (key) {
    let system = store.getters.getSystem
    let type = store.getters.getType
    window.sessionStorage.removeItem(system + '_' + type + '_redirect_' + key)
  },
  setLocalStore (key, value) {
    let system = store.getters.getSystem
    let type = store.getters.getType
    window.localStorage.setItem(
      system + '_' + type + '_local_' + key,
      JSON.stringify(value)
    )
  },
  getLocalStore (key) {
    let system = store.getters.getSystem
    let type = store.getters.getType
    let localStoreObj = window.localStorage.getItem(
      system + '_' + type + '_local_' + key
    )
    return validator.isEmpty(localStoreObj) ? JSON.parse(localStoreObj) : null
  },
  removeLocalStore (key) {
    let system = store.getters.getSystem
    let type = store.getters.getType
    window.localStorage.removeItem(system + '_' + type + '_local_' + key)
  },
  //全局遮罩方法
  openGlobalMask () {
    //打开遮罩
    store.commit('GLOBALMASK_OPEN')
  },
  closeGlobalMask () {
    //关闭遮罩
    store.commit('GLOBALMASK_CLOSE')
  },
  //设置title
  setTitle (title) {
    /* eslint-disable */
    Vue.nextTick(function () {
      // DOM 更新了
      window.document.title = title || ''
      store.commit('SET_TITLE', { title })
    })
  },
  /**
   * 根据年龄和年龄单位计算日期 年龄单位默认岁 年龄默认0
   * @param {*} age 年龄
   * @param {*} ageFlag 年龄单位  目前只支持岁和天 根据后期需要可添加
   */
  // getBirthdayByAge (age = 0, ageFlag = 'A') {
  //   let date = new Date()
  //   let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  //   let y = date.getFullYear()
  //   let m = date.getMonth()
  //   let d = date.getDate()

  //   if (validator.isEmpty(age)) {
  //     switch (ageFlag) {
  //       case 'A': //岁
  //         y = y - (age - 0) - 1
  //         d = d + 1
  //         if (((y % 4) == 0) && ((y % 100) != 0) || ((y % 400) == 0)) {
  //           //闰年
  //           days[1] = 29
  //         }
  //         if (d > days[m - 1]) {
  //           m = m + 1
  //           d = 1
  //           if (m > 12) {
  //             y = y + 1
  //             m = 0
  //             d = 1
  //           }
  //         }
  //         break
  //       case 'D': //天
  //         date.setTime(date.getTime() - ((age - 0) * 24 * 3600 * 1000))
  //         y = date.getFullYear()
  //         m = date.getMonth()
  //         d = date.getDate()
  //         break
  //       case 'M': //月
  //         m = m - (age - 0)
  //         break
  //       case 'Y': //年
  //         y = y - (age - 0) - 1
  //         d = d + 1
  //         if (((y % 4) == 0) && ((y % 100) != 0) || ((y % 400) == 0)) {
  //           //闰年
  //           days[1] = 29
  //         }
  //         if (d > days[m - 1]) {
  //           m = m + 1
  //           d = 1
  //           if (m > 12) {
  //             y = y + 1
  //             m = 0
  //             d = 1
  //           }
  //         }
  //         break
  //     }
  //   }
  //   date.setFullYear(y)
  //   date.setMonth(m)
  //   date.setDate(d)
  //   return date
  // },
  getBirthdayByAge (startNum = 0, startFlag = 'A', endNum = 0, endFlag = 'A') {
    let minDate = null
    let maxDate = null
    let date = new Date()
    switch (startFlag) {
      case 'A':
        date = new Date()
        maxDate = date.setFullYear((date.getFullYear() - (startNum - 0)))
        maxDate = new Date(maxDate).setDate((new Date(maxDate).getDate()))
        break
      case 'Y':
        date = new Date()
        maxDate = date.setFullYear((date.getFullYear() - (startNum - 0)))
        maxDate = new Date(maxDate).setDate((new Date(maxDate).getDate()))
        break
      case 'D': //天
        date = new Date()
        maxDate = date.setTime(date.getTime() - ((startNum - 0) * 24 * 3600 * 1000))
        break
      case 'M': //月
        date = new Date()
        maxDate = date.setMonth(date.getMonth() - (startNum - 0))
        break
    }
    switch (endFlag) {
      case 'Y':
        date = new Date()
        minDate = date.setFullYear((date.getFullYear() - (endNum - 0 + 1)))
        minDate = new Date(minDate).setDate((new Date(minDate).getDate() + 1))
        break
      case 'A':
        date = new Date()
        minDate = date.setFullYear((date.getFullYear() - (endNum - 0 + 1)))
        minDate = new Date(minDate).setDate((new Date(minDate).getDate() + 1))
        break
      case 'D': //天
        date = new Date()
        minDate = date.setTime(date.getTime() - ((endNum - 0) * 24 * 3600 * 1000))
        break
      case 'M': //月
        date = new Date()
        minDate = date.setMonth(date.getMonth() - (endNum - 0))
        break
    }
    return {
      minDate: new Date(minDate), maxDate: new Date(maxDate)
    }
  },
  getAgeDayByBirthday (birthday) {
    if (validator.isEmpty(birthday)) {
      return parseInt(
        (new Date().getTime() - new Date(birthday).setHours(0)) / 1000 / 3600 / 24
      )
    } else {
      return 0
    }
  },
  /**
   * 微信通用分享方法
   * @param {} shareInfos
   * @param {*} comid
   */
  wxShare (shareInfos, comid, shareUrl) {
    let params = {
      title: shareInfos[0].title,
      desc: shareInfos[0].desc,
      link: shareInfos[0].shareUrl || window.location.href,
      imgUrl: shareInfos[0].imgUrl
    }
    if (validator.isEmpty(comid)) {
      for (let i = 0; i < shareInfos.length; i++) {
        let share = shareInfos[i]
        if (share.channel == comid) {
          params.title = share.title
          params.desc = share.desc
          params.link = share.shareUrl || window.location.href
          params.imgUrl = share.imgUrl
          break
        }
      }
    }
    validator.isEmpty(shareUrl) ? params.link = shareUrl : null
    $wx.share(params)
  },
  getItemCodeByUrl (param) {
    if (param.split('_').length > 3) {
      let index = param.indexOf('_')
      return param.indexOf('_') > 0 ? param.substring(index + 1).toUpperCase() : ''
    } else {
      return param
    }
  },
  /**
   * 通过经纬度获取地址
   * lat:纬度
   * lng:经度
   * return Promise {
   *          resultMsg,
*            provinceCode: '',
            provinceLabel: '',
            cityCode: '',
            cityLabel: '',
            countryCode: '',
            countryLabel: ''
   *          }
   */
  getAddress (lat, lng) {
    return new Promise((resolve, reject) => {
      if (!(validator.isEmpty(lat) && validator.isEmpty(lng))) {
        reject({
          resultMsg: '经纬度不可为空'
        })
      }
      let geocoder = null
      //地址和经纬度之间进行转换服务
      geocoder = new AMap.Geocoder()
      let lnglat = []
      lnglat.push(lng)
      lnglat.push(lat)
      geocoder.getAddress(lnglat, function (status, result) {
        if (status === 'complete' && result.regeocode) {
          resolve({
            provinceCode: result.regeocode.addressComponent.adcode.slice(0, 2) + '0000',
            provinceLabel: result.regeocode.addressComponent.province,
            cityCode: result.regeocode.addressComponent.adcode.slice(0, 4) + '00',
            cityLabel: result.regeocode.addressComponent.city,
            countryCode: result.regeocode.addressComponent.adcode,
            countryLabel: result.regeocode.addressComponent.district
          })
        } else {
          reject({
            resultMsg: ''
          })
        }
      })
    })
  }
  , setRedirectUrl (url) {
    let type = store.getters.getType
    let system = store.getters.getSystem
    window.sessionStorage.setItem(system + '_' + type + '_redirect_url', url)
  }
}
export { validator }
