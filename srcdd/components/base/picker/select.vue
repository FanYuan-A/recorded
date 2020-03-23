<template>
  <div>
    <!-- select类型录入项 -->
    <md-field-item @click="isPickerShow = true" :class="isError?'error2':''" :title="title" :placeholder="placeholder"
      align='right' :content="text">
      <i class='arrow-right' slot="right"><img :src='arrowImgUrl' alt=''></i>
    </md-field-item>
    <p v-if="isError" class="error" v-text="errorText"></p>

    <!-- picker 弹出层 -->
    <md-picker ref="picker" v-model="isPickerShow" :data="dataList" is-cascade :default-value="pickerDefaultValue"
      @confirm="onPickerConfirm">
    </md-picker>
  </div>
</template>

<script>
  import {
    FieldItem,
    Picker,
  } from 'mand-mobile'

  export default {
    components: {
      'md-field-item': FieldItem,
      'md-picker': Picker,
    },
    data() {
      return {
        arrowImgUrl: require('../../../assets/imgs/insure/arrowRight2.png'), // 右箭头图片src路径
        errorText: '', // 错误提示语
        dataList: [], // 数据
        isPickerShow: false, // 控制picker的显示隐藏
        text: '', // 文字
        code: [],
        pickerDefaultValue: [], // 默认选中值
        bnfLot: [
          [ // 受益比例选项
            {
              text: '10%',
              value: '0.1'
            },
            {
              text: '20%',
              value: '0.2'
            },
            {
              text: '30%',
              value: '0.3'
            },
            {
              text: '40%',
              value: '0.4'
            },
            {
              text: '50%',
              value: '0.5'
            },
            {
              text: '60%',
              value: '0.6'
            },
            {
              text: '70%',
              value: '0.7'
            },
            {
              text: '80%',
              value: '0.8'
            },
            {
              text: '90%',
              value: '0.9'
            },
            {
              text: '100%',
              value: '1'
            }

          ]
        ],
        marital: [
          [{
            text: '未婚',
            value: '0'
          }, {
            text: '已婚',
            value: '1'
          }, {
            text: '离异',
            value: '2'
          }, {
            text: '丧偶',
            value: '3'
          }]
        ]
      }
    },
    props: {
      // 录入项左边展示文字
      title: {
        type: String,
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
      type: {
        type: String
      },
      isErrorText: {
        type: String
      }
    },
    created() {
      //要获取的json数据类型
      let dataType = this.type
      if (this.type == 'marital') {
        dataType = 'marital'
      }
      // 如果配置了数据json的类型则使用
      if (this.relatInfo) {
        if (this.relatInfo.fieldItems) {
          dataType = this.relatInfo.fieldItems[0].value
        }
        if (this.relatInfo.remark) {
          this.placeholder = this.relatInfo.remark
        }
      }

      // 判断是否已经选择了 设置默认值
      if (this.value && this.value.value) {
        this.text = this.value.text
        this.code = this.value
        this.pickerDefaultValue = [this.value.value]
      }
      // 设置错误提示语
      this.errorText = '请选择' + this.title + '（比例总和须为100%）'
      this.dataList = this[dataType]

    },
    methods: {
      // 选择确认事件
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
        this.text = values[0].text
        this.code = {
          text: values[0].text,
          value: values[0].value
        }
      }
    },
    watch: {
      code: {
        handler() {
          this.$emit('input', this.code)
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