module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? process.env.VUE_APP_ROOT : "/",
  outputDir: "dist",
  assetsDir: "static",

  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/css/base.scss"; 
        `
      }
    }
  },

  configureWebpack: {
    devtool: "source-map"
  },

  devServer: {
    open: true,
    proxy: {
      "/panorama_app/plan_upload/": {
        target: "https://ai.dyrs.com.cn/beta/", // 设置你调用的接口域名和端口号
        changeOrigin: true // 跨域
      }
    }
  }
};
