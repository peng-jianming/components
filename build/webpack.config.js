const path = require('path');
const paths = require('./paths.config');
const devConfig = require('./webpack-config/webpack.dev');
const prodConfig = require('./webpack-config/webpack.prod');
const htmlConfig = require('./webpack-config/webpack.html');
const cssConfig = require('./webpack-config/webpack.css');
const outputConfig = require('./webpack-config/webpack.output');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const { merge } = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader');

const isProduction = process.env.NODE_ENV === 'production';

const entryConfigure = () => {
  const entries = {};
  paths.entryPaths().forEach(item => {
    const result = path.relative(paths.pagesEntryPath(), item);
    const key = path
      .dirname(result)
      .split(/\\/g)
      .join('/');
    entries[key] = item;
  });
  return entries;
};
const imageLoaderConfigure = () => {
  return {
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          outputPath: 'images',
          name: '[name].[hash:7].[ext]',
          limit: 10000
        }
      }
    ]
  };
};
const fontsLoaderConfigure = () => {
  return {
    test: /\.(woff2?|eot|ttf|otf)$/i,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: '[name].[hash:7].[ext]',
      outputPath: 'fonts'
    }
  };
};
const babelLoaderConfigure = () => {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      'thread-loader',
      { loader: 'babel-loader', options: { cacheDirectory: true } }
    ]
  };
};
const vueLoaderConfigure = () => {
  return {
    test: /\.vue$/,
    exclude: /node_modules/,
    use: ['thread-loader', 'vue-loader']
  };
};
const eslintLoaderConfigure = () => {
  return {
    enforce: 'pre',
    test: /\.(js|vue)$/,
    exclude: /node_modules/,
    use: ['thread-loader', 'eslint-loader']
  };
};

const baseConfig = {
  entry: entryConfigure,
  module: {
    rules: [
      imageLoaderConfigure(),
      fontsLoaderConfigure(),
      babelLoaderConfigure(),
      vueLoaderConfigure(),
      eslintLoaderConfigure()
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', paths.distPath()]
    }),
    new VueLoaderPlugin(),
    new ProgressBarPlugin({
      format: `  build [:bar]  ${chalk.green.bold(
        ':percent'
      )} (:elapsed seconds) :msg`,
      clear: true
    })
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.json', '.vue']
  },
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter'
  },
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    entrypoints: false
  }
};

module.exports = () => {
  const config = isProduction ? prodConfig : devConfig;
  return merge(
    baseConfig,
    config,
    htmlConfig(entryConfigure(), isProduction),
    cssConfig(isProduction),
    outputConfig(isProduction)
  );
};
