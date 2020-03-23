<template>
  <div>
    <!-- 地区 -->
    <md-field-item @click="isPickerShow = true" :class="isError?'error2':''" :title="title" :placeholder="remark"
      align='right' :content="areaText">
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
        errorText: '', // 错误提示语
        dataList: [], // 城市的数据
        isPickerShow: false, // 控制选择城市picker的显示隐藏
        areaText: '', // 城市地址的文字
        areaCode: [], // 城市地址的code值
        pickerDefaultValue: [], // 城市默认选中值
      }
    },
    props: {
      // 录入项左边展示文字
      title: {
        type: String,
        default: '省份城市'
      },
      // 获取地区的数据类型 判断json文件
      type: {
        type: Object,
      },
      // 地区的筛选规则
      ruleParams: {
        type: String,
      },
      // 录入项右边要展示的默认文字
      remark: {
        type: String,
        default: '请选择'
      },
      // 默认选中的值
      value: {
        type: Array,
        require: true
      },
      // 是否展示错误提示
      isError: {
        type: Boolean,
        default: false
      }
    },
    created() {
      // 判断是否已经选择了城市 设置默认值
      if (this.value.length) {
        this.getAreaData(this.value)
        this.pickerDefaultValue = [this.value[0].value, this.value[1].value, this.value[2].value]
      }
      // 设置错误提示语
      this.errorText = '请选择' + this.title
      // 获取城市数据
      $hrp_new.getAreaJson({
        code: (this.type && this.type.value) || 'AIXINLIFE'
      }).then((res) => {
        // 如果有城市限制 则根据规则配置
        if (this.ruleParams) {
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
              if (eval(rule)) {
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
    methods: {
      // 城市选择确认事件
      onPickerConfirm() {
        const values = this.$refs.picker.getColumnValues()
        this.getAreaData(values)
      },
      // 根据选中值 配置展示文字
      getAreaData(values) {
        let name = ''
        values.forEach(item => {
          if (item) {
            name = name + ' ' + item.text
          }
        })
        this.areaText = name
        this.areaCode = values
      }
    },
    watch: {
      areaCode: {
        handler() {
          this.$emit('input', this.areaCode)
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
  }
</style>