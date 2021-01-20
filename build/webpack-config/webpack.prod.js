const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin({}),
      new TerserPlugin({
        sourceMap: false,
        cache: true,
        parallel: true
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      cacheGroups: {
        default: {
          name: 'manifest',
          chunks: 'initial',
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true
        },
        defaultVendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          minChunks: 1,
          priority: 20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
