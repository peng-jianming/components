const path = require('path');
const paths = require('./paths.config');
const devConfig = require('./webpack-config/webpack.dev');
const prodConfig = require('./webpack-config/webpack.prod');
const htmlConfig = require('./webpack-config/webpack.html');
const cssConfig = require('./webpack-config/webpack.css');
const outputConfig = require('./webpack-config/webpack.output');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');

const entryConfigure = () => {
  const entries = {};
  paths.entryPaths().forEach((item) => {
    const result = path.relative(paths.pagesEntryPath(), item);
    const key = path.dirname(result).split(/\\/g).join('/');
    entries[key] = item;
  });
  return entries;
};
const imageLoaderConfigure = () => {
  return {
    test: /\.(png|jpe?g|gif|svg)$/,
    type: 'asset',
    generator: {
      filename: 'img/[name].[hash:7][ext]'
    },
    parser: {
      dataUrlCondition: {
        maxSize: 10000
      }
    }
  };
};
const fontsLoaderConfigure = () => {
  return {
    test: /\.(woff2?|eot|ttf|otf)$/,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name].[hash:7][ext]'
    }
  };
};
const babelLoaderConfigure = () => {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader'
      }
    ]
  };
};
const vueLoaderConfigure = () => {
  return {
    test: /\.vue$/,
    loader: 'vue-loader'
  };
};

const baseConfig = {
  entry: entryConfigure,
  module: {
    rules: [
      imageLoaderConfigure(),
      fontsLoaderConfigure(),
      babelLoaderConfigure(),
      vueLoaderConfigure()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new ESLintPlugin({
      context: paths.src,
      extensions: ['.js', '.vue'],
      exclude: ['node_modules']
    }),
    new CopyPlugin({
      patterns: [path.resolve(__dirname, '../template/favicon.ico')]
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
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    'element-ui': 'ELEMENT',
    lodash: '_',
    axios: 'axios',
    moment: 'moment'
  },
  performance: false,
  stats: {
    preset: 'errors-only',
    builtAt: true
  }
};

module.exports = (env) => {
  const config = env.production ? prodConfig : devConfig;
  return merge(
    baseConfig,
    config,
    htmlConfig(entryConfigure(), env.production),
    cssConfig(env.production),
    outputConfig(env.production)
  );
};
