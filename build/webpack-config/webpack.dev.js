module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  optimization: {
    runtimeChunk: true
  },
  devServer: {
    hot: 'only',
    compress: true,
    host: '0.0.0.0',
    allowedHosts: 'auto',
    port: '8004',
    client: {
      logging: 'warn',
      overlay: false
    },
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://172.16.10.34:3000'
      }
    }
  }
};
