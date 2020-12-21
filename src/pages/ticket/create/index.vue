<template>
  <el-card class="content">
    <el-scrollbar wrap-class="scrollbar-wrapper" view-class="scrollbar-view">
    </el-scrollbar>
  </el-card>
</template>
<style lang="less">
.content {
  height: 100%;
  margin: 5px;
  .el-card__body {
    height: 100%;
    padding: 0;
    .el-scrollbar {
      height: 100%;
      .scrollbar-wrapper {
        height: 100%;
        overflow-x: hidden;
        .scrollbar-view {
          height: 100%;
        }
      }
    }
  }
}
</style>
