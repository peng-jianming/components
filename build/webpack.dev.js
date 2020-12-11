const webpack = require('webpack');
const paths = require('./paths.config');

const devServerConfigure = () => {
  return {
    // contentBase: paths.distPath(),
    compress: true,
    host: '127.0.0.1',
    port: '8090',
    hot: true,
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    index: 'index.html',
    // watch: true,
    // watchOptions: {
    //   aggregateTimeout: 500,
    //   ignored: /node_modules/,
    // },
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      timings: true,
      chunkModules: false,
      entrypoints: false,
    },
    disableHostCheck: true,
    publicPath: '/',
  };
};

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: devServerConfigure(),
  plugins: [new webpack.HotModuleReplacementPlugin({})]
}