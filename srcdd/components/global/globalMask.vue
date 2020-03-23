<template>
  <div @touchmove.prevent class="globlMask" v-if="globalMaskShow">
    <md-popup v-model="globalMaskShow" :mask-closable="false">
      <div class="md-example-popup md-example-popup-center">
        <md-activity-indicator type="carousel" :size="10"></md-activity-indicator>
      </div>
    </md-popup>
  </div>
</template>
<script>
  import {
    Popup,
    ActivityIndicator
  } from 'mand-mobile'
  export default {
    name: 'global-mask',
    components: {
      [Popup.name]: Popup,
      [ActivityIndicator.name]: ActivityIndicator,
    },
    data() {
      return {}
    },
    computed: {
      globalMaskShow: {
        get: function () {
          return this.$store.getters.getGlobalMaskShow
        },
        set: function () {}
      }
    },
  }
</script>
<style lang="less" scoped>
  /deep/.md-popup-mask {
    background-color: @color-mask;
  }

  .globlMask {
    background-color: @color-mask;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;

    img {
      margin: 0;
      padding: 0;
      display: block;
      width: 140px;
      opacity: 0.6;
    }
  }
</style>