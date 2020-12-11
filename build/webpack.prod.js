module.exports = {
  mode: 'production',
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[name]/index.[contenthash].css',
    //   chunkFilename: '[name].[id].[contenthash].css',
    // }),
  ],
  optimization: {
    minimize: true,
    // minimizer: [
    //   new OptimizeCSSAssetsPlugin({}),
    //   new TerserPlugin({
    //     sourceMap: false,
    //   }),
    // ],
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
          priority: -20,
          reuseExistingChunk: true,
        },
        defaultVendors: {
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    },
  },
}