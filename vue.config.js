module.exports = {
  lintOnSave: false,
  publicPath: './',
  devServer: {
    proxy: {
        '/api/': {
            target: 'http://localhost:8080/',
            pathRewrite: {
                '^/api': '/mock'
            }
        }
    }
  }
}
