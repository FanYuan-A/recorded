<template>
  <div>
    <!-- checkbox选择项组件 -->
    <md-field-item :title="title">
      <div slot='right' class='checkbox-container'>
        <md-check-box v-for="(item,index) in dataList" :key="index" :name='item.value' v-model='code'
          :label='item.valueLabel' />
      </div>
    </md-field-item>

  </div>
</template>

<script>
  import {
    FieldItem,
    CheckBox
  } from 'mand-mobile'

  export default {
    components: {
      'md-field-item': FieldItem,
      'md-check-box': CheckBox,
    },
    data() {
      return {
        dataList: [], // 数据
        code: '',
        datas: {
          longtime: // 证件长期有效选项
            [{
                valueLabel: '是',
                value: '0'
              },
              {
                valueLabel: '否',
                value: '1'
              }
            ],
          socialSecurity: [{ // 是否拥有社保
              valueLabel: '是',
              value: '1'
            },
            {
              valueLabel: '否',
              value: '0'
            }
          ]
        }
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
        type: String,
        required: true
      },
      // 是否展示错误提示
      isError: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        required: true
      },
      isErrorText: {
        type: String
      }
    },
    created() {
      this.dataList = this.datas[this.type]
      if (this.value) {
        this.code = this.value
      } else {
        this.code = this.dataList[0].value
      }

    },
    methods: {},
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

  /deep/.md-check-box {
    border-radius: @radius-primary;
    min-width: 110px;
    height: 60px;
    border: @border-width-base solid @color-border-base;
    font-size: @font-body-normal;
    font-family: @font-family-base;
    color: @color-text-minor;
    margin: 12px 0px 12px 20px;
    padding: 15px 13px;
    line-height: 26px;

    .md-tag {
      display: none;
    }
  }

  /deep/.md-check-box.is-disabled {
    background: rgba(250, 250, 250, 1);
    border: 1px solid rgba(216, 216, 216, 1);
    color: rgba(216, 216, 216, 1);
  }

  /deep/.md-check-box.is-checked {
    font-size: @font-body-normal;
    font-family: @font-family-base;
    background: @color-primary;
    color: @color-text-base-inverse;
    border: @border-width-base solid @color-primary;
  }

  /deep/.md-check-box:last-child {
    margin-right: 0px;
  }

  /deep/.checkbox-container {
    .checked {
      border: 1px solid @color-primary ;
      color: @color-text-base-inverse ;
      background: @color-primary
    }

    button {
      padding: 0.12rem 0.2rem;
      border: 1px solid @color-border-base ;
      color: @color-text-minor ;
      background: transparent;
      border-radius: @radius-primary ;
      margin-right: 0.2rem
    }

    button:nth-last-child(1) {
      margin-right: 0
    }
  }
</style>