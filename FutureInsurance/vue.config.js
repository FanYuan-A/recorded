// vue.config.js
module.exports = {
  devServer: {
    open: true,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    hot: true
  },
  publicPath: './',
  assetsDir: "static",
  lintOnSave: false,  // 关闭eslint
}
