<template>
  <div class="flex-content-box">
    <div class="flex-content-item flex-content-item-top">
      <slot name="flex-content-item-top"></slot>
    </div>
    <div class="flex-content-item flex-content-item-body">
      <!-- <md-scroll-view ref="scrollView" :scrolling-x="false"> -->
      <slot name="flex-content-item-body"></slot>
      <!-- </md-scroll-view> -->
    </div>
    <div class="flex-content-item flex-content-item-bottom">
      <slot name="flex-content-item-bottom"></slot>
    </div>
  </div>
</template>

<script>
  import {
    ScrollView
  } from 'mand-mobile'
  export default {
    name: 'flex-content-box',
    components: {
      [ScrollView.name]: ScrollView,
    },
    data() {
      return {}
    },
    created() {},
    mounted() {
      this.resize()
      let _this = this
      window.addEventListener('resize', _this.resize)
    },
    updated() {
      this.resize()
    },
    methods: {
      resize() {
        let topHeight = document.getElementsByClassName('flex-content-item-top')[0].offsetHeight
        let bottomHeight = document.getElementsByClassName('flex-content-item-bottom')[0].offsetHeight
        document.getElementsByClassName('flex-content-item-body')[0].style.paddingTop = topHeight + 'px'
        document.getElementsByClassName('flex-content-item-body')[0].style.paddingBottom = bottomHeight + 'px'
      }
    }
  }
</script>
<style lang="less">
  .flex-content-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .flex-content-item {
      width: 100%;

    }

    .flex-content-item.flex-content-item-top {
      position: fixed;
      left: 0;
      top: 0;
    }

    .flex-content-item.flex-content-item-body {
      // flex-grow: 1;
      overflow: hidden;
      overflow-y: scroll;
    }

    .flex-content-item.flex-content-item-bottom {
      position: fixed;
      left: 0;
      bottom: 0;
    }
  }
</style>