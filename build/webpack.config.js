const fs = require('fs');
const path = require('path');
const paths = require('./paths.config');
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const { merge } = require("webpack-merge");
const { VueLoaderPlugin } = require('vue-loader');
const deepMerge = require('./deep-merge');
const HTMLPlugin = require('./webpack.page');

const DEV = "development";

const entryConfigure = () => {
  const entries = {};
  paths.entryPaths().forEach((item) => {
    const result = path.relative(paths.pagesEntryPath(), item);
    const key = path.dirname(result).split(/\\/g).join('/');
    entries[key] = item;
  });
  return entries;
};
const outputConfigure = () => {
  return {
    filename: '[name]/index.[hash].js',
    chunkFilename: '[name].[hash].js',
    // publicPath: '/',
    path: paths.distPath()
  };
};
const htmlConfigure = (key, config) => {
  return {
    filename: path.join(key, 'index.html').split(/\\/g).join('/'),
    template: paths.templateEntryPath(),
    configs: config,
    chunks: [key],
    inject: false,
    cache: true,
  };
};
const htmlPluginConfigures = () => {
  // 输出与入口同样的文件目录结构,并且拿到对应页面的配置文件合并(局部覆盖全部)
  const globalPageConfig = require(paths.templateEntryConfigPath());
  return Object.keys(entryConfigure()).map((key) => {
    const pageConfigPath = paths.pageConfigPaths().find((path) => {
      return path.includes(key);
    });
    const pageConfig = fs.existsSync(pageConfigPath)
      ? require(pageConfigPath)
      : {};
    const config = deepMerge(globalPageConfig, pageConfig)
    return new HtmlWebpackPlugin(htmlConfigure(key, config));
  });
};
const resolveConfigure = () => {
  return {
    alias: {
      src: path.resolve(__dirname, "../src"),
    },
  };
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
    use: ['thread-loader', 'babel-loader']
  };
};
const vueLoaderConfigure = () => {
  return {
    test: /\.vue$/,
    use: ['thread-loader', 'vue-loader']
  };
};
const cssLoaderConfigure = () => {
  return {
    test: /\.css$/,
    use: [
      'vue-style-loader',
      'css-loader',
      'postcss-loader'
    ]
  };
};
const lessLoaderConfigure = () => {
  return {
    test: /\.less$/,
    use: [
      'vue-style-loader',
      'css-loader',
      'postcss-loader',
      'less-loader'
    ]
  };
};

const baseConfig = {
  entry: entryConfigure,
  output: outputConfigure(),
  module: {
    rules: [
      imageLoaderConfigure(),
      fontsLoaderConfigure(),
      babelLoaderConfigure(),
      vueLoaderConfigure(),
      cssLoaderConfigure(),
      lessLoaderConfigure()
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // ...htmlPluginConfigures(),
    new ProgressBarPlugin({
      format: `  build [:bar]  ${chalk.green.bold(':percent')} (:elapsed seconds) :msg`,
      clear: true,
    }),
    new VueLoaderPlugin()
  ],
  resolve: resolveConfigure(),
  externals: {
    vue: 'Vue'
  }
};

module.exports = () => {
  const config = process.env.NODE_ENV === DEV ? devConfig : prodConfig;
  return merge(baseConfig, config, HTMLPlugin(entryConfigure()));
};
