const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (production = false) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            production ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            production ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        }
      ]
    },
    plugins: production
      ? [
          new MiniCssExtractPlugin({
            filename: '[name]/index.[contenthash].css',
            chunkFilename: '[name].[id].[contenthash].css'
          })
        ]
      : []
  };
};
