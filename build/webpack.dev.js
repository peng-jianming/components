const webpack = require('webpack');
const paths = require('./paths.config');

const devServerConfigure = () => {
  return {
    contentBase: paths.distPath(),
    host: '127.0.0.1',
    port: '8090',
    hot: true,
    clientLogLevel: 'silent'
  };
};

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: devServerConfigure(),
  plugins: [new webpack.HotModuleReplacementPlugin({})]
}