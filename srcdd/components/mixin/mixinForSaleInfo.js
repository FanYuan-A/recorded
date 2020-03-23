export default {
    filters:{
        // 承保范围过滤器
        insuredAgeRangeFilter(val){
            if (val == 'D') {
                return '天'
            }else if (val == 'M') {
                return '个月'
            }else if (val == 'Y') {
                return '周岁'
            }
        },
        stepUnitFilter(val){
            if (val == 'W') {
                return '万'
            }else if (val == 'Q') {
                return '千'
            }else if (val == 'Y' || val == 'Y1') {
                return '元'
            }
        }
    },
    methods:{
        // 获取年龄
        getBirthAge(param){
            let that = this
            let stringToDate = function(string){
                return new Date(Date.parse(string.replace(/-/g, '/')))
            }
            let getDateDiff = function(date1,date2){
                var d1 = stringToDate(date1)
                var d2 = stringToDate(date2)
                return (d2.getTime()-d1.getTime())/(1000*3600*24) + 1
            }
            let getAfterDate = function(dayCount) {
                var date = new Date()
                date.setDate(date.getDate() + dayCount) //获取dayCount天后的日期
                return date
            }
            let getAge = function(strDate,dayCount) {
                //strDate为日期，dayCount为当前日期的dayCount天后，不传时dayCount=undefined
                var today  = new Date()
                if(dayCount != undefined){
                    today = getAfterDate(dayCount)
                }
                var b = strDate.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
                if (b == null) {
                    return null
                } else {
                    // var year = b[1] * 1
                    var month = b[3] * 1
                    var day = b[4] * 1
                    var nowY = today.getFullYear()
                    var age = nowY - b[1]
                    if (today.getMonth() + 1 < month) {
                        age--
                    } else if (today.getMonth() + 1 == month
                            && today.getDate() < day) {
                        age--
                    } else if (age < 1) {
                        var dayNum = getDateDiff(strDate, nowY + '-' + (today.getMonth() + 1) + '-' + today.getDate())
                        if (dayNum < 28) {
                            age--
                        }
                    }
                    return age
                }
            }

            let birthday = param ? param : '2019-8-13' // 防止日期计算出现NaN
            var age = getAge(birthday,that.validSpan)
            // console.log('age',age);
            var birthAge = ''
            if(age < 1){
                birthAge = getDateDiff(birthday,that.getDate().join('-'))+'D'
            }else{
                birthAge = age + 'Y'
            }
            var birthAgeUnit = birthAge.substring(birthAge.length - 1)
            var birthAgeNum = birthAge.substring(0,birthAge.length - 1)
            console.warn('birthAge',birthAge,birthAgeNum,birthAgeUnit)
            return {
                birthAge:birthAge,
                birthAgeNum:birthAgeNum,
                birthAgeUnit:birthAgeUnit
            }
        },
        // 获取日期，返回值是[年，月，日]
        getDate(param){
            var toString = Object.prototype.toString
            var date = toString.call(param) == '[object Date]' ? param : new Date()
            var dateToday = [
                (date.getFullYear()).toString(),
                (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString(),
                date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString()
            ]
            return dateToday
        },
        // 计算过去或未来的某一特定日期
        getRangeDate(type,originDate,num,unit){
            // type:past-算过去的日期，future-算未来的日期
            // originDate:原日期（数组）
            // num：据目标日期的数值
            // unit：据目标日期数值的单位
            var that = this
            var year = parseInt(originDate[0])
            var month = parseInt(originDate[1]) - 1
            var day = parseInt(originDate[2])
            var dateString = originDate.join('-')
            var numInt = parseInt(num)
            if (type == 'past') {
                var past = {
                    D:function(){
                        var date = new Date(dateString)
                        date.setDate(day - numInt)
                        console.log('past-D：',that.getDate(date))
                        return that.getDate(date)
                    },
                    M:function(){
                        var date = new Date(dateString)
                        date.setMonth(month - numInt)
                        console.log('past-M：',that.getDate(date))
                        return that.getDate(date)
                    },
                    Y:function(){
                        var date = new Date(dateString)
                        date.setFullYear(year - numInt - 1)
                        var dateArr = that.getDate(date)
                        date.setDate(parseInt(dateArr[2]) + 1)
                        console.log('past-Y：',that.getDate(date))
                        return that.getDate(date)
                    }
                }
                return past[unit]().join('-')
            }else if (type == 'future') {
                var future = {
                    D:function(){
                        var date = new Date(dateString)
                        date.setDate(day + numInt)
                        console.log('future-D：',that.getDate(date))
                        return that.getDate(date)
                    },
                    M:function(){
                        var date = new Date(dateString)
                        date.setMonth(month + numInt)
                        console.log('future-M：',that.getDate(date))
                        return that.getDate(date)
                    },
                    Y:function(){
                        var date = new Date(dateString)
                        date.setFullYear(year + numInt)
                        console.log('future-Y：',that.getDate(date))
                        return that.getDate(date)
                    }
                }
                return future[unit]().join('-')
            }else if (type == 'pastNear'){
                var pastNear = {
                    D:function(){
                        var date = new Date(dateString)
                        date.setDate(day - numInt)
                        console.log('pastNear-D：',that.getDate(date))
                        return that.getDate(date)
                    },
                    Y:function(){
                        var date = new Date(dateString)
                        date.setFullYear(year - numInt)
                        console.log('pastNear-Y：',that.getDate(date))
                        return that.getDate(date)
                    }
                }
                return pastNear[unit]().join('-')
            }
        },
        // 获取两个日期的中间日期
        getMiddleDate(birthdayMaxDate,birthdayMinDate){
            let birthdayMaxDateStamp = new Date(birthdayMaxDate).getTime()
            let birthdayMinDateStamp = new Date(birthdayMinDate).getTime()
            let rangeStamp = (birthdayMaxDateStamp - birthdayMinDateStamp)/2
            let birthdayStamp = birthdayMinDateStamp + rangeStamp
            let birthday = this.getDate(new Date(birthdayStamp)).join('-')
            console.log('birthdayDate',birthday)
            return birthday
        },
        // 获取保额保费的计算倍率
        getRate(unit){
            if (unit == 'W') {
                return 10000
            }else if (unit == 'Q') {
                return 1000
            }else if (unit == 'Y' || unit == 'Y1') {
                return 1
            }
        },
        // 获取形如28D、10Y表示年龄的字符串的数字和单位
        substringNumAndUnit(data){
            if(!data){
                return{
                    num:0,
                    unit:'D'
                }
            }
            let num = data.substring(0,data.length - 1)
            let unit = data.substring(data.length - 1)
            return {num,unit}
        },
    }
}