const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        default: {
          name: 'manifest',
          priority: 10,
          reuseExistingChunk: true
        },
        defaultVendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css'
    }),
    new CompressionPlugin({
      test: /\.(css|js)$/i
    })
  ]
};
