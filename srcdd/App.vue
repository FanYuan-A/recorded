<template>
  <div id="app" @scroll="_scroll">
    <transition name="fade" mode="out-in">
      <router-view v-wechat-title="$store.getters.getTitle?$store.getters.getTitle:' '"></router-view>
    </transition>
    <global-mask></global-mask>
  </div>
</template>
<script>
  import GlobalMask from '@/components/global/globalMask.vue'
  export default {
    components: {
      [GlobalMask.name]: GlobalMask
    },
    methods:{
      _scroll(event){
        // console.log(event.target.scrollTop)
      }
    }
  }
</script>
<style scoped>
  .fade-enter {
    opacity: 0;
  }

  .fade-leave {
    opacity: 1;
  }

  .fade-enter-active {
    transition: opacity .1s;
  }

  .fade-leave-active {
    opacity: 0;
    transition: opacity .1s;
  }
</style>