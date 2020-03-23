import Mock from 'mockjs'

const Users = []

Users.push(Mock.mock({
  id: Mock.Random.guid(),
  name: Mock.Random.cname(),
  addr: Mock.mock('@county(true)'),
  birth: Mock.Random.date(),
  sex: Mock.Random.integer(0, 1)
}))

export default {
  /**
   * mock bootstrap
   */
  getProductPageInfo (config) {
    console.log(config)
    return {
      'code': 0,
      'message': '成功',
      'content': {
        'result': '0',
        'resultMessage': '',
        'orderStatus': 'SAVE_SUCCESS',
        'orderContent': {
          'productCode': '3208',
          'productName': '爱心人寿守护神定期寿险',
          'itemCode': 'HRWX_HRP_PS6000',
          'orderPrem': '1100',
          'riskCode': 'AIXINLIFE_00806',
          'riskName': '',
          'riskPrem': '1000',
          'riskAmount': '30000',
          'mult': '1',
          'insurePeriod': '10Y',
          'payType': '12',
          'payIntv': '3Y',
          'cvaliDate': '2019-11-01',
          'productAddInfos': {
            'code': 'AIXINLIFE_00807',
            'name': '附加重疾保费豁免',
            'amount': '',
            'prem': '100',
            'mult': '1',
            'insurePeriod': '20Y',
            'payIntv': '5Y',
            'payType': '12',
            'dutyInfos': null
          },
          'dutyInfos': null
        },
        'appntContent': {
          'name': '姓名',
          'idNo': '678567678956767898',
          'mobile': '13989076789',
          'email': '2786371823@qq.com',
          'address': '联系地址联系地址',
          'zip': '600389',
          'phone': '81230980',
          'provinceCode': '100000',
          'cityCode': '101000',
          'countryCode': '101010',
          'polProvince': '100000',
          'polCity': '101000',
          'remark': '{"height":"100","weight":"50","height":"100","income":"500"}'
        },
        'insuredContent': {
          'name': '姓名',
          'idNo': '678567678956767898',
          'relationToAppnt': '01',
          'mobile': '13989076789',
          'email': '2786371823@qq.com',
          'address': '联系地址联系地址',
          'zip': '600389',
          'phone': '81230980',
          'provinceCode': '100000',
          'cityCode': '101000',
          'countryCode': '101010',
          'polProvince': '100000',
          'polCity': '101000',
          'remark': '{"height":"100","weight":"50","height":"100","income":"500"}'
        },
        'bnfContents': [{
          'name': '姓名',
          'idNo': '678567678956767898',
          'bnfRelationToInsured': '03',
          'mobile': '13989076789',
          'bnfLot': '0.2',
          'bnfType': '0',
          'bnfGrade': '1',
          'remark': '{"height":"100","weight":"50","height":"100","income":"500"}'
        }, {
          'name': '姓名',
          'idNo': '678567678956767898',
          'bnfRelationToInsured': '04',
          'mobile': '13989076789',
          'bnfLot': '0.8',
          'bnfType': '0',
          'bnfGrade': '2',
          'remark': '{"height":"100","weight":"50","height":"100","income":"500"}'
        }],
        'insureTargetInfo': [{
          'insuredAddress': '房屋地址房屋地址'
        }, {
          'insuredAddress': '收件人地址收件人地址'
        }],
        'activityContent': {
          'activityCode': '',
          'recommandCode': '',
          'activityRemark': '',
          'comId': '123',
          'comRemark': ''
        }
      }
    }
  },
  trial (config) {
    console.log(config)
    return {
      code: 0,
      message: '成功',
      content: {}
    }
  },
  getTrial (config) {
    console.log(config)
    return {
      code: 0,
      message: '成功',
      content: {
        'insuredInfo': [
          {
            'bnfLegalFlag': '1',
            'insuredIdNo': '',
            'insuredName': '',
            'relationToAppnt': '00'
          }
        ],
        'orderInfo': {
          'appntIdNo': '6301011**********X',
          'appntMobile': '',
          'appntName': '王天鹏',
          'appntRemark': '{}',
          'cvalidDate': '2019-09-02',
          'exchangeIntegral': '',
          'itemCode': 'HRWX_HRP_PS5098',
          'mult': '1',
          'orderAmount': '766.00',
          'productCode': '2881',
          'productName': '保至60周岁'
        },
        'targetInfo': '[{\'email\':\'\'}]'
      }
    }
  }
}
