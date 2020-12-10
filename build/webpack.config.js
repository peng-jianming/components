const path = require('path');
const glob = require('glob');

const entryConfigure = () => {
  const entries = {};
  const pagesEntry = path.resolve(__dirname,'../src/pages');
  const pathsFormat = path.resolve(pagesEntry, '**', 'entry.js');
  const paths = glob.sync(pathsFormat)
  paths.forEach((item) => {
    const result = path.relative(pagesEntry, item);
    const key = path.dirname(result).split(/\\/g).join('/');
    entries[key] = item;
  });
  return entries;
};

const outputConfigure = () => {
  return {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/',
    path: path.resolve(__dirname, '../distss')
  };
};


module.exports = {
  entry: entryConfigure,
  output: outputConfigure(),
}