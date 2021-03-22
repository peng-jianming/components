const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval-module-source-map',
  devServer: {
    compress: true,
    host: 'www.test.com',
    port: '8090',
    hot: true,
    historyApiFallback: true,
    index: 'index.html',
    clientLogLevel: 'silent',
    disableHostCheck: true,
    proxy: {
      '/weixin': {
        target: 'http://localhost:3000'
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin({})]
};
