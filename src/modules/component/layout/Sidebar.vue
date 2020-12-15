<template>
  <el-aside width="200px">
    <el-menu
      default-active="1-4-1"
      text-color="#fff"
      background-color="#545c64"
      active-text-color="#ffd04b"
      @select="handleSelectMenuItem"
    >
      <template v-for="({ id, name, icon, children }, index) in menu">
        <el-submenu v-if="hasChildren(children)" :key="index" :index="id">
          <template slot="title">
            <i :class="icon"></i>
            <span>{{ name }}</span>
          </template>
          <el-menu-item
            v-for="({ id: _id, name: _name, icon: _icon }, _index) in children"
            :key="_index"
            :index="_id"
          >
            <i :class="_icon"></i>
            <span slot="title">{{ _name }}</span></el-menu-item
          >
        </el-submenu>
        <el-menu-item v-else :key="index" :index="id">
          <i :class="icon"></i>
          <span slot="title">{{ name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        {
          id: '1',
          name: '工单查询',
          href: '',
          icon: 'el-icon-tickets',
          opened: false
        },
        {
          id: '2',
          name: '创建工单',
          href: '',
          icon: 'el-icon-edit-outline',
          opened: false
        }
      ]
    };
  },
  methods: {
    hasChildren(children) {
      return Array.isArray(children) && children.length > 0;
    },
    handleSelectMenuItem(val, b) {
      console.log(val, b);
    }
  }
};
</script>
<style lang="less" scoped>
.el-aside {
  height: 100%;
  .el-menu {
    height: 100%;
  }
}
</style>
