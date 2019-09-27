module.exports = {
  publicPath: './',
  devServer: {
    open: true,
    port: 6978,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ''
        }
      },
      '/draw': {
        target: "e",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/draw': ''
        }
      }
    }
  },
}