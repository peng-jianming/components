<template>
  <el-card class="page-content-card">
    <WaterMark-component :text="$store.state.user.user.user_name">
      <el-scrollbar wrap-class="scrollbar-wrapper" view-class="scrollbar-view">
        <slot></slot>
      </el-scrollbar>
    </WaterMark-component>
  </el-card>
</template>
<script>
import WaterMarkComponent from 'src/modules/component/layout/WaterMark';
export default {
  components: {
    WaterMarkComponent
  }
};
</script>
<style lang="less">
.page-content-card {
  height: 100%;
  margin: 5px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.2) 12px 0 10px !important;
  .el-card__body {
    height: 100%;
    padding: 0;
    .el-scrollbar {
      height: 100%;
      .scrollbar-wrapper {
        height: 100%;
        overflow-x: hidden;
        padding: 10px;
        box-sizing: border-box;
        .scrollbar-view {
          min-height: 100%;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
