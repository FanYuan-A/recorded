export default {
    methods:{
        mixinAlterParamForSaveOrder(session,companyName,saveFlag,saveType,imageList){
            // 保存订单参数转换
            let data = session
            if (companyName == 'BAINIAN') {
                let params = {
                    itemCode:data.itemCode, // 销售编码
                    outItemCode:data.outItemCode, // 外部销售计划编码
                    productCode:data.productCode, // 产品编码
                    mainRiskCode:data.mainRiskCode, // 主险编码
                    reBuyFlag:data.reBuyFlag,
                    socialInsuFlag:data.insuredInfo.socialSecurityFlag, // 被保人是否有社保
                    orderAmount:data.orderAmount, // 订单金额
                    orderMult:data.orderMult, // 订单份数
                    appntInfo:{
                        name:data.appntInfo.name, // 姓名
                        idType:data.appntInfo.idType, // 证件类型
                        idNo:data.appntInfo.idNo, // 证件号
                        sex:data.appntInfo.sex, // 性别
                        birthday:data.appntInfo.birthday, // 生日
                        provinceCode:data.appntInfo.addressNo.length ? data.appntInfo.addressNo[0].value : '', // 省编码
                        provinceName:data.appntInfo.addressNo.length ? data.appntInfo.addressNo[0].label : '', // 省名称
                        cityCode:data.appntInfo.addressNo.length ? data.appntInfo.addressNo[1].value : '', // 市编码
                        cityName:data.appntInfo.addressNo.length ? data.appntInfo.addressNo[1].label : '', // 市名称
                        // district: data.appntInfo.addressNo.length ? data.appntInfo.address[2].value : '', // 区编码 TODO: esp
                        // districtName: data.appntInfo.addressNo.length ? data.appntInfo.address[2].label : '', // 区名称
                        // salary: data.appntInfo.salary, // 年收入 TODO: esp  
                        // incomeSource: data.appntInfo.incomeSource, // 收入来源
                        // incomeSourceName: data.appntInfo.incomeSourceName, // 收入来源名称
                        stature:data.appntInfo.stature, // 身高
                        avoirdupois:data.appntInfo.avoirdupois, // 体重
                        addressDetail:data.appntInfo.addressDetail, // 地址
                        zip:data.appntInfo.zip, // 邮编
                        mobile:data.appntInfo.mobile, // 手机号
                        email:data.appntInfo.email, // 邮箱
                        revenueType:data.appntInfo.revenueType, // 税收类型
                        marriage: data.appntInfo.marriage, // 婚姻
                        degree: data.appntInfo.degree, // 学历
                        occupationCode:(()=>{ // 职业编码
                            let appntLength = data.appntInfo.occupationCode.length
                            return appntLength ? data.appntInfo.occupationCode[appntLength - 1].value : ''
                        })(),
                        occupationName:(()=>{ // 职业名称
                            let appntLength = data.appntInfo.occupationCode.length
                            return appntLength ? data.appntInfo.occupationCode[appntLength - 1].label : ''
                        })(),
                        occupationalCategory:(()=>{ // 职业等级
                            let appntLength = data.appntInfo.occupationCode.length
                            return appntLength ? data.appntInfo.occupationCode[appntLength - 1].category : ''
                        })(),
                        socialInsuFlag:data.appntInfo.socialSecurityFlag, // 社保标志
                        houseHoldCode:(()=>{ //  户籍编码
                            let houseHoldLength = data.appntInfo.houseHold.length
                            return houseHoldLength ? data.appntInfo.houseHold[houseHoldLength - 1].value : ''
                        })(),
                        houseHoldName:(()=>{ // 户籍名称 TODO:
                            let houseHoldLength = data.appntInfo.houseHold.length
                            return houseHoldLength ? data.appntInfo.houseHold[houseHoldLength - 1].label : ''
                        })(),
                        isAlwaysEffect:data.appntInfo.isAlwaysEffect, // 是否长期有效 TODO:
                        certiEndDate:data.appntInfo.isAlwaysEffect == '0' ? data.appntInfo.certiEndDate : '', // 证件止期
                        householdType:data.appntInfo.houseType,
                        workUnit:data.appntInfo.workUnit
                    },
                    insuredInfo:{
                        relationToApp:data.insuredInfo.relationToApp, // 与投保人关系
                        name:data.insuredInfo.name, // 被保人姓名
                        idType:data.insuredInfo.idType, // 证件类型
                        idNo:data.insuredInfo.idNo ? data.insuredInfo.idNo : '', // 证件号
                        sex:data.insuredInfo.sex, // 性别
                        birthday:data.insuredInfo.birthday, // 生日
                        mobile:data.insuredInfo.mobile, // 手机号
                        email:data.insuredInfo.email, // 邮箱
                        provinceCode:data.insuredInfo.addressNo.length ? data.insuredInfo.addressNo[0].value : '',  // 省编码
                        provinceName:data.insuredInfo.addressNo.length ? data.insuredInfo.addressNo[0].label : '', // 省名称
                        cityCode:data.insuredInfo.addressNo.length ? data.insuredInfo.addressNo[1].value : '', // 市编码
                        cityName:data.insuredInfo.addressNo.length ? data.insuredInfo.addressNo[1].label : '', // 市名称
                        // 百年 只有省市 TODO:
                        // district: data.appntInfo.addressNo.length ? data.appntInfo.address[2].value : '', // 区编码
                        // districtName: data.appntInfo.addressNo.length ? data.appntInfo.address[2].label : '', // 区名称
                        // salary: data.appntInfo.salary, // 年收入 TODO: 百年是否有收入相关
                        // incomeSource: data.appntInfo.incomeSource, // 收入来源
                        // incomeSourceName: data.appntInfo.incomeSourceName, // 收入来源名称

                        liveGetMode:data.insuredInfo.liveGetMode, // 生存金领取方式
                        // getIntv:(()=>{
                        //     let str = ''
                        //     Object.keys(data.riskData).forEach((el)=>{
                        //         if (data.riskData[el].isAnnuity == '1') {
                        //             str = data.riskData[el].getIntv
                        //         }
                        //     })
                        //     return str
                        // })(),

                        marriage: data.insuredInfo.marriage, // 婚姻
                        degree: data.insuredInfo.degree, // 学历
                        address:data.insuredInfo.address, // 地址
                        zip:data.insuredInfo.zip, // 邮编
                        stature:data.insuredInfo.stature, // 身高
                        avoirdupois:data.insuredInfo.avoirdupois, // 体重
                        revenueType:data.insuredInfo.revenueType, // 税收类型
                        occupationCode:data.insuredInfo.occupationCode.length ? data.insuredInfo.occupationCode[data.insuredInfo.occupationCode.length - 1].value : '', // // 职业编码
                        occupationName:data.insuredInfo.occupationCode.length ? data.insuredInfo.occupationCode[data.insuredInfo.occupationCode.length - 1].label : '', // 职业名称
                        occupationalCategory:data.insuredInfo.occupationCode.length ? data.insuredInfo.occupationCode[data.insuredInfo.occupationCode.length - 1].category : '',
                        houseHoldCode:(()=>{ // 户籍编码
                            let houseHoldLength = data.insuredInfo.houseHold.length
                            return houseHoldLength ? data.insuredInfo.houseHold[houseHoldLength - 1].value : ''
                        })(),
                        houseHoldName:(()=>{ // 户籍名称 TODO:
                            let houseHoldLength = data.insuredInfo.houseHold.length
                            return houseHoldLength ? data.insuredInfo.houseHold[houseHoldLength - 1].label : ''
                        })(),
                        isAlwaysEffect:data.insuredInfo.idType == '0' ? data.insuredInfo.isAlwaysEffect : '', // 是否长期有效 TODO:
                        certiEndDate:data.insuredInfo.idType == '0' && data.insuredInfo.isAlwaysEffect == '0' ? data.insuredInfo.certiEndDate : '', // 证件止期
                        workUnit:data.insuredInfo.workUnit,
                        bnfInfo:{ // 受益人信息
                            bnfType:data.insuredInfo.bnfInfo.bnfType, // 受益人类型
                            channelBeneList:data.insuredInfo.bnfInfo.bnfType == 'LEGAL' ? [] : data.insuredInfo.bnfInfo.channelBeneList.map((el)=>{
                                return {
                                    relation:el.relation,
                                    name:el.name,
                                    sex:el.sex,
                                    idType:el.idType,
                                    idNo:el.idNo,
                                    birthday:el.birthday,
                                    bnfType:el.bnfType,
                                    bnfOrder:el.bnfOrder,
                                    bnfScale:el.bnfScale,

                                    // mobile:el.mobile,
                                    certiEndDate:el.certiEndDate,
                                    // zip:el.zip,
                                    // addressNo:el.addressNo,
                                    // beneOccupName:el.occupationOption[el.occupationOption.length - 1].label,
                                    // occupationCode:el.occupationOption[el.occupationOption.length - 1].value,
                                    isAlwaysEffect:el.isAlwaysEffect,
                                }
                            }),
                        },
                    },
                    imageList:imageList, // 影像信息
                    saveType:saveType, // 影像件保存类型
                    channelInsurance:data.channelInsurance, // 试算返回信息 TODO:待检测是否正确
                    riskData:(() => {
                        let riskDataObj = {}
                        Object.keys(data.riskData).map((key) => {
                            // console.log(data.riskData[key])
                            riskDataObj[key] = {}
                            Object.keys(data.riskData[key]).forEach((key2)=>{
                                if (key2 != 'liveGetMode' && key2 != 'getIntv' && key2 != 'isAnnuity' && key2 != 'getYearFlag') {
                                    riskDataObj[key][key2] = data.riskData[key][key2]
                                }
                            })
                        })
                        return riskDataObj
                    })(),
                    saveFlag:saveFlag, // 是否暂存标志
                    orderNo:data.orderNo,
                }
                return params
            }
        }
    }
}