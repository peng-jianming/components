<template>
  <el-container class="page-container">
    <el-header height="50px">
      <Header-component />
    </el-header>
    <el-container class="page-content">
      <Sidebar-component :sidebar-menu="ticketRouters" />
      <el-container direction="vertical">
        <Breadcrumb-component :base-title="baseTitle" />
        <router-view></router-view>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import HeaderComponent from 'src/modules/component/layout/Header';
import SidebarComponent from 'src/modules/component/layout/Sidebar';
import BreadcrumbComponent from 'src/modules/component/layout/Breadcrumb';
import { ticketRouters } from './router';
export default {
  components: {
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent
  },
  data() {
    return {
      baseTitle: '客服工单',
      ticketRouters
    };
  }
};
</script>
