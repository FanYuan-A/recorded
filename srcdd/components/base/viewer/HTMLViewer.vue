<template>
  <div v-html="htmlContent" class="viewer"></div>
</template>

<script>
  export default {
    name: "HTMLViewer",

    data(){
      return{
        htmlContent:'',
      }
    },
    mounted() {
      this.show();
    },
    methods:{
      show(){
        let cfg = this.$store.state.common.htmlViewerCfg;
        document.title = cfg.title ? cfg.title : '';

        if(cfg.url && cfg.url !== ''){
          // todo ... http get html content
        }else if(cfg.html && cfg.html !== ''){
          this.htmlContent = cfg.html;
        }
      }
    }
  }
</script>

<style scoped>
  .viewer{background-color: white; width: 100vw; height: 100vh; padding: 30px;}
</style>