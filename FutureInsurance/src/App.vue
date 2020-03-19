<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>

  export default {
    name: 'app',
  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
  }

  #app {
    width: 100%;
    height: 100%;
    background: #F2F2F2;
  }

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }

  .router-fade-enter, .router-fade-leave-to {
    opacity: 0;
  }

  .wrapper {
    width: 100%;
    height: 100%;
    -background: #F5F5F9;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
  }

  .main {
    position: relative;
    flex: 1;
    -webkit-flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: .44rem;
  }

  .main .submitBtn {
    position: fixed;
    bottom: 0;
  }
</style>
