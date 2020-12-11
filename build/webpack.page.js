const paths = require("./paths.config");
const fs = require('fs');
const path = require('path');
const deepMerge = require('./deep-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const MANIFEST = 'manifest';
const VENDOR = 'vendor';

function handleHTMLPlugin(key, file, myConfigs, production = false) {
  console.log(key, file);
  const opts = {
    filename: path.join(key, 'index.html').split(/\\/g).join('/'),
    template: file,
    inject: false,
    minify: production
      ? {
          removeComments: true,
          collapseWhitespace: true,
        }
      : false,
    cache: true,
    configs: myConfigs,
    // plugins: {
    //   assetsRetry: fs.readFileSync(require.resolve("assets-retry")),
    //   assetsRetryConfig: feflowConfig.assetsRetryConfig,
    // },
    chunks: production ? [MANIFEST, VENDOR, key] : [key],
    chunksSortMode: "manual",
  };
  return new HtmlWebpackPlugin(opts);
}

module.exports = function(entries, production = false) {
  return {
    plugins: [
      ...Object.entries(entries).map(([key, entryPath]) => {
        const dirName = path.dirname(entryPath);
        // html模板取全局还是局部
        const indexHTML = path.join(dirName, 'index.html');
        const myPage = fs.existsSync(indexHTML)
          ? indexHTML
          : paths.templateEntryPath();
        // html的配置文件取局部还是全局
        const indexConfig = path.join(dirName, 'page.js');
        const globalPageConfig = require(paths.templateEntryConfigPath());
        const myConfigFile = fs.existsSync(indexConfig)
          ? require(indexConfig)
          : globalPageConfig;
        /**
         * 使用Object.assign合并独立配置与全局配置，浅复制追加和替换配置
         */
        const myConfigs = deepMerge({}, globalPageConfig, myConfigFile);

        return handleHTMLPlugin(key, myPage, myConfigs, production);
      }),
    ],
  };
};
