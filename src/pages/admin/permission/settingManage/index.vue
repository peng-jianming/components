<template>
  <div class="setting-manage">
    <tree-component
      class="setting-manage-left"
      :current-data.sync="currentData"
    />
    <detail-component
      class="setting-manage-right"
      :current-data="currentData"
    />
  </div>
</template>

<script>
import TreeComponent from './components/Tree';
import DetailComponent from './components/Detail';
export default {
  components: {
    TreeComponent,
    DetailComponent
  },
  data() {
    return {
      currentData: {}
    };
  }
};
</script>
<style lang="less" scoped>
.setting-manage {
  flex: 1;
  display: flex;
  justify-content: space-between;
  &-left {
    width: 400px;
    margin-right: 5px;
  }
  &-right {
    width: 100%;
  }
}
</style>
