/* eslint-disable */
import validator from '@/utils/validator.js'
export default {
    methods:{
        // 险种库规则：求值为true代表校验不通过
        // require表示是否要对值为空字符串的表单项进行验证 true-需要验证 false-不需要验证
        mixinValidateForInputEnter(params){
            let {innerValue,inputItemCode,identity,title,name,checkRules,allInfo,require} = params
            let obj = {
                appnt:'投保人',
                insured:'被保人',
                bnf:'受益人'
            }
            
            let reg = /^[\u2E80-\u9FFF]+$/  //Unicode编码中的汉字范围
            let tel = /^1\d{10}$/ //手机号
            let zip = /^[0-9]{6}$/ //邮编
            let height = /^[0-9]{3}$/ //身高
            let addressReg = /^(.*?)[\u4e00-\u9fa5](.*?)[\u4e00-\u9fa5](.*?)[\u4e00-\u9fa5](.*?)[\u4e00-\u9fa5](.*?)[\u4e00-\u9fa5](.*?)$/

            let info = obj[identity] + title
            let appntInfo = allInfo.appntInfo
            let insuredInfo = allInfo.insuredInfo
            
            let bnfIndex = ''
            let bnfInfo = ''
            if (identity == 'bnf') {
                bnfIndex = name.split('-')[2]
                bnfInfo = allInfo.bnfContent[bnfIndex].bnfInfo    
            }
            console.log(
                `验证:${inputItemCode} | 组件ref名称:${name} | 当前操作人:${identity}(${obj[identity]}) | 投保人的信息:`,
                appntInfo,
                ` | 被保人信息:`,
                insuredInfo,
                ` | 受益人信息(${Number(bnfIndex)})`,
                bnfInfo,
                '当前的checkRules',
                checkRules
            )
            // 姓名
            if (inputItemCode == 'name') {
                if(innerValue.length >=2 && reg.test(innerValue) && innerValue.length <=20){
                    return {
                        validate:false,
                        msg:''
                    }
                }else if(innerValue.length == 0){
                    return {
                        validate:true,
                        msg:require ? `请输入${info}` : ''
                    }
                }else{
                    return {
                        validate:true,
                        msg:`请输入正确的${info}（2-20个汉字）`
                    }
                }
            }
            //身份证
            if (inputItemCode == 'idNo'){
                // 投保人身份证
                if (identity == 'appnt') {
                    if (appntInfo.idType.value == '0') {
                        if (validator.isIDNum(innerValue)) {
                            if (innerValue.length == 18) {
                                let birthday = `${innerValue.substring(6, 10)}-${innerValue.substring(10, 12)}-${innerValue.substring(12, 14)}`
                                let birthdayAge = validator.jsGetAge(birthday)
                                let sex = (Number(innerValue.substring(16,17)) % 2 == 0) ? '1' : '0'
                                if(birthdayAge < 18){
                                    return {
                                        validate:true,
                                        msg:`${obj[identity]}需年满18周岁`
                                    }
                                }
                                allInfo.appntInfo.birthday = birthday
                                allInfo.appntInfo.sex = {
                                    text:sex == '0' ? '男' : '女',
                                    value:sex
                                }
                                if (!require) {
                                    return {
                                        validate:false,
                                        msg:'',
                                    }
                                }
                                if(insuredInfo.relationToAppnt.value == '00'){
                                    if(birthday != allInfo.productDes.insuredInfo.birthday){
                                        return {
                                            validate:true,
                                            msg:`证件号与试算时录入的生日不一致`
                                        }
                                    }
                                    if(sex != allInfo.productDes.insuredInfo.sex){
                                        return {
                                            validate:true,
                                            msg:`证件号与试算时录入的性别不一致`
                                        }
                                    }
                                }else {
                                    if (allInfo.isHaveAppnt){
                                        if(birthday != allInfo.productDes.appntInfo.birthday){
                                            return {
                                                validate:true,
                                                msg:`证件号与试算时录入的生日不一致`
                                            }
                                        }
                                        if(sex != allInfo.productDes.appntInfo.sex){
                                            return {
                                                validate:true,
                                                msg:`证件号与试算时录入的性别不一致`
                                            }
                                        }
                                    }
                                }
                                return {
                                    validate:false,
                                    msg:'',
                                }
                            }
                        }else if(innerValue.length == 0){
                            return {
                                validate:true,
                                msg:require ? `请输入${info}` : ''
                            }
                        }else{
                            return {
                                validate:true,
                                msg:`请输入正确的${obj[identity]}法定身份证号码`
                            }
                        }
                    }else{
                        return {
                            validate:false,
                            msg:'',
                        }
                    }
                }else if (identity == 'insured'){ //被保人身份证
                    if(insuredInfo.idType.value == '0' || insuredInfo.idType.value  == '4'){ // 0-身份证 4-户口本
                        if(validator.isIDNum(innerValue)){
                            if(innerValue.length == 18){
                                let birthday = `${innerValue.substring(6, 10)}-${innerValue.substring(10, 12)}-${innerValue.substring(12, 14)}`
                                let sex = (Number(innerValue.substring(16,17)) % 2 == 0) ? '1' : '0'

                                allInfo.insuredInfo.birthday = birthday
                                allInfo.insuredInfo.sex = {
                                    text:sex == '0' ? '男' : '女',
                                    value:sex
                                }
                                if (!require) {
                                    return {
                                        validate:false,
                                        msg:'',
                                    }
                                }
                                if(birthday != allInfo.productDes.insuredInfo.birthday){
                                    return {
                                        validate:true,
                                        msg:`证件号与试算时录入的生日不一致`
                                    }
                                }
                                if(sex != allInfo.productDes.insuredInfo.sex) {
                                    return {
                                        validate:true,
                                        msg:`证件号与试算时录入的性别不一致`
                                    }
                                }
                                
                                return {
                                    validate:false,
                                    msg:'',
                                }
                            }
                        }else if(innerValue.length == 0){
                            return {
                                validate:true,
                                msg:require ? `请输入${info}` : '',
                            }
                        }else{
                            return {
                                validate:true,
                                msg:`请输入正确的${obj[identity]}法定身份证号码`,
                            }
                        }
                    }else if(insuredInfo.idType.value == '7'){ // 7-出生证
                        return {
                            validate:false,
                            msg:'',
                        }
                    }
                }else if (identity == 'bnf') { //受益人身份证
                    if(bnfInfo.idType.value == '0' || bnfInfo.idType.value == '4'){
                        if(validator.isIDNum(innerValue)){
                            if(innerValue.length == 18){
                                let birthday = `${innerValue.substring(6, 10)}-${innerValue.substring(10, 12)}-${innerValue.substring(12, 14)}`
                                let sex = (Number(innerValue.substring(16,17)) % 2 == 0) ? '1' : '0'
                                bnfInfo.birthday = birthday
                                bnfInfo.sex = {
                                    text:sex == '0' ? '男' : '女',
                                    value:sex
                                }
                                return {
                                    validate:false,
                                    msg:''
                                }
                            }
                        }else if(innerValue.length == 0){
                            return {
                                validate:true,
                                msg:require ? `请输入${info}` : '',
                            }
                        }else{
                            return {
                                validate:true,
                                msg:`请输入正确的${obj[identity]}法定身份证号码`
                            }
                        }
                    }else{
                        return {
                            validate:false,
                            msg:''
                        }
                    }
                }
            }
            // 出生日期
            if (inputItemCode == 'birthday') {
                if (innerValue.length == 0) {
                    return {
                        validate:true,
                        msg:require ? `请输入${info}` : '',
                    }
                }else{
                    return {
                        validate:false,
                        msg:''
                    }
                }
            }
            //电话号 (投、被、受)
            if (inputItemCode == 'mobile') {
                if(tel.test(innerValue)){
                    return {
                        validate:false,
                        msg:''
                    }
                }else if(innerValue.length == 0){
                    return {
                        validate:true,
                        msg:require ? `请输入${info}` : '',
                    }
                }else{
                    return {
                        validate:true,
                        msg:`请输入正确的${info}`
                    }
                }
            }
            // 身高
            if (inputItemCode == 'height'){
                if (checkRules.length) {
                    let res = {
                        validate:false,
                        msg:''
                    }
                    if (innerValue.length > 0) {
                        let isCheck = checkRules.some((el)=>{
                            let runEval = this.mixinGetValidateForEval(allInfo,el.checkRule)
                            console.log(el.checkRule,runEval)
                            if (runEval) {
                                res = {
                                    validate:true,
                                    msg:el.message
                                }
                            }
                            return runEval
                        })    
                    }else if (innerValue.length == 0){
                        return {
                            validate:true,
                            msg:require ? `请输入${info}` : '',
                        }
                    }
                    return res
                }

                if(innerValue.length <= 3 && innerValue != 0){
                    if (innerValue < 10){
                        return {
                            validate:true,
                            msg:`${title}单位为厘米，请核实，谢谢！`
                        }
                    }
                    return {
                        validate:false,
                        msg:''
                    }
                }else if(innerValue.length == 0){
                    return {
                        validate:true,
                        msg:require ? `请输入${info}` : '',
                    }
                }else{
                    return {
                        validate:true,
                        msg:`请输入正确的${info}`
                    }
                }
            }
            // 体重
            if (inputItemCode == 'weight'){
                if(innerValue.length <= 3 && innerValue != 0){
                    if (innerValue > 200){
                        return {
                            validate:true,
                            msg:`${title}单位为公斤，请核实，谢谢！`
                        }
                    }
                    return {
                        validate:false,
                        msg:''
                    }
                }else if(innerValue.length == 0){
                    return {
                        validate:true,
                        msg:require ? `请输入${info}` : '',
                    }
                }else{
                    return {
                        validate:true,
                        msg:`请输入正确的${info}`
                    }
                }
            }
            // 省市
            if (inputItemCode == 'city') {
                if (innerValue.length == 0) {
                    return {
                        validate:true,
                        msg:require ? `请输入${info}` : '',
                    }
                }else{
                    return {
                        validate:false,
                        msg:``
                    }
                }
            }
            // 地址
            if (inputItemCode == 'address') {
                if (checkRules.length) {
                    let res = {
                        validate:false,
                        msg:''
                    }
                    if (innerValue.length > 0) {
                        let isCheck = checkRules.some((el)=>{
                            let runEval = this.mixinGetValidateForEval(allInfo,el.checkRule)
                            console.log(el.checkRule,runEval)
                            if (runEval) {
                                res = {
                                    validate:true,
                                    msg:el.message
                                }
                            }
                            return runEval
                        })    
                    }else if (innerValue.length == 0){
                        return {
                            validate:true,
                            msg:require ? `请输入${info}` : '',
                        }
                    }
                    return res
                }
                if(addressReg.test(innerValue)){
                    return {
                        validate:false,
                        msg:''
                    }
                }else if(innerValue.length == 0){
                    return {
                        validate:true,
                        msg:require ? `请输入${info}` : '',
                    }
                }else{
                    return {
                        validate:true,
                        msg:`请输入正确的${info}详细地址（至少5个汉字）`
                    }
                }
            }
            // 邮政编码
            if (inputItemCode == 'zipCode') {
                if(zip.test(innerValue)){
                    return {
                        validate:false,
                        msg:''
                    }
                }else if(innerValue.length == 0){
                    /*
                        百年的邮编为非必录，但未使用chooseFlag，此处仅支持百年。---2019-12-24 TgLee
                    */
                    return {
                        validate:false,
                        msg:'',
                    }
                    // return {
                    //     validate:true,
                    //     msg:require ? `请输入${info}` : '',
                    // }
                }else{
                    return {
                        validate:true,
                        msg:`请输入正确的${info}`
                    }
                }
            }
            // 职业
            if (inputItemCode == 'profession') {
                if (innerValue.length == 0) {
                    return {
                        validate:true,
                        msg:require ? `请输入${info}` : '',
                    }
                }else{
                    return {
                        validate:false,
                        msg:``
                    }
                }
            }
            // 邮箱
            if (inputItemCode == 'email') {
                if(validator.isEmail(innerValue)){
                    return {
                        validate:false,
                        msg:''
                    }
                }else if(innerValue.length == 0){
                    return {
                        validate:true,
                        msg:require ? `请输入${info}` : '',
                    }
                }else{
                    return {
                        validate:true,
                        msg:`请输入正确的${info}`
                    }
                }
            }
            // 证件有效止期
            if (inputItemCode == 'certificateValiditiedPeriod') {
                if (innerValue.length == 0) {
                    return {
                        validate:true,
                        msg:require ? `请输入${info}` : '',
                    }
                }else{
                    return {
                        validate:false,
                        msg:''
                    }
                }
            }
            // 户籍
            if (inputItemCode == 'residence') {
                if (innerValue.length == 0) {
                    return {
                        validate:true,
                        msg:require ? `请输入${info}` : '',
                    }
                }else{
                    return {
                        validate:false,
                        msg:``
                    }
                }
            }
            if (inputItemCode == 'income') {
                return {
                    validate:false,
                    msg:''
                }
            }
            // 受益份额
            if (inputItemCode == 'bnfLot') {
                if(innerValue != null && innerValue >= 1 && innerValue <= 100){
                    return {
                        validate:false,
                        msg:''
                    }
                }else if(innerValue == null || innerValue.length == 0){
                    return {
                        validate:true,
                        msg:require ? `请输入${info}` : '',
                    }
                }else{
                    return {
                        validate:true,
                        msg:`请输入${info}(1-100)`
                    }
                }
            }
            // 工作单位
            if(inputItemCode == 'workUnit'){
                if(innerValue.length == 0){
                    return {
                        validate:true,
                        msg:require ? `请输入${info}` : '',
                    }
                }else{
                    return {
                        validate:false,
                        msg:``
                    }
                }
            }
        },
        mixinGetValidateForEval(data,evalStr){
            let appntIncome = '' //投保人年收入
            let insuredIncome = '' //被保人年收入
            let appntHeight = data.appntInfo.height  //投保人身高
            let insuredHeight = data.insuredInfo.height //被保人身高
            let appntWeight = '' //投保人体重
            let insuredWeight = '' //被保人体重
            let toInsuredRelation = '' //与被保人关系
            let appntAddress = data.appntInfo.address //投保人地址
            let insuredAddress = data.insuredInfo.address //被保人地址
            let insuredOccupationCode = '' //被保人职业编码
            let answerValue = '' //健康告知问题答案值（通用）
            let socialSecurity = '' //社保标记
            return eval(evalStr)
        }
    }
}