<template>
  <el-container>
    <el-header height="50px">
      <header-component />
    </el-header>
    <el-container>
      <sidebar-component :sidebar-menu="workbenchRouters" />
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
import { workbenchRouters } from './router';
export default {
  components: {
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent
  },
  data() {
    return {
      baseTitle: '与我相关',
      workbenchRouters
    };
  }
};
</script>
