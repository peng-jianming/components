<template>
  <el-container>
    <el-header height="50px">
      <header-component />
    </el-header>
    <el-container>
      <sidebar-component :sidebar-menu="adminRouters" />
      <el-container direction="vertical">
        <breadcrumb-component :base-title="baseTitle" />
        <router-view></router-view>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import HeaderComponent from 'src/modules/component/layout/Header';
import SidebarComponent from 'src/modules/component/layout/Sidebar';
import BreadcrumbComponent from 'src/modules/component/layout/Breadcrumb';
import { adminRouters } from 'src/pages/admin/router';
export default {
  components: {
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent
  },
  data() {
    return {
      baseTitle: '系统设置',
      adminRouters
    };
  }
};
</script>
