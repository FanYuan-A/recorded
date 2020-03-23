import Mock from 'mockjs'

const Users = []

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }))
}

export default {
  getOrderDetail (config) {
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
          'productAddInfos': [{
            'code': 'AIXINLIFE_00807',
            'name': '附加重疾保费豁免',
            'amount': '',
            'prem': '100',
            'mult': '1',
            'insurePeriod': '20Y',
            'payIntv': '5Y',
            'payType': '12',
            'dutyInfos': null
          }],
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
          'remark': '{"height":"100","weight":"50","income":"500"}'
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
          'remark': '{"height":"100","weight":"50","income":"500"}'
        },
        'bnfContents': [{
          'name': '姓名',
          'idNo': '678567678956767898',
          'bnfRelationToInsured': '03',
          'mobile': '13989076789',
          'bnfLot': '0.2',
          'bnfType': '0',
          'bnfGrade': '1',
          'remark': '{"height":"100","weight":"50","income":"500"}'
        }, {
          'name': '姓名',
          'idNo': '678567678956767898',
          'bnfRelationToInsured': '04',
          'mobile': '13989076789',
          'bnfLot': '0.8',
          'bnfType': '0',
          'bnfGrade': '2',
          'remark': '{"height":"100","weight":"50","income":"500"}'
        }],
        'insureTargetInfo': '[{"insuredAddress":"房屋地址房屋地址"},{"insuredAddress":"收件人地址收件人地址"}]',
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
  /**
   * mock bootstrap
   */
  getProductInfo (config) {
    console.log(config)
    return {
      'code': 0,
      'message': '成功',
      'content': {
        'result': '0',
        'resultMessage': '',
        'saleContent': {
          'itemCode': 'HRWX_HRP_PS6000',
          'itemStatus': '01',
          'saleStartTime': '',
          'saleEndTime': '',
          'itemDesc': '',
          'defaultProductCode': '3208',
          'defaultPrice': '66.00',
          'defaultAmt': '',
          'priceFlag': '2',
          'defaultMaxMult': '1',
          'stopSaleDesc': '',
          'protectPlanContents': null
        },
        'displayContent': {
          'productImageUrl': 'http://cdn1.huaruisales.com/mobsite/resources/HRWX_HRP_PS6000/PS6000_banner1.jpg',
          'productName': '爱心人寿守护神定期寿险',
          'subProductName': '',
          'organizationName': '爱心人寿保险股份有限公司',
          'salesMult': '0',
          'productReadingDesc': '我已确认接受<a class="showClause" href="#" target="_self" external="" textvalue="《保险条款》">《保险条款》</a>、<a class="showClause" href="#" target="_self" external="">《投保须知》等（点击查看详细）</a>的全部内容，了解并接受包括有关责任条款及免责条款，承保地域限制等约定。',
          'productClause': [
            {
              'clauseName': '《爱心人寿守护神定期寿险条款》',
              'clauseLink': '//cdn1.huaruisales.com/mobsite/resources/HRWX_HRP_PS6000/PS6000_bxtk.pdf'
            },
            {
              'clauseName': '《爱心人寿附加守护神豁免重大疾病保险条款》',
              'clauseLink': '//cdn1.huaruisales.com/mobsite/resources/HRWX_HRP_PS6000/PS6000_fjbxtk.pdf'
            },
            {
              'clauseName': '《守护神定期寿险费率表》',
              'clauseLink': '//cdn1.huaruisales.com/mobsite/resources/HRWX_HRP_PS6000/PS6000_flb.pdf'
            },
            {
              'clauseName': '《附加守护神豁免重大疾病保险费率表》',
              'clauseLink': '//cdn1.huaruisales.com/mobsite/resources/HRWX_HRP_PS6000/PS6000_fjflb.pdf'
            },
            {
              'clauseName': '《投保须知》',
              'clauseLink': '//cdn1.huaruisales.com/mobsite/resources/HRWX_HRP_PS6000/PS6000_tbxz.pdf'
            },
            {
              'clauseName': '《健康告知》',
              'clauseLink': '//cdn1.huaruisales.com/mobsite/resources/HRWX_HRP_PS6000/PS6000_jkgz.html'
            },
            {
              'clauseName': '《投保人声明书》',
              'clauseLink': '//cdn1.huaruisales.com/mobsite/resources/HRWX_HRP_PS6000/PS6000_tbrsm.pdf'
            },
            {
              'clauseName': '《人身保险投保提示书》',
              'clauseLink': '//cdn1.huaruisales.com/mobsite/resources/HRWX_HRP_PS6000/PS6000_tbtss.pdf'
            },
            {
              'clauseName': '《客户告知书》',
              'clauseLink': '//cdn1.huaruisales.com/mobsite/resources/HRWX_HRP/khgzs/index.html'
            }
          ],
          'showAmount': null,
          'insuranceNotes': [
            {
              'name': '保障时间',
              'content': '1年'
            },
            {
              'name': '适用人群',
              'content': '18-55周岁（含）'
            },
            {
              'name': '犹豫期',
              'content': '15天'
            },
            {
              'name': '交费年限',
              'content': '趸交/5年/10年/20年/30年'
            }
          ],
          'insuranceRespons': [
            {
              'name': '身故/全残保险金',
              'content': '最高<span class="duty_label2">200万</span>',
              'desc': '被保险人身故/全残，本合同效力终止，保险公司按身故/全残时本合同的基本保险金额给付身故保险金。本合同的身故保险金或全残保险金的给付以一次为限。'
            },
            {
              'name': '附加重疾保费豁免',
              'content': '豁免后期未交保费',
              'desc': ''
            }
          ],
          'displayTabContents': [
            {
              'name': '保障详情',
              'content': '<div class="buttons-tab"><a class="tab-link tab-btn-info active button" href="#tab1">产品特色</a><a class="tab-link tab-btn-info button" href="#tab2">保障详情</a><a class="tab-link tab-btn-info button" href="#tab3">常见问题</a></div><div class="content-block" style="margin: 0px; padding: 0px; width: 100%;"><div class="tabs"><div class="tab-content" id="tab1"><div><img style="width: 100%;" src="https://cdn1.huaruisales.com/mobsite/resources/HRWX_HRP_PS6000/201908221401199491.png"/></div></div><div class="tab-content" id="tab2"><div><img style="width: 100%;" src="https://cdn1.huaruisales.com/mobsite/resources/HRWX_HRP_PS6000/201908221401359948.png"/></div><div class="content-block-box"><div class="content-block-title font-16" style="color: rgb(10, 141, 223); font-weight: bold;">销售区域</div><div class="list-block"><ul style="margin: 0;" class=" list-paddingleft-2"><li class="item-content h5-item-content"><div class="item-media"></div><div class="item-inner"><div class="item-title font-14" style="white-space: inherit;">本产品由《爱心人寿守护神定期寿险条款》条款编码为：爱心人寿[2019]定期寿险001号和《爱心人寿附加守护神豁免重大疾病保险条款》条款编码为：爱心人寿[2019]疾病保险002号组合而成。<span style="color:red">本产品由爱心人寿保险股份有限公司承保，由华瑞保险销售有限公司代理销售，本平台仅提供技术服务支持。</span>其中寿险可全国销售，附加豁免重疾险仅限北京、天津、河北销售。非以上地区的客户投保，可能存在后续服务时效有所延迟等问题。</div></div></li></ul></div></div></div></div></div>'
            },
            {
              'name': '理赔服务',
              'content': '<div class="content-block-box"><div class="content-block-title font-16" style="color: rgb(10, 141, 223); font-weight: bold;">理赔流程</div><div class="list-block"><ul class=" list-paddingleft-2"><li class="item-content h5-item-content"><div class="item-media"></div><div class="item-inner"><div class="item-title font-14" style="white-space: inherit;">保单承保后，后续保全、理赔等相关事务均可致电爱心人寿保险股份有限公司公司全国统一客服热线10109520。<br/><img style="width: 100%;" src="https://cdn1.huaruisales.com/mobsite/resources/HRWX_HRP_PS6000/201908131058484457.png"/></div></div></li></ul></div></div>'
            },
            {
              'name': '常见问题',
              'content': '<div class="tab-content" id="tab3"><div><img style="width: 100%;" src="https://cdn1.huaruisales.com/mobsite/resources/HRWX_HRP_PS6000/201908301603015658.jpg"/></div></div>'
            }
          ]
        },
        'premTrailContent': {
          'appntFields': [],
          'insuredFields': [
            {
              'code': 'insuredSex',
              'fieldItems': [
                {
                  'value': '0',
                  'valueNum': null,
                  'valueFlag': null,
                  'valueLabel': '男',
                  'start': null,
                  'startNum': null,
                  'startFlag': null,
                  'startLabel': null,
                  'end': null,
                  'endNum': null,
                  'endFlag': null,
                  'endLabel': null,
                  'increase': null,
                  'rule': null
                },
                {
                  'value': '1',
                  'valueNum': null,
                  'valueFlag': null,
                  'valueLabel': '女',
                  'start': null,
                  'startNum': null,
                  'startFlag': null,
                  'startLabel': null,
                  'end': null,
                  'endNum': null,
                  'endFlag': null,
                  'endLabel': null,
                  'increase': null,
                  'rule': null
                }
              ],
              'desc': null
            },
            {
              'code': 'insuredAge',
              'fieldItems': [
                {
                  'value': null,
                  'valueNum': null,
                  'valueFlag': null,
                  'valueLabel': null,
                  'start': '18A',
                  'startNum': '18',
                  'startFlag': 'A',
                  'startLabel': '18岁',
                  'end': '55A',
                  'endNum': '55',
                  'endFlag': 'A',
                  'endLabel': '55岁',
                  'increase': null,
                  'rule': ''
                }
              ],
              'desc': null
            },
            {
              'code': 'insuredArea',
              'fieldItems': [
                {
                  'value': 'AIXINLIFE',
                  'valueNum': null,
                  'valueFlag': null,
                  'valueLabel': '爱心人寿',
                  'start': null,
                  'startNum': null,
                  'startFlag': null,
                  'startLabel': null,
                  'end': null,
                  'endNum': null,
                  'endFlag': null,
                  'endLabel': null,
                  'increase': null,
                  'rule': ''
                }
              ],
              'desc': null
            }
          ],
          'insurancePlans': [
            {
              'productCode': '3208',
              'name': null,
              'riskCode': 'AIXINLIFE_00806',
              'appAgeFlag': '1',
              'cvaliDateFlag': '1',
              'cvaliDateField': null,
              'riskFields': [
                {
                  'code': 'amountOptions',
                  'fieldItems': [
                    {
                      'value': '300000',
                      'valueNum': null,
                      'valueFlag': null,
                      'valueLabel': '30万',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': ''
                    },
                    {
                      'value': '500000',
                      'valueNum': null,
                      'valueFlag': null,
                      'valueLabel': '50万',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': '(insuredAge>=18&&insuredAge<=40&&[\'120100\',\'320100\',\'500100\',\'330100\',\'330200\',\'320500\',\'110100\',\'310100\',\'430100\',\'130100\',\'140100\',\'150100\',\'210100\',\'220100\',\'230100\',\'340100\',\'350100\',\'360100\',\'370100\',\'410100\',\'420100\',\'430100\',\'450100\',\'460100\',\'510100\',\'520100\',\'530100\',\'540100\',\'610100\',\'620100\',\'630100\',\'640100\',\'650100\'].includes(cityCode)==false)||[\'120100\',\'320100\',\'500100\',\'330100\',\'330200\',\'320500\',\'110100\',\'310100\',\'430100\',\'130100\',\'140100\',\'150100\',\'210100\',\'220100\',\'230100\',\'340100\',\'350100\',\'360100\',\'370100\',\'410100\',\'420100\',\'430100\',\'450100\',\'460100\',\'510100\',\'520100\',\'530100\',\'540100\',\'610100\',\'620100\',\'630100\',\'640100\',\'650100\'].includes(cityCode)'
                    },
                    {
                      'value': '800000',
                      'valueNum': null,
                      'valueFlag': null,
                      'valueLabel': '80万',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': '(insuredAge>=18&&insuredAge<=40&&[\'120100\',\'320100\',\'500100\',\'330100\',\'330200\',\'320500\',\'110100\',\'310100\',\'430100\',\'130100\',\'140100\',\'150100\',\'210100\',\'220100\',\'230100\',\'340100\',\'350100\',\'360100\',\'370100\',\'410100\',\'420100\',\'430100\',\'450100\',\'460100\',\'510100\',\'520100\',\'530100\',\'540100\',\'610100\',\'620100\',\'630100\',\'640100\',\'650100\'].includes(cityCode)==false)||[\'120100\',\'320100\',\'500100\',\'330100\',\'330200\',\'320500\',\'110100\',\'310100\',\'430100\',\'130100\',\'140100\',\'150100\',\'210100\',\'220100\',\'230100\',\'340100\',\'350100\',\'360100\',\'370100\',\'410100\',\'420100\',\'430100\',\'450100\',\'460100\',\'510100\',\'520100\',\'530100\',\'540100\',\'610100\',\'620100\',\'630100\',\'640100\',\'650100\'].includes(cityCode)'
                    },
                    {
                      'value': '1000000',
                      'valueNum': null,
                      'valueFlag': null,
                      'valueLabel': '100万',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': '(insuredAge>=18&&insuredAge<=40&&[\'120100\',\'320100\',\'500100\',\'330100\',\'330200\',\'320500\',\'110100\',\'310100\',\'430100\',\'130100\',\'140100\',\'150100\',\'210100\',\'220100\',\'230100\',\'340100\',\'350100\',\'360100\',\'370100\',\'410100\',\'420100\',\'430100\',\'450100\',\'460100\',\'510100\',\'520100\',\'530100\',\'540100\',\'610100\',\'620100\',\'630100\',\'640100\',\'650100\'].includes(cityCode)==false)||(insuredAge>=18&&insuredAge<=40&&[\'130100\',\'140100\',\'150100\',\'210100\',\'220100\',\'230100\',\'340100\',\'350100\',\'360100\',\'370100\',\'410100\',\'420100\',\'430100\',\'450100\',\'460100\',\'510100\',\'520100\',\'530100\',\'540100\',\'610100\',\'620100\',\'630100\',\'640100\',\'650100\'].includes(cityCode))||[\'320100\',\'330100\',\'440100\',\'110100\',\'120100\',\'310100\',\'500100\',\'320500\',\'330200\',\'440300\'].includes(cityCode)'
                    },
                    {
                      'value': '1200000',
                      'valueNum': null,
                      'valueFlag': null,
                      'valueLabel': '120万',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': '(insuredAge>=18&&insuredAge<=40&&[\'130100\',\'140100\',\'150100\',\'210100\',\'220100\',\'230100\',\'340100\',\'350100\',\'360100\',\'370100\',\'410100\',\'420100\',\'430100\',\'450100\',\'460100\',\'510100\',\'520100\',\'530100\',\'540100\',\'610100\',\'620100\',\'630100\',\'640100\',\'650100\'].includes(cityCode))||[\'320100\',\'330100\',\'440100\',\'110100\',\'120100\',\'310100\',\'500100\',\'320500\',\'330200\',\'440300\'].includes(cityCode)'
                    },
                    {
                      'value': '1500000',
                      'valueNum': null,
                      'valueFlag': null,
                      'valueLabel': '150万',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': '(insuredAge>=18&&insuredAge<=40&&[\'130100\',\'140100\',\'150100\',\'210100\',\'220100\',\'230100\',\'340100\',\'350100\',\'360100\',\'370100\',\'410100\',\'420100\',\'430100\',\'450100\',\'460100\',\'510100\',\'520100\',\'530100\',\'540100\',\'610100\',\'620100\',\'630100\',\'640100\',\'650100\'].includes(cityCode))||insuredAge>=18&&insuredAge<=40&&[\'320100\',\'330100\',\'440100\',\'110100\',\'120100\',\'310100\',\'500100\',\'320500\',\'330200\',\'440300\'].includes(cityCode)'
                    },
                    {
                      'value': '1800000',
                      'valueNum': null,
                      'valueFlag': null,
                      'valueLabel': '180万',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': 'insuredAge>=18&&insuredAge<=40&&[\'320100\',\'330100\',\'440100\',\'110100\',\'120100\',\'310100\',\'500100\',\'320500\',\'330200\',\'440300\'].includes(cityCode)'
                    },
                    {
                      'value': '2000000',
                      'valueNum': null,
                      'valueFlag': null,
                      'valueLabel': '200万',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': 'insuredAge>=18&&insuredAge<=40&&[\'320100\',\'330100\',\'440100\',\'110100\',\'120100\',\'310100\',\'500100\',\'320500\',\'330200\',\'440300\'].includes(cityCode)'
                    }
                  ],
                  'desc': null
                },
                {
                  'code': 'insuredPeriod',
                  'fieldItems': [
                    {
                      'value': '20Y',
                      'valueNum': '20',
                      'valueFlag': 'Y',
                      'valueLabel': '20年',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': ''
                    },
                    {
                      'value': '30Y',
                      'valueNum': '30',
                      'valueFlag': 'Y',
                      'valueLabel': '30年',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': ''
                    },
                    {
                      'value': '60A',
                      'valueNum': '60',
                      'valueFlag': 'A',
                      'valueLabel': '60岁',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': ''
                    },
                    {
                      'value': '65A',
                      'valueNum': '65',
                      'valueFlag': 'A',
                      'valueLabel': '65岁',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': ''
                    },
                    {
                      'value': '70A',
                      'valueNum': '70',
                      'valueFlag': 'A',
                      'valueLabel': '70岁',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': ''
                    }
                  ],
                  'desc': null
                },
                {
                  'code': 'payIntv',
                  'fieldItems': [
                    {
                      'value': '12',
                      'valueNum': null,
                      'valueFlag': null,
                      'valueLabel': '年交',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': ''
                    },
                    {
                      'value': '0',
                      'valueNum': null,
                      'valueFlag': null,
                      'valueLabel': '一次交',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': ''
                    }
                  ],
                  'desc': null
                },
                {
                  'code': 'payYear',
                  'fieldItems': [
                    {
                      'value': '5Y',
                      'valueNum': '5',
                      'valueFlag': 'Y',
                      'valueLabel': '5年',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': '(insuredPeriodFlag==\'Y\'&&insuredPeriod>=5)||(insuredPeriodFlag==\'A\'&&insuredPeriod==60&&insuredAge<=55)||(insuredPeriodFlag==\'A\'&&insuredPeriod==65&&insuredAge<=60)||(insuredPeriodFlag==\'A\'&&insuredPeriod==70&&insuredAge<=65)'
                    },
                    {
                      'value': '10Y',
                      'valueNum': '10',
                      'valueFlag': 'Y',
                      'valueLabel': '10年',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': '(insuredPeriodFlag==\'Y\'&&insuredPeriod>=10)||(insuredPeriodFlag==\'A\'&&insuredPeriod==60&&insuredAge<=50)||(insuredPeriodFlag==\'A\'&&insuredPeriod==65&&insuredAge<=55)||(insuredPeriodFlag==\'A\'&&insuredPeriod==70&&insuredAge<=60)'
                    },
                    {
                      'value': '20Y',
                      'valueNum': '20',
                      'valueFlag': 'Y',
                      'valueLabel': '20年',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': '(insuredPeriodFlag==\'Y\'&&insuredPeriod>=20)||(insuredPeriodFlag==\'A\'&&insuredPeriod==60&&insuredAge<=40)||(insuredPeriodFlag==\'A\'&&insuredPeriod==65&&insuredAge<=45)||(insuredPeriodFlag==\'A\'&&insuredPeriod==70&&insuredAge<=50)'
                    },
                    {
                      'value': '30Y',
                      'valueNum': '30',
                      'valueFlag': 'Y',
                      'valueLabel': '30年',
                      'start': null,
                      'startNum': null,
                      'startFlag': null,
                      'startLabel': null,
                      'end': null,
                      'endNum': null,
                      'endFlag': null,
                      'endLabel': null,
                      'increase': null,
                      'rule': '(insuredPeriodFlag==\'Y\'&&insuredPeriod>=30)||(insuredPeriodFlag==\'A\'&&insuredPeriod==60&&insuredAge<=30)||(insuredPeriodFlag==\'A\'&&insuredPeriod==65&&insuredAge<=35)||(insuredPeriodFlag==\'A\'&&insuredPeriod==70&&insuredAge<=40)'
                    }
                  ],
                  'desc': null
                }
              ],
              'dutyContents': null,
              'additionalRiskContents': [
                {
                  'riskCode': 'AIXINLIFE_00807',
                  'riskName': '附加重疾保费豁免',
                  'riskFields': [
                    {
                      'code': 'insuredPeriod',
                      'fieldItems': [
                        {
                          'value': '20Y',
                          'valueNum': '20',
                          'valueFlag': 'Y',
                          'valueLabel': '20年',
                          'start': null,
                          'startNum': null,
                          'startFlag': null,
                          'startLabel': null,
                          'end': null,
                          'endNum': null,
                          'endFlag': null,
                          'endLabel': null,
                          'increase': null,
                          'rule': 'mainRisk.insuredPeriod==20&&mainRisk.insuredPeriodFlag==\'Y\''
                        },
                        {
                          'value': '30Y',
                          'valueNum': '30',
                          'valueFlag': 'Y',
                          'valueLabel': '30年',
                          'start': null,
                          'startNum': null,
                          'startFlag': null,
                          'startLabel': null,
                          'end': null,
                          'endNum': null,
                          'endFlag': null,
                          'endLabel': null,
                          'increase': null,
                          'rule': 'mainRisk.insuredPeriod==30&&mainRisk.insuredPeriodFlag==\'Y\''
                        },
                        {
                          'value': '60A',
                          'valueNum': '60',
                          'valueFlag': 'A',
                          'valueLabel': '60岁',
                          'start': null,
                          'startNum': null,
                          'startFlag': null,
                          'startLabel': null,
                          'end': null,
                          'endNum': null,
                          'endFlag': null,
                          'endLabel': null,
                          'increase': null,
                          'rule': 'mainRisk.insuredPeriod==60&&mainRisk.insuredPeriodFlag==\'A\''
                        },
                        {
                          'value': '65A',
                          'valueNum': '65',
                          'valueFlag': 'A',
                          'valueLabel': '65岁',
                          'start': null,
                          'startNum': null,
                          'startFlag': null,
                          'startLabel': null,
                          'end': null,
                          'endNum': null,
                          'endFlag': null,
                          'endLabel': null,
                          'increase': null,
                          'rule': 'mainRisk.insuredPeriod==65&&mainRisk.insuredPeriodFlag==\'A\''
                        },
                        {
                          'value': '70A',
                          'valueNum': '70',
                          'valueFlag': 'A',
                          'valueLabel': '70岁',
                          'start': null,
                          'startNum': null,
                          'startFlag': null,
                          'startLabel': null,
                          'end': null,
                          'endNum': null,
                          'endFlag': null,
                          'endLabel': null,
                          'increase': null,
                          'rule': 'mainRisk.insuredPeriod==70&&mainRisk.insuredPeriodFlag==\'A\''
                        }
                      ],
                      'desc': null
                    },
                    {
                      'code': 'payIntv',
                      'fieldItems': [
                        {
                          'value': '12',
                          'valueNum': null,
                          'valueFlag': null,
                          'valueLabel': '年交',
                          'start': null,
                          'startNum': null,
                          'startFlag': null,
                          'startLabel': null,
                          'end': null,
                          'endNum': null,
                          'endFlag': null,
                          'endLabel': null,
                          'increase': null,
                          'rule': 'mainRisk.payIntv==12'
                        }
                      ],
                      'desc': null
                    },
                    {
                      'code': 'payYear',
                      'fieldItems': [
                        {
                          'value': '5Y',
                          'valueNum': '5',
                          'valueFlag': 'Y',
                          'valueLabel': '5年',
                          'start': null,
                          'startNum': null,
                          'startFlag': null,
                          'startLabel': null,
                          'end': null,
                          'endNum': null,
                          'endFlag': null,
                          'endLabel': null,
                          'increase': null,
                          'rule': 'mainRisk.payYear==5'
                        },
                        {
                          'value': '10Y',
                          'valueNum': '10',
                          'valueFlag': 'Y',
                          'valueLabel': '10年',
                          'start': null,
                          'startNum': null,
                          'startFlag': null,
                          'startLabel': null,
                          'end': null,
                          'endNum': null,
                          'endFlag': null,
                          'endLabel': null,
                          'increase': null,
                          'rule': 'mainRisk.payYear==10'
                        },
                        {
                          'value': '20Y',
                          'valueNum': '20',
                          'valueFlag': 'Y',
                          'valueLabel': '20年',
                          'start': null,
                          'startNum': null,
                          'startFlag': null,
                          'startLabel': null,
                          'end': null,
                          'endNum': null,
                          'endFlag': null,
                          'endLabel': null,
                          'increase': null,
                          'rule': 'mainRisk.payYear==20'
                        },
                        {
                          'value': '30Y',
                          'valueNum': '30',
                          'valueFlag': 'Y',
                          'valueLabel': '30年',
                          'start': null,
                          'startNum': null,
                          'startFlag': null,
                          'startLabel': null,
                          'end': null,
                          'endNum': null,
                          'endFlag': null,
                          'endLabel': null,
                          'increase': null,
                          'rule': 'mainRisk.payYear==30'
                        }
                      ],
                      'desc': null
                    }
                  ],
                  'dutyContents': null,
                  'mutualRule': '',
                  'bundledRule': '',
                  'rule': 'mainRisk.payIntv==12&&(provinceCode==110000||provinceCode==130000)',
                  'requiredRule': '',
                  'desc': '被保险人首次发病并经保险公司认可的医院的专科医生确诊为本附加合同约定的重大疾病的，本附加合同效力终止，保险公司自确诊之日起，于每一个保险费支付日豁免主合同及其附加合同的续期保险费。被豁免的保险费视为已经交纳，主合同及其附加合同继续有效。'
                }
              ],
              'rule': ''
            }
          ]
        },
        'informContents': [
          {
            'productCode': '3208',
            'informFlag': true,
            'informType': '2',
            'informInfos': [
              {
                'informCode': 'G00237',
                'informComCode': '',
                'informContent': '1、您是否两年内曾在投保人身保险或复效时被拒绝、延期或附加条件承保？是否曾申请或获得重大疾病险理赔？',
                'informedType': 'INSURED',
                'rule': ''
              },
              {
                'informCode': 'G00238',
                'informComCode': '',
                'informContent': '2、您是否患有或曾经患有或被怀疑患有以下疾病：恶性肿瘤或未被证实的良/恶性肿瘤、被医生建议需进一步检查或治疗的结节/息肉/囊肿、脑血管疾病（包括脑梗塞、脑出血）、心脏疾病（包括冠心病、心肌梗塞、风心病、肺心病、心功能不全Ⅱ级及以上）、高血压（收缩压≥150mmHg或舒张压≥95mmHg）、糖尿病、呼吸衰竭、肝炎、肝硬化、慢性肾脏疾病、肾功能不全、再生障碍性贫血、癫痫、系统性红斑狼疮、白血病、神经精神疾病、智力障碍、先天性疾病、遗传性疾病；接受器官移植；肢体或重要器官残疾畸形或功能障碍；艾滋病或艾滋病毒携带者。',
                'informedType': 'INSURED',
                'rule': ''
              },
              {
                'informCode': 'G00239',
                'informComCode': '',
                'informContent': '3、您过去两年内是否住过院（除外以下情况：阑尾炎、痔疮、疝气、正常分娩、剖宫产、胆结石及单次发作已痊愈的肺炎、因意外导致已痊愈）？',
                'informedType': 'INSURED',
                'rule': ''
              },
              {
                'informCode': 'G00240',
                'informComCode': '',
                'informContent': '4、您是否近半年内已有或正在申请除本公司以外的人寿保险，且保额累计超过300万？',
                'informedType': 'INSURED',
                'rule': ''
              }
            ],
            'intelligentUnderwritingType': '1',
            'intelligentUnderwritingURL': 'http://chatuat.aixinwechat.com/wechatuat/term_insurance/healthy.html?channel=&succflag=&errorUrl'
          }
        ],
        'insuranceContents': [
          {
            'productCode': '3208',
            'bnfMaxNum': '3',
            'appntInputs': [
              {
                'code': 'city',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': [
                  {
                    'value': 'AIXINLIFE',
                    'valueNum': null,
                    'valueFlag': null,
                    'valueLabel': '爱心人寿',
                    'start': null,
                    'startNum': null,
                    'startFlag': null,
                    'startLabel': null,
                    'end': null,
                    'endNum': null,
                    'endFlag': null,
                    'endLabel': null,
                    'increase': null,
                    'rule': null
                  }
                ],
                'rule': ''
              },
              {
                'code': 'address',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': null,
                'rule': ''
              },
              {
                'code': 'certificateValiditiedPeriod',
                'remark': null,
                'type': 'date',
                'neccessary': true,
                'fieldItems': null,
                'rule': ''
              },
              {
                'code': 'isLongTime',
                'remark': null,
                'type': 'text',
                'neccessary': false,
                'fieldItems': null,
                'rule': ''
              },
              {
                'code': 'email',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': null,
                'rule': ''
              },
              {
                'code': 'profession',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': [
                  {
                    'value': 'AIXIN',
                    'valueNum': null,
                    'valueFlag': null,
                    'valueLabel': '爱心人寿',
                    'start': null,
                    'startNum': null,
                    'startFlag': null,
                    'startLabel': null,
                    'end': null,
                    'endNum': null,
                    'endFlag': null,
                    'endLabel': null,
                    'increase': null,
                    'rule': null
                  }
                ],
                'rule': ''
              },
              {
                'code': 'taxPayerType',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': null,
                'rule': ''
              }
            ],
            'insuredInputs': [
              {
                'code': 'insuredRelation',
                'remark': '',
                'type': 'text',
                'neccessary': true,
                'fieldItems': [
                  {
                    'value': '00',
                    'valueNum': null,
                    'valueFlag': null,
                    'valueLabel': '本人',
                    'start': null,
                    'startNum': null,
                    'startFlag': null,
                    'startLabel': null,
                    'end': null,
                    'endNum': null,
                    'endFlag': null,
                    'endLabel': null,
                    'increase': null,
                    'rule': null
                  }
                ],
                'rule': ''
              },
              {
                'code': 'city',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': [
                  {
                    'value': 'AIXINLIFE',
                    'valueNum': null,
                    'valueFlag': null,
                    'valueLabel': '爱心人寿',
                    'start': null,
                    'startNum': null,
                    'startFlag': null,
                    'startLabel': null,
                    'end': null,
                    'endNum': null,
                    'endFlag': null,
                    'endLabel': null,
                    'increase': null,
                    'rule': null
                  }
                ],
                'rule': ''
              },
              {
                'code': 'address',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': null,
                'rule': ''
              },
              {
                'code': 'mobile',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': null,
                'rule': ''
              },
              {
                'code': 'certificateValiditiedPeriod',
                'remark': null,
                'type': 'date',
                'neccessary': true,
                'fieldItems': null,
                'rule': ''
              },
              {
                'code': 'isLongTime',
                'remark': null,
                'type': 'text',
                'neccessary': false,
                'fieldItems': null,
                'rule': ''
              },
              {
                'code': 'profession',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': [
                  {
                    'value': 'AIXIN',
                    'valueNum': null,
                    'valueFlag': null,
                    'valueLabel': '爱心人寿',
                    'start': null,
                    'startNum': null,
                    'startFlag': null,
                    'startLabel': null,
                    'end': null,
                    'endNum': null,
                    'endFlag': null,
                    'endLabel': null,
                    'increase': null,
                    'rule': null
                  }
                ],
                'rule': ''
              }
            ],
            'bnfInputs': [
              {
                'code': 'bnfLegalFlag',
                'remark': '',
                'type': 'text',
                'neccessary': true,
                'fieldItems': [
                  {
                    'value': '1',
                    'valueNum': null,
                    'valueFlag': null,
                    'valueLabel': '法定受益人',
                    'start': null,
                    'startNum': null,
                    'startFlag': null,
                    'startLabel': null,
                    'end': null,
                    'endNum': null,
                    'endFlag': null,
                    'endLabel': null,
                    'increase': null,
                    'rule': null
                  },
                  {
                    'value': '0',
                    'valueNum': null,
                    'valueFlag': null,
                    'valueLabel': '指定受益人',
                    'start': null,
                    'startNum': null,
                    'startFlag': null,
                    'startLabel': null,
                    'end': null,
                    'endNum': null,
                    'endFlag': null,
                    'endLabel': null,
                    'increase': null,
                    'rule': null
                  }
                ],
                'rule': ''
              },
              {
                'code': 'bnfType',
                'remark': '',
                'type': 'text',
                'neccessary': true,
                'fieldItems': [
                  {
                    'value': '1',
                    'valueNum': null,
                    'valueFlag': null,
                    'valueLabel': '死亡受益人',
                    'start': null,
                    'startNum': null,
                    'startFlag': null,
                    'startLabel': null,
                    'end': null,
                    'endNum': null,
                    'endFlag': null,
                    'endLabel': null,
                    'increase': null,
                    'rule': null
                  }
                ],
                'rule': ''
              },
              {
                'code': 'bnfRelation',
                'remark': '',
                'type': 'text',
                'neccessary': true,
                'fieldItems': [
                  {
                    'value': '01',
                    'valueNum': null,
                    'valueFlag': null,
                    'valueLabel': '夫妻',
                    'start': null,
                    'startNum': null,
                    'startFlag': null,
                    'startLabel': null,
                    'end': null,
                    'endNum': null,
                    'endFlag': null,
                    'endLabel': null,
                    'increase': null,
                    'rule': null
                  },
                  {
                    'value': '03',
                    'valueNum': null,
                    'valueFlag': null,
                    'valueLabel': '子女',
                    'start': null,
                    'startNum': null,
                    'startFlag': null,
                    'startLabel': null,
                    'end': null,
                    'endNum': null,
                    'endFlag': null,
                    'endLabel': null,
                    'increase': null,
                    'rule': null
                  },
                  {
                    'value': '04',
                    'valueNum': null,
                    'valueFlag': null,
                    'valueLabel': '父母',
                    'start': null,
                    'startNum': null,
                    'startFlag': null,
                    'startLabel': null,
                    'end': null,
                    'endNum': null,
                    'endFlag': null,
                    'endLabel': null,
                    'increase': null,
                    'rule': null
                  }
                ],
                'rule': ''
              },
              {
                'code': 'name',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': null,
                'rule': ''
              },
              {
                'code': 'idCard',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': null,
                'rule': ''
              },
              {
                'code': 'mobile',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': null,
                'rule': ''
              },
              {
                'code': 'certificateValiditiedPeriod',
                'remark': null,
                'type': 'date',
                'neccessary': true,
                'fieldItems': null,
                'rule': ''
              },
              {
                'code': 'isLongTime',
                'remark': null,
                'type': 'text',
                'neccessary': false,
                'fieldItems': null,
                'rule': ''
              },
              {
                'code': 'bnfLot',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': null,
                'rule': ''
              },
              {
                'code': 'address',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': null,
                'rule': ''
              }
            ],
            'otherInputs': [
              {
                'code': 'renewalPayBank',
                'remark': null,
                'type': 'text',
                'neccessary': true,
                'fieldItems': null,
                'rule': ''
              }
            ],
            'renewalBankCodes': [
              {
                'bankUrid': '102',
                'bankName': '工商银行'
              },
              {
                'bankUrid': '103',
                'bankName': '农业银行'
              },
              {
                'bankUrid': '104',
                'bankName': '中国银行'
              },
              {
                'bankUrid': '105',
                'bankName': '建设银行'
              },
              {
                'bankUrid': '403',
                'bankName': '邮储银行'
              },
              {
                'bankUrid': '783',
                'bankName': '平安银行'
              },
              {
                'bankUrid': '307',
                'bankName': '平安银行(原深发展)'
              },
              {
                'bankUrid': '302',
                'bankName': '中信银行'
              },
              {
                'bankUrid': '303',
                'bankName': '光大银行'
              },
              {
                'bankUrid': '309',
                'bankName': '兴业银行'
              },
              {
                'bankUrid': '310',
                'bankName': '浦发银行'
              },
              {
                'bankUrid': '301',
                'bankName': '交通银行'
              }
            ]
          }
        ],
        'platformContent': {
          'platformType': 'wx',
          'payType': [
            'wxPay',
            'bindPay'
          ],
          'bankCode': [
            {
              'bankUrid': '102',
              'bankName': '工商银行'
            },
            {
              'bankUrid': '104',
              'bankName': '中国银行'
            },
            {
              'bankUrid': '103',
              'bankName': '农业银行'
            },
            {
              'bankUrid': '105',
              'bankName': '建设银行'
            },
            {
              'bankUrid': '403',
              'bankName': '邮储银行'
            },
            {
              'bankUrid': '305',
              'bankName': '民生银行'
            },
            {
              'bankUrid': '783',
              'bankName': '平安银行'
            },
            {
              'bankUrid': '307',
              'bankName': '平安银行（原深发展）'
            },
            {
              'bankUrid': '302',
              'bankName': '中信银行'
            },
            {
              'bankUrid': '303',
              'bankName': '光大银行'
            },
            {
              'bankUrid': '308',
              'bankName': '招商银行'
            },
            {
              'bankUrid': '309',
              'bankName': '兴业银行'
            },
            {
              'bankUrid': '310',
              'bankName': '浦发银行'
            },
            {
              'bankUrid': '301',
              'bankName': '交通银行'
            }
          ],
          'shareInfos': [
            {
              'channel': '',
              'sharePlatform': '微信好友',
              'type': '1',
              'contnet': '超低保费，25种重大疾病豁免',
              'title': '爱心守护神定期寿险',
              'imgUrl': 'https://lxb.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_list.jpg',
              'desc': '超低保费，25种重大疾病豁免',
              'shareUrl': ''
            },
            {
              'channel': '',
              'sharePlatform': '朋友圈',
              'type': '1',
              'contnet': '超低保费，25种重大疾病豁免',
              'title': '爱心守护神定期寿险',
              'imgUrl': 'https://lxb.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_list.jpg',
              'desc': '超低保费，25种重大疾病豁免',
              'shareUrl': ''
            }
          ],
          'paySuccInfos': null,
          'discountWays': null,
          'renewalSuccInfos': null,
          'isRenewFlag': '2',
          'discoutType': '',
          'discoutPrem': ''
        }
      }
    }
  }
}