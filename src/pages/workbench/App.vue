<template>
  <el-container>
    <el-header height="50px">
      <header-component />
    </el-header>
    <el-container>
      <sidebar-component :sidebar-menu="sidebarConfigs" />
      <el-container>
        <router-view></router-view>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import HeaderComponent from 'src/modules/component/layout/Header';
import SidebarComponent from 'src/modules/component/layout/Sidebar';
import sidebarConfigs from 'src/dependencies/sidebars/workbench';
export default {
  components: {
    HeaderComponent,
    SidebarComponent
  },
  data() {
    return {
      sidebarConfigs
    };
  }
};
</script>
