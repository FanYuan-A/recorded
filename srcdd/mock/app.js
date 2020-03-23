import {
    Toast
} from 'mand-mobile'
import store from '@/store'

function getToken (params) {
    console.log(params)
    let t = Math.random()
    setTimeout(() => {
        eval(params.dataObject.jsFunction + '(' + t + ')')
    }, 500)
}

function jumpValue (params) {
    console.log(params)
    Toast.info(params.dataObject.pageCode)
}

function naviInit (params) {
    console.log(params)
    setTimeout(() => {
        eval(params.dataObject.setFunction.jsFunction + '("标题栏设置成功")')
    }, 500)
}

// function callApp (params) {
//     eval(JSON.parse(params).functionName + '(' + params + ')')
// }

function doAppMock () {
    let appType = store.getters.getAppType
    if (appType === 'ios') {
        window.JSonString = (params) => {
            // callApp(params)
            console.log('调用成功：入参' + params)
        }
    } else if (appType === 'android') {
        window.jsObj = {
            'jsCallAndroid': (params) => {
                // callApp(params)
                console.log('调用成功，入参：' + params)
            }
        }
    }
}
export default {
    doAppMock,
    naviInit,
    jumpValue,
    getToken
}