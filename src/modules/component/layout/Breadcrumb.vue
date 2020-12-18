<template>
  <div class="page-bread-crumb">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <div class="page-history">
      <el-tag size="small " closable effect="dark">
        123123
      </el-tag>
    </div>
  </div>
</template>
<style lang="less">
.page-bread-crumb {
  .el-card {
    height: 50px;
  }
  .page-history {
    box-sizing: border-box;
    height: 40px;
    padding: 8px 10px;
    border-bottom: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>
