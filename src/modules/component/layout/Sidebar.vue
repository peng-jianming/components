<template>
  <el-aside width="200px" class="page-sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper" view-class="scrollbar-view">
      <el-menu
        :default-openeds="defaultOpened"
        :default-active="$route.path"
        text-color="#fff"
        background-color="#545c64"
        active-text-color="#ffd04b"
        router
      >
        <div
          v-for="{
            path,
            meta,
            children,
            isHiddenChildrenSidebar
          } in sidebarMenu"
          :key="path"
        >
          <template v-if="!meta.sidebarHidden">
            <el-submenu
              v-if="hasChildren(children) && !isHiddenChildrenSidebar"
              :index="path"
            >
              <template slot="title">
                <i :class="meta.sidebarIcon"></i>
                <span>{{ meta.sidebarName }}</span>
              </template>
              <el-menu-item
                v-for="{ path: _path, meta: _meta } in children"
                :key="_path"
                :index="path + '/' + _path"
              >
                <i :class="_meta.sidebarIcon"></i>
                <span slot="title">{{ _meta.sidebarName }}</span></el-menu-item
              >
            </el-submenu>
            <el-menu-item v-else :index="path">
              <i :class="meta.sidebarIcon"></i>
              <span slot="title">{{ meta.sidebarName }}</span>
            </el-menu-item>
          </template>
        </div>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
export default {
  props: {
    sidebarMenu: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      defaultOpened: [],
      defaultActive: ''
    };
  },
  mounted() {
    this.initMenu();
  },
  methods: {
    hasChildren(children) {
      return Array.isArray(children) && children.length > 0;
    },
    initMenu() {
      this.defaultOpened = this.sidebarMenu
        .filter(({ meta }) => meta.sidebarOpend)
        .map(({ path }) => path);
    }
  }
};
</script>

<style lang="less">
.page-sidebar {
  height: 100%;
  .el-scrollbar {
    height: 100%;
    .scrollbar-wrapper {
      overflow-x: hidden;
      height: 100%;
      .scrollbar-view {
        height: 100%;
        .el-menu {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}
</style>
