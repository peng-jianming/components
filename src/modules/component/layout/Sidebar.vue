<template>
  <el-aside width="200px">
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
          v-for="{ id, name, href, icon, children } in sidebarMenu"
          :key="id"
        >
          <el-submenu v-if="hasChildren(children)" :index="id">
            <template slot="title">
              <i :class="icon"></i>
              <span>{{ name }}</span>
            </template>
            <el-menu-item
              v-for="{
                id: _id,
                name: _name,
                icon: _icon,
                href: _href
              } in children"
              :key="_id"
              :index="_href"
            >
              <i :class="_icon"></i>
              <span slot="title">{{ _name }}</span></el-menu-item
            >
          </el-submenu>
          <el-menu-item v-else :index="href">
            <i :class="icon"></i>
            <span slot="title">{{ name }}</span>
          </el-menu-item>
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
        .filter(({ opened }) => opened)
        .map(({ id }) => id);
    }
  }
};
</script>
