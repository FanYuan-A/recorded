<template>
  <div class="calAreaPiker">
    <md-field-item :title="title">
      <div slot="default" v-if="desc">
        <img src="../../assets/imgs/insure/desc_icon.png" class="desc_icon" @click="isShowDesc=true">
      </div>
      <div slot="right" @click="isShow=true">
        <p>
          {{currentLabel.provinceLabel}}{{currentLabel.cityLabel?"&nbsp;"+currentLabel.cityLabel:""}}{{currentLabel.countryLabel?"&nbsp;"+currentLabel.countryLabel:""}}
          <img class="arrow-right" src="../../assets/imgs/insure/arrowRight2.png">
        </p>
      </div>
    </md-field-item>
    <md-picker ref="areaPiker" v-if="areaData" :cols="3" v-model="isShow" :data="areaData" is-cascade
      @confirm="onSelected" :default-value="pickerDefaultValue"></md-picker>
    <desc-popup v-model="isShowDesc" :desc="desc"></desc-popup>
  </div>
</template>

<script>
  import {
    Picker,
    FieldItem,
    Icon,
  } from 'mand-mobile'
  import descPopup from '@/components/global/descPopup.vue'
  import $hrp_new from '@/api/hrp_new'
  export default {
    name: 'cal-area-piker',
    components: {
      [FieldItem.name]: FieldItem,
      [Icon.name]: Icon,
      [Picker.name]: Picker,
      'desc-popup': descPopup
    },
    props: {
      title: {
        type: String,
        default: '地区选择'
      },
      limit: {
        type: Object,
        // required: true
      },
      ruleParams: {
        type: Object,
        required: true
      },
      desc: {
        type: String,
        // required: true
      },
      value: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        currentValue: {
          provinceCode: '',
          provinceLabel: '',
          cityCode: '',
          cityLabel: '',
          countryCode: '',
          countryLabel: ''
        },
        currentLabel: {
          provinceLabel: '',
          cityLabel: '',
          countryLabel: ''
        },
        areaData: null,
        isShow: false,
        isShowDesc: false,
        pickerDefaultValue: []
      }
    },
    computed: {

    },
    created() {
      $hrp_new.getAreaJson({
        code: this.limit.value
      }).then(data => {
        console.log(data)
        this.areaData = data
      })
      console.log('########################')

      console.log(JSON.stringify(this.value))

      // this.pickerDefaultValue = [this.value.provinceCode, this.value.cityCode, this.value.countryCode]
      this.currentLabel.provinceLabel = this.value.provinceLabel || '请选择地区'
      this.currentLabel.cityLabel = this.value.cityLabel
      this.currentLabel.countryLabel = this.value.countryLabel
    },
    mounted() {
      let _this = this
      _this.$nextTick(function () {
        // setTimeout(() => {
        //   _this.$refs.areaPiker.refresh()
        //   let a = _this.$refs.areaPiker.getColumnValues()
        //   _this.currentLabel.provinceLabel = _this.$refs.areaPiker.getColumnValue(0).text
        //   _this.currentLabel.cityLabel = _this.$refs.areaPiker.getColumnValue(1).text
        //   _this.currentLabel.countryLabel = _this.$refs.areaPiker.getColumnValue(2).text
        // }, 100)

      })
    },
    watch: {
      currentValue: {
        handler() {
          this.$emit('input', this.currentValue)
        },
        deep: true
      },
      value: {
        handler() {
          console.log('########################')
          console.log(JSON.stringify(this.value))
          // this.pickerDefaultValue = [this.value.provinceCode, this.value.cityCode, this.value.countryCode]
          this.currentLabel.provinceLabel = this.value.provinceLabel || '请选择地区'
          this.currentLabel.cityLabel = this.value.cityLabel
          this.currentLabel.countryLabel = this.value.countryLabel
        },
        deep: true
      },
    },
    methods: {
      onSelected(data) {
        console.log(data)
        this.currentValue.provinceCode = data[0] && data[0].value ? data[0].value : ''
        this.currentValue.cityCode = data[1] && data[1].value ? data[1].value : ''
        this.currentValue.countryCode = data[2] && data[2].value ? data[2].value : ''
        this.currentValue.provinceLabel = data[0] && data[0].text ? data[0].text : ''
        this.currentValue.cityLabel = data[1] && data[1].text ? data[1].text : ''
        this.currentValue.countryLabel = data[2] && data[2].text ? data[2].text : ''
        this.currentLabel.provinceLabel = data[0] && data[0].text ? data[0].text : ''
        this.currentLabel.cityLabel = data[1] && data[1].text ? data[1].text : ''
        this.currentLabel.countryLabel = data[2] && data[2].text ? data[2].text : ''
      }
    }

  }
</script>

<style lang="less" scoped>
  /deep/.md-field-item {
    .desc_icon {
      width: 28px;
      height: 28px;
      padding-top: 8px;
    }

    .md-field-item-content {
      min-height: 60px;
      padding: 24px 0px;

      .md-field-item-title {
        font-size: @font-body-large;
        max-width: 196px;
        line-height: 39px;
      }

      .md-field-item-right {
        min-height: 60px;
        font-size: 0px;
        max-width: 76%;

        .arrow-right {
          width: 0.29rem;
          height: 0.24rem;
          margin-left: 0.14rem;

          img {
            width: 100%;
          }
        }
      }

      .md-field-item-right {
        p {
          font-size: @font-body-large;
          font-family: @font-family-base;
          color: @color-text-base;
          line-height: 28px;
        }

        p.price {
          font-size: @font-body-large;
          font-family: @font-family-base;
          color: @color-text-caption;
        }

        i {
          font-size: @font-minor-normal;
          color: @color-primary;
          line-height: 28px;
          width: 29px;
        }
      }
    }
  }
</style>