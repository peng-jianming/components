<template>
  <div class="page-bread-crumb">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          {{ baseTitle }}
        </el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="({ meta }, index) in $route.matched"
          :key="index"
        >
          {{ meta.sidebarName }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <div class="page-history" @click="handle">
      <el-tag size="small" closable effect="dark">
        {{ $route.meta.sidebarName }}
      </el-tag>
    </div>
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
  mounted() {
    console.log(this.$route, '444444');
  },
  methods: {
    handle() {
      console.log(this.$route);
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
  }
}
</style>
