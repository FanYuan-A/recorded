const params = [{
    system_type: 'wx',
    domain: process.env.VUE_APP_BASEURL,
    params: {
      type: 'wx',
      system: 'lxb',
      thirdType: process.env.VUE_APP_THIRD_TYPE,
      appId: process.env.VUE_APP_WX_APPID,
      imgBaseUrl: 'https://as.huaruisales.com/resources/mobile/'
    }
  },
  {
    system_type: 'app',
    domain: process.env.VUE_APP_BASEURL,
    params: {
      type: 'app',
      system: 'yq',
      thirdType: '',
      appId: '',
      imgBaseUrl: 'https://as.huaruisales.com/resources/mobile/'
    }
  },
  {
    system_type: 'page',
    domain: process.env.VUE_APP_BASEURL,
    params: {
      type: 'page',
      system: 'yq',
      thirdType: '',
      appId: '',
      imgBaseUrl: 'https://as.huaruisales.com/resources/mobile/'
    }
  }



]

export default {
  params
}