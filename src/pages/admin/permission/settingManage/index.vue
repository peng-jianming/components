<template>
  <div class="setting-manage">
    <el-card class="setting-manage-left">
      <div slot="header">
        <el-button style="padding: 0" type="text">新增</el-button>
      </div>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">
              Append
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              Delete
            </el-button>
          </span>
        </span>
      </el-tree>
    </el-card>
    <el-card class="setting-manage-right">
      <div v-for="o in 4" :key="o" class="text item">
        {{ '列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.setting-manage {
  /deep/.el-card__header {
    padding: 0;
  }
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
