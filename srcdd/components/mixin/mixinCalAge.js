export default{
  methods: {
    // 由生日算年龄
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
  }
}