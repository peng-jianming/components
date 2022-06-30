const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (production = false) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            production ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            production ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            'postcss-loader',
            'less-loader'
          ]
        }
      ]
    },
    plugins: production
      ? [
          new MiniCssExtractPlugin({
            filename: 'static/[name]/index.[contenthash].css',
            chunkFilename: 'static/[name].[id].[contenthash].css'
          })
        ]
      : []
  };
};
