<template>
  <div class="page-bread-crumb">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          {{ baseTitle }}
        </el-breadcrumb-item>
        <template v-for="({ meta }, index) in $route.matched">
          <el-breadcrumb-item v-if="meta.sidebarName" :key="index">
            {{ meta.sidebarName }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </el-card>
    <!-- <div class="page-history">
      <router-link
        v-for="({ meta, fullPath }, index) in cacheRoute"
        :key="index"
        :to="fullPath"
      >
        <el-tag
          size="small"
          closable
          :effect="$route.fullPath.includes(fullPath) ? 'dark' : 'light'"
          @close.prevent="handleClose(index)"
        >
          {{ meta.sidebarName }}
        </el-tag>
      </router-link>
    </div> -->
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
  data() {
    return {
      cacheRoute: []
    };
  },
  watch: {
    $route(val) {
      // 切换路由时判断当前路由是否有存
      this.cacheRoute.every(({ fullPath }) => fullPath !== val.fullPath) &&
        val.meta.sidebarName &&
        this.cacheRoute.push(val);
    }
  },
  methods: {
    handleClose(index) {
      // 路由剩最后一个不得删除,删除路由后重新跳转最后一个访问的路由
      if (this.cacheRoute.length !== 1) {
        this.cacheRoute.splice(index, 1);
        this.$router.push(this.cacheRoute[this.cacheRoute.length - 1].path);
      }
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
