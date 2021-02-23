<template>
  <el-container class="page-container">
    <el-header height="50px">
      <header-component />
    </el-header>
    <el-container class="page-content">
      <sidebar-component :sidebar-menu="sidebarRoutes" />
      <el-container direction="vertical">
        <breadcrumb-component :base-title="baseTitle" />
        <content-component>
          <router-view></router-view>
          <div id="qiankun-container"></div>
        </content-component>
        <footer-component />
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import HeaderComponent from 'src/modules/component/layout/header/Header';
import SidebarComponent from 'src/modules/component/layout/Sidebar';
import BreadcrumbComponent from 'src/modules/component/layout/Breadcrumb';
import ContentComponent from 'src/modules/component/layout/Content';
import FooterComponent from 'src/modules/component/layout/Footer';
import router, { ticketRouters } from './router';
import PermissionMixin from 'src/modules/mixins/permission';
export default {
  components: {
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    ContentComponent,
    FooterComponent
  },
  mixins: [PermissionMixin],
  data() {
    return {
      baseTitle: '客服工单'
    };
  },
  created() {
    this.$store.dispatch('getUser').then(({ permission }) => {
      this.sidebarRoutes = this.handlRouter(ticketRouters, permission);
      router.addRoutes(this.sidebarRoutes);
    });
  }
};
</script>
<style scoped>
.el-header {
  padding: 0;
}
</style>
