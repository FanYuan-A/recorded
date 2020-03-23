<template>
  <div class="descPopup">
    <md-popup v-model="isShowDesc" position="bottom">
      <div class="desc_popup">
        <div class="desc_title" v-if="name">
          <span>{{name}}</span>
          <md-icon name="close" size="md" class="desc_popup_close" @click="isShowDesc=false"></md-icon>
        </div>
        <div class="desc_content">{{desc}}</div>
        <div class="desc_footer">
          <!-- <md-button type="primary" @click="isShowDesc=false">完成</md-button> -->
        </div>
      </div>
    </md-popup>
  </div>
</template>

<script>
  import {
    Button,
    Icon,
    Popup,
  } from 'mand-mobile'
  export default {
    name: 'desc-popup',
    props: {
      name: {
        type: String,
      },
      desc: {
        type: String,
      },
      value: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    components: {
      [Popup.name]: Popup,
      [Button.name]: Button,
      [Icon.name]: Icon,
    },
    data() {
      return {
        isShowDesc: false
      }
    },
    watch: {
      isShowDesc: {
        handler() {
          this.$emit('input', this.isShowDesc)
        }
      },
      value: {
        handler() {
          this.isShowDesc = this.value
        }
      }
    }
  }
</script>


<style lang="less" scoped>
  /deep/.md-popup {
    .desc_popup {
      background-color: @color-bg-content;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding: 0px 30px;

      .desc_title {
        height: 94px;
        line-height: 94px;
        font-size: @font-title-large;
        font-family: PingFangSC;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        border-bottom: @border-width-base solid #ECECEC;

        .desc_popup_close {
          position: absolute;
          right: 30px;
          top: 30px;
        }
      }

      .desc_content {
        flex-grow: 1;
        padding-top: 40px;
        line-height: 42px;
        font-size: @font-body-large;
      }

      .desc_footer {
        padding: 30px 0px;

        .md-button {
          height: 88px;
          background: @color-primary;
          border-radius: @radius-minor;
          font-size: @font-title-large;
          font-family: @font-family-base;
          color: @color-text-base-inverse;
        }

        .md-button:after {
          content: none;
        }
      }
    }
  }
</style>