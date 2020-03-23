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
  /**
   * mock bootstrap
   */
  getClassInfo (config) {
    console.log(config)
    return {
      'code': 0,
      'message': '成功',
      'content': {
        'result': '0',
        'resultMessage': '',
        'questionAnswer': {
          'label': '保险问答',
          'type': 'question',
          'list': [{
            'type': 'question',
            'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
            'title': '保险公司还有那些“隐藏保险公司还有那些“隐藏式服务”你不知道？你不知道？式服务”你不知道？你不知道？',
            'time': '2019-08-22',
            'sale': '58',
            'answerMan': '小瑞',
            'question': '问题:车祸意外走的是意外险还是医疗险?某日乘坐朋保险公司还有那些“隐藏式服务”你不知道？你不知道？友车外出旅游。因本车司机失误。导致车祸使自己受伤,走的意外险还是医疗险? ',
            'answerContent': '该片明显将战争的正义与非正义之分模糊化了。作为以第二次世界大战冲绳岛之战为背景的电影，如果避而不谈当时的国际形势、战争起因，仅讨论人性、信仰、恶魔等泛化元素，仅以一个大兵的个人信仰和好恶判断战争难免有为了反战而不顾一切地想掩饰什么之嫌。'
          }, {
            'type': 'question',
            'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
            'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
            'time': '2019-08-22',
            'sale': '58',
            'answerMan': '小瑞',
            'question': '问题:车祸意外走的是意外险还是医疗险?某日乘坐朋友车外出旅游。因本车司机失误。导致车祸使自己受伤,走的意外险还是医疗险? ',
            'answerContent': '该片明显将战争的正义与非正义之分模糊化了。作为以第二次世界大战冲绳岛之战为背景的电影，如果避而不谈当时的国际形势、战争起因，仅讨论人性、信仰、恶魔等泛化元素，仅以一个大兵的个人信仰和好恶判断战争难免有为了反战而不顾一切地想掩饰什么之嫌。'
          }, {
            'type': 'question',
            'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
            'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
            'time': '2019-08-22',
            'sale': '58',
            'answerMan': '小瑞',
            'question': '问题:车祸意外走的是意外险还是医疗险?某日乘坐朋友车外出旅游。因本车司机失误。导致车祸使自己受伤,走的意外险还是医疗险? ',
            'answerContent': '该片明显将战争的正义与非正义之分模糊化了。作为以第二次世界大战冲绳岛之战为背景的电影，如果避而不谈当时的国际形势、战争起因，仅讨论人性、信仰、恶魔等泛化元素，仅以一个大兵的个人信仰和好恶判断战争难免有为了反战而不顾一切地想掩饰什么之嫌。'
          }, {
            'type': 'question',
            'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
            'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
            'time': '2019-08-22',
            'sale': '58',
            'answerMan': '小瑞',
            'question': '问题:车祸意外走的是意外险还是医疗险?某日乘坐朋友车外出旅游。因本车司机失误。导致车祸使自己受伤,走的意外险还是医疗险? ',
            'answerContent': '该片明显将战争的正义与非正义之分模糊化了。作为以第二次世界大战冲绳岛之战为背景的电影，如果避而不谈当时的国际形势、战争起因，仅讨论人性、信仰、恶魔等泛化元素，仅以一个大兵的个人信仰和好恶判断战争难免有为了反战而不顾一切地想掩饰什么之嫌。'
          }, {
            'type': 'question',
            'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
            'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
            'time': '2019-08-22',
            'sale': '58',
            'answerMan': '小瑞',
            'question': '问题:车祸意外走的是意外险还是医疗险?某日乘坐朋友车外出旅游。因本车司机失误。导致车祸使自己受伤,走的意外险还是医疗险? ',
            'answerContent': '该片明显将战争的正义与非正义之分模糊化了。作为以第二次世界大战冲绳岛之战为背景的电影，如果避而不谈当时的国际形势、战争起因，仅讨论人性、信仰、恶魔等泛化元素，仅以一个大兵的个人信仰和好恶判断战争难免有为了反战而不顾一切地想掩饰什么之嫌。'
          }, {
            'type': 'question',
            'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
            'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
            'time': '2019-08-22',
            'sale': '58',
            'answerMan': '小瑞',
            'question': '问题:车祸意外走的是意外险还是医疗险?某日乘坐朋友车外出旅游。因本车司机失误。导致车祸使自己受伤,走的意外险还是医疗险? ',
            'answerContent': '该片明显将战争的正义与非正义之分模糊化了。作为以第二次世界大战冲绳岛之战为背景的电影，如果避而不谈当时的国际形势、战争起因，仅讨论人性、信仰、恶魔等泛化元素，仅以一个大兵的个人信仰和好恶判断战争难免有为了反战而不顾一切地想掩饰什么之嫌。'
          }
          ]
        },
        'knowledge': {
          'label': '保险知识',
          'type': 'news',
          'list': [{
            'type': 'oneimg',
            'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
            'title': '保险公司还有那些“隐藏式服务保险公司还有那些“隐藏式服务”你不知道？你不知道？”你不知道？你不知道？',
            'time': '2019-08-22',
            'sale': '58'
          }, {
            'type': 'imglist',
            'label': '保险冷知识',
            'list': [
              {
                'type': 'imglist',
                'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }, {
                'type': 'imglist',
                'img': 'https://baoxian.dxmstatic.com/assets/cms/activity/material/95187d9d3700a16189a05e4f8a2096cd.png',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }
            ]
          }, {
            'type': 'imglist',
            'label': '保险小科普',
            'list': [
              {
                'type': 'imglist',
                'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
                'title': '保险公司还有那些“隐藏式服保险公司还有那些“隐藏式服务”你不知道？你不知道？务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }, {
                'type': 'imglist',
                'img': 'https://baoxian.dxmstatic.com/assets/cms/activity/material/95187d9d3700a16189a05e4f8a2096cd.png',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }
            ]
          }, {
            'type': 'productimg',
            'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
            'title': '安联乐享人生(少儿版)',
            'des': '保障全：意外身故+身残+住院津贴',
            'price': '266.00',
            'label': '重疾险',
            'priceFlag': '元起',
            'time': '2019-08-22',
            'sale': '58'
          }, {
            'type': 'imglist',
            'label': '保险小专栏',
            'list': [
              {
                'type': 'imglist',
                'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }, {
                'type': 'imglist',
                'img': 'https://baoxian.dxmstatic.com/assets/cms/activity/material/95187d9d3700a16189a05e4f8a2096cd.png',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }
            ]
          },
          ]
        },
        'case': {
          'label': '保险案例',
          'type': 'news',
          'list': [{
            'type': 'imglist',
            'label': '保险冷知识',
            'list': [
              {
                'type': 'imglist',
                'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }, {
                'type': 'imglist',
                'img': 'https://baoxian.dxmstatic.com/assets/cms/activity/material/95187d9d3700a16189a05e4f8a2096cd.png',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }
            ]
          }, {
            'type': 'oneimg',
            'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
            'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
            'time': '2019-08-22',
            'sale': '58'
          }, {
            'type': 'imglist',
            'label': '保险小科普',
            'list': [
              {
                'type': 'imglist',
                'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }, {
                'type': 'imglist',
                'img': 'https://baoxian.dxmstatic.com/assets/cms/activity/material/95187d9d3700a16189a05e4f8a2096cd.png',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }
            ]
          }, {
            'type': 'productimg',
            'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
            'title': '安联乐享人生(少儿版)',
            'des': '保障全：意外身故+身残+住院津贴',
            'price': '266.00',
            'label': '重疾险',
            'priceFlag': '元起',
            'time': '2019-08-22',
            'sale': '58'
          }, {
            'type': 'imglist',
            'label': '保险小专栏',
            'list': [
              {
                'type': 'imglist',
                'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }, {
                'type': 'imglist',
                'img': 'https://baoxian.dxmstatic.com/assets/cms/activity/material/95187d9d3700a16189a05e4f8a2096cd.png',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }
            ]
          },
          ]
        },
        'news': {
          'label': '保险新闻',
          'type': 'news',
          'list': [{
            'type': 'oneimg',
            'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
            'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
            'time': '2019-08-22',
            'sale': '58'
          }, {
            'type': 'imglist',
            'label': '保险冷知识',
            'list': [
              {
                'type': 'imglist',
                'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }, {
                'type': 'imglist',
                'img': 'https://baoxian.dxmstatic.com/assets/cms/activity/material/95187d9d3700a16189a05e4f8a2096cd.png',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }
            ]
          }, {
            'type': 'imglist',
            'label': '保险小科普',
            'list': [
              {
                'type': 'imglist',
                'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }, {
                'type': 'imglist',
                'img': 'https://baoxian.dxmstatic.com/assets/cms/activity/material/95187d9d3700a16189a05e4f8a2096cd.png',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }
            ]
          }, {
            'type': 'productimg',
            'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
            'title': '安联乐享人生(少儿版)',
            'des': '保障全：意外身故+身残+住院津贴',
            'price': '266.00',
            'label': '重疾险',
            'priceFlag': '元起',
            'time': '2019-08-22',
            'sale': '58'
          }, {
            'type': 'imglist',
            'label': '保险小专栏',
            'list': [
              {
                'type': 'imglist',
                'img': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }, {
                'type': 'imglist',
                'img': 'https://baoxian.dxmstatic.com/assets/cms/activity/material/95187d9d3700a16189a05e4f8a2096cd.png',
                'title': '保险公司还有那些“隐藏式服务”你不知道？你不知道？',
                'time': '2019-08-22',
                'sale': '58'
              }
            ]
          },
          ]
        },
        'displayContent': {
          'productImageUrl': 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4,//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_banner.jpg',
          'productName': '爱心人寿守护神定期寿险',
          'subProductName': '',
          'organizationName': '爱心人寿保险股份有限公司',
          'salesMult': '0',
          'productReadingDesc': '我已确认接受<a class="showClause" href="#" target="_self" external="" textvalue="《保险条款》">《保险条款》</a>、<a class="showClause" href="#" target="_self" external="">《投保须知》等（点击查看详细）</a>的全部内容，了解并接受包括有关责任条款及免责条款，承保地域限制等约定。',
          'productClause': [
            {
              'clauseName': '《爱心人寿守护神定期寿险条款》',
              'clauseLink': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_bxtk.pdf'
            },
            {
              'clauseName': '《爱心人寿附加守护神豁免重大疾病保险条款》',
              'clauseLink': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_fjbxtk.pdf'
            },
            {
              'clauseName': '《守护神定期寿险费率表》',
              'clauseLink': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_flb.pdf'
            },
            {
              'clauseName': '《附加守护神豁免重大疾病保险费率表》',
              'clauseLink': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_fjflb.pdf'
            },
            {
              'clauseName': '《投保须知》',
              'clauseLink': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_tbxz.pdf'
            },
            {
              'clauseName': '《健康告知》',
              'clauseLink': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_jkgz.html'
            },
            {
              'clauseName': '《投保人声明书》',
              'clauseLink': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_tbrsm.pdf'
            },
            {
              'clauseName': '《人身保险投保提示书》',
              'clauseLink': '//weixin.huaruisales.com/resources/HRWX_HRP_PS6000/PS6000_tbtss.pdf'
            },
            {
              'clauseName': '《支付说明》',
              'clauseLink': '//weixin.huaruisales.com/intro/product/HRWX_BPM_36/hr8_zfsm.html'
            },
            {
              'clauseName': '《客户告知书》',
              'clauseLink': 'https://weixin.huaruisales.com/resources/HRWX_HRP/khgzs/index.html'
            }
          ],
          'showAmount': null,
          'insuranceNotes': [
            {
              'name': '保障时间',
              'content': ''
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
              'content': '1000000万',
              'desc': '被保险人身故/全残，本合同效力终止，保险公司按身故/全残时本合同的基本保险金额给付身故保险金。本合同的身故保险金或全残保险金的给付以一次为限。'
            },
            {
              'name': '附加重疾保费豁免',
              'content': '豁免后期未交保费',
              'desc': '被保险人首次发病并经保险公司认可的医院的专科医生确诊为本附加合同约定的重大疾病的，本附加合同效力终止，保险公司自确诊之日起，于每一个保险费支付日豁免主合同及其附加合同的续期保险费。被豁免的保险费视为已经交纳，主合同及其附加合同继续有效。'
            }
          ],
          'insuranceDetail': '<div class="buttons-tab"><a class="tab-link tab-btn-info active button" href="#tab1">产品特色</a><a class="tab-link tab-btn-info button" href="#tab2">保障详情</a><a class="tab-link tab-btn-info button" href="#tab3">常见问题</a></div><div class="content-block" style="margin: 0px; padding: 0px; width: 100%;"><div class="tabs"><div class="tab-content" id="tab1"><div><img style="width: 100%;" src="https://lxb.huaruisales.com/resources/item/LXB_535/201908221401199491.png"/></div></div><div class="tab-content" id="tab2"><div><img style="width: 100%;" src="https://lxb.huaruisales.com/resources/item/LXB_535/201908221401359948.png"/></div><div class="content-block-box"><div class="content-block-title font-16" style="color: rgb(10, 141, 223); font-weight: bold;">销售区域</div><div class="list-block"><ul style="margin: 0;" class=" list-paddingleft-2"><li class="item-content h5-item-content"><div class="item-media"></div><div class="item-inner"><div class="item-title font-14" style="white-space: inherit;">本产品由《爱心人寿守护神定期寿险条款》条款编码为：爱心人寿[2019]定期寿险001号和《爱心人寿附加守护神豁免重大疾病保险条款》条款编码为：爱心人寿[2019]疾病保险002号组合而成。<span style="color:red">本产品由爱心人寿保险股份有限公司承保，由华瑞保险销售有限公司代理销售，本平台仅提供技术服务支持。</span>其中寿险可全国销售，附加豁免重疾险仅限北京、天津、河北销售。非以上地区的客户投保，可能存在后续服务时效有所延迟等问题。</div></div></li></ul></div></div></div></div></div>',
          'claimDetail': '<div class="content-block-box"><div class="content-block-title font-16" style="color: rgb(10, 141, 223); font-weight: bold;">理赔流程</div><div class="list-block"><ul class=" list-paddingleft-2"><li class="item-content h5-item-content"><div class="item-media"></div><div class="item-inner"><div class="item-title font-14" style="white-space: inherit;">保单承保后，后续保全、理赔等相关事务均可致电爱心人寿保险股份有限公司公司全国统一客服热线10109520。<br/><img style="width: 100%;" src="https://lxb.huaruisales.com/resources/item/LXB_535/201908131058484457.png"/></div></div></li></ul></div></div>',
          'commonQuestion': '<div class="tab-content" id="tab3"><div><img style="width: 100%;" src="https://lxb.huaruisales.com/resources/item/LXB_535/201908301603015658.jpg"/></div></div>'
        },
        'platformContent': {
          'platformType': '微信',
          'payType': [
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
            },
            {
              'bankUrid': '304',
              'bankName': '华夏银行'
            }
          ],
          'shareInfos': null,
          'paySuccInfos': null,
          'pointFlag': '',
          'startDeduction': '',
          'maxDeduction': '',
          'deductionRate': '',
          'renewalSuccInfos': null,
          'isRenewFlag': '1',
          'discoutType': '',
          'discoutPrem': ''
        }
      }
    }
  }
}