const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval-module-source-map',
  devServer: {
    compress: true,
    host: '127.0.0.1',
    port: '8090',
    hot: true,
    historyApiFallback: true,
    index: 'index.html',
    clientLogLevel: 'silent',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      },
      proxy: {
        '/ticket': {
          target: 'http://localhost:8090/ticket/index.html'
        }
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin({})]
};
