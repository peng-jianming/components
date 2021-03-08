<template>
  <div class="page-bread-crumb">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          {{ baseTitle }}
        </el-breadcrumb-item>
        <template v-for="{ meta, name } in $route.matched">
          <el-breadcrumb-item v-if="meta.sidebarName" :key="name">
            {{ meta.sidebarName }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    baseTitle: {
      type: String,
      default: ''
    }
  },
  watch: {
    $route(val) {
      console.log(val);
    }
  }
};
</script>
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
    display: flex;
    .el-tag {
      margin-right: 10px;
    }
  }
}
</style>
