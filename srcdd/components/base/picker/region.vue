<template>
  <div>
    <!-- 地区 -->
    <md-field-item @click="isPickerShow = true" :class="isError?'error2':''" :title="title" :placeholder="placeholder"
      align='right' :content="text">
      <i class='arrow-right' slot="right"><img :src='arrowImgUrl' alt=''></i>
    </md-field-item>
    <p v-if="isError" class="error" v-text="errorText"></p>

    <!-- 选择城市的picker 弹出层 -->
    <md-picker ref="picker" v-model="isPickerShow" :data="dataList" :cols="3" is-cascade
      :default-value="pickerDefaultValue" @confirm="onPickerConfirm">
    </md-picker>
  </div>
</template>

<script>
  import {
    FieldItem,
    Picker,
  } from 'mand-mobile'
  import $hrp_new from '@/api/hrp_new'

  export default {
    components: {
      'md-field-item': FieldItem,
      'md-picker': Picker,
    },
    data() {
      return {
        arrowImgUrl: require('../../../assets/imgs/insure/arrowRight2.png'), // 右箭头图片src路径
        errortext: '', // 错误提示语
        dataList: [], // 城市的数据
        isPickerShow: false, // 控制选择城市picker的显示隐藏
        text: '', // 城市地址的文字
        code: [],
        pickerDefaultValue: [], // 城市默认选中值
      }
    },
    props: {
      // 录入项左边展示文字
      title: {
        type: String,
        default: '省份城市'
      },
      relatInfo: {
        type: Object,
      },
      // 选中的值
      value: {
        type: Object,
        required: true
      },
      // 是否展示错误提示
      isError: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        required: true
      },
      isErrorText: {
        type: String
      },
      type: {
        type: String
      }
    },
    created() {
      //要获取的城市json数据类型(默认爱心人寿)
      let cityDataType = 'AIXINLIFE'
      // 如果配置了数据json文件的类型则使用
      if (this.relatInfo) {
        if (this.relatInfo.fieldItems) {
          cityDataType = this.relatInfo.fieldItems[0].value
        }
        if (this.relatInfo.remark) {
          this.placeholder = this.relatInfo.remark
        }
      }
      // 判断是否已经选择了城市 设置默认值
      console.log(this.value)
      if (this.value && this.value.provinceCode) {
        this.text = this.value.provinceLabel + ' ' + this.value.cityLabel + ' ' + this.value.countryLabel
        // this.pickerDefaultValue = [this.value.provinceCode, this.value.cityCode, this.value.countryCode]
        // setTimeout(() => {
        //   _this.$refs.picker.refresh()
        // }, 300)
      }
      // 设置错误提示语
      this.errortext = '请选择' + this.title
      // 获取城市数据
      $hrp_new.getAreaJson({
        code: cityDataType
      }).then((res) => {
        // 如果有城市限制 则根据规则配置
        if (this.relatInfo.rule) {
          let area = [
            []
          ]
          for (let j = 0; j < res[0].length; j++) {
            let nowprovince = res[0][j]
            let provinceCode = nowprovince.value
            let city = {
              text: nowprovince.text,
              value: nowprovince.value,
              children: []
            }
            let lan = nowprovince.children.length
            for (let c = 0; c < lan; c++) {
              let cityCode = nowprovince.children[c].value
              if (eval(this.relatInfo.rule)) {
                city.children.push(nowprovince.children[c])
              }
            }
            if (city.children.length) {
              area[0].push(city)
            }
          }
          this.dataList = area
        } else {
          this.dataList = res
        }
      })

    },
    computed: {
      errorText() {
        if (this.isErrorText) {
          return this.isErrorText
        }
        return this.errortext
      }
    },
    methods: {
      // 城市选择确认事件
      onPickerConfirm() {
        const values = this.$refs.picker.getColumnValues()
        this.getAreaData(values)
        let result = {
          type: this.type,
          value: false
        }
        this.$emit('checkresult', result)
      },
      // 根据选中值 配置展示文字
      getAreaData(values) {
        let name = ''
        values.forEach(item => {
          if (item) {
            name = name + ' ' + item.text
          }
        })
        this.text = name
        this.code = {
          provinceLabel: values[0].text,
          provinceCode: values[0].value,
          cityLabel: values[1].text,
          cityCode: values[1].value,
          countryLabel: values[2].text,
          countryCode: values[2].value
        }
      }
    },
    watch: {
      code: {
        handler() {
          this.$emit('input', this.code)
        },
        deep: true
      },
      value: {
        handler() {
          console.log(this.value)
          if (this.value && this.value.provinceCode) {
            this.text = this.value.provinceLabel + ' ' + this.value.cityLabel + ' ' + this.value.countryLabel
            // this.pickerDefaultValue = [this.value.provinceCode, this.value.cityCode, this.value.countryCode]
            // setTimeout(() => {
            //   _this.$refs.picker.refresh()
            // }, 300)
            // alert(JSON.stringify(this.pickerDefaultValue))
          }
        },
        deep: true
      }
    }
  }
</script>

<style lang="less" scoped>
  /deep/ .md-field-item-content {
    padding: 0;
  }

  .arrow-right {
    width: 0.29rem;
    height: 0.24rem;
    margin-left: 0.14rem;

    img {
      width: 100%
    }
  }

  .error {
    font-size: 0.24rem;
    color: #ff5257;
    margin-top: 0.2rem;
  }

  .error2 {

    /deep/ .md-field-item-content:before,
    /deep/.md-cell-item-body:before {
      height: 1px !important;
      background: #ff5257 !important;
    }

    /deep/ .md-field-item-content:before {
      border-bottom: 0;
    }
  }
</style>