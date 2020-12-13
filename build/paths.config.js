const path = require('path');
const glob = require('glob');

class Path {
  constructor({
    sourceName, // 项目总入口
    pagesEntryName, // 页面总入口
    entryName, // 页面入口文件
    pageConfigName, // 页面配置文件
    sourceWideToEntry, // 页面总入口到页面入口文件的宽度
    templateEntryConfig, // 模板的配置文件
    templateEntry, // 模板
    dist // 输出文件位置
  }) {
    this.home = process.cwd();
    this.sourceName = sourceName;
    this.pagesEntryName = pagesEntryName;
    this.entryName = entryName;
    this.pageConfigName = pageConfigName;
    this.templateEntry = templateEntry;
    this.templateEntryConfig = templateEntryConfig;
    this.sourceWideToEntry = sourceWideToEntry;
    this.dist = dist;
  }

  distPath() {
    return path.resolve(this.home, this.dist);
  }

  sourcePath() {
    return path.resolve(this.home, this.sourceName);
  }

  pagesEntryPath() {
    return path.resolve(this.sourcePath(), this.pagesEntryName);
  }

  entryPath() {
    return path.resolve(
      this.pagesEntryPath(),
      this.sourceWideToEntry,
      this.entryName
    );
  }

  pageConfigPath() {
    return path.resolve(
      this.pagesEntryPath(),
      this.sourceWideToEntry,
      this.pageConfigName
    );
  }

  templateEntryPath() {
    return path.resolve(this.home, this.templateEntry);
  }

  templateEntryConfigPath() {
    return path.resolve(this.home, this.templateEntryConfig);
  }

  entryPaths() {
    // 所有页面入口文件的路径
    return glob.sync(this.entryPath());
  }

  pageConfigPaths() {
    // 所有页面配置文件的路径
    return glob.sync(this.pageConfigPath());
  }
}

module.exports = new Path({
  sourceName: 'src',
  pagesEntryName: 'pages',
  entryName: 'entry.js',
  sourceWideToEntry: '**',
  pageConfigName: 'page.js',
  templateEntry: 'template/index.html',
  templateEntryConfig: 'template/page.js',
  dist: 'dist'
});
