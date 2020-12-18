<template>
  <el-container>
    <el-header height="50px">
      <header-component />
    </el-header>
    <el-container>
      <sidebar-component :sidebar-menu="sidebarConfigs" />
      <el-container direction="vertical">
        <breadcrumb-component />
        <router-view></router-view>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import HeaderComponent from 'src/modules/component/layout/Header';
import SidebarComponent from 'src/modules/component/layout/Sidebar';
import BreadcrumbComponent from 'src/modules/component/layout/Breadcrumb';
import sidebarConfigs from 'src/dependencies/sidebars/admin';
export default {
  components: {
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent
  },
  data() {
    return {
      sidebarConfigs
    };
  }
};
</script>
