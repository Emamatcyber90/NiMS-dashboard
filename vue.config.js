var webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.LOGGER_LEVEL': JSON.stringify('info')
      })
    ]
  },
  "baseUrl": process.env.NODE_ENV === 'production'
    ? "/dashboard"
    : "/dashboard-dev",
  "devServer": {
    "port": "8083",
    "public": "0.0.0.0:8083",
    "disableHostCheck": true,
  }
}
