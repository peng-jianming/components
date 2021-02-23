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
import router, { workbenchRouters } from './router';
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
      baseTitle: '与我相关'
    };
  },
  created() {
    this.$store.dispatch('getUser').then(({ permission }) => {
      this.sidebarRoutes = this.handlRouter(workbenchRouters, permission);
      router.addRoutes(this.sidebarRoutes);
    });
  }
};
</script>
