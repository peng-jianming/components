<template>
  <el-card class="page-content-card">
    <el-scrollbar wrap-class="scrollbar-wrapper" view-class="scrollbar-view">
      <slot></slot>
    </el-scrollbar>
  </el-card>
</template>
<style lang="less">
.page-content-card {
  height: 100%;
  margin: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 12px 12px 10px !important;
  .el-card__body {
    height: 100%;
    padding: 0;
    .el-scrollbar {
      height: 100%;
      .scrollbar-wrapper {
        height: 100%;
        overflow-x: hidden;
        .scrollbar-view {
          // height: 100%;
          padding: 10px;
        }
      }
    }
  }
}
</style>
