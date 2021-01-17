<template>
  <el-container class="page-container">
    <el-header height="50px">
      <Header-component />
    </el-header>
    <el-container class="page-content">
      <Sidebar-component :sidebar-menu="adminRouters" />
      <el-container direction="vertical">
        <Breadcrumb-component :base-title="baseTitle" />
        <Content-component>
          <div id="spa-container"></div>
          <router-view></router-view>
        </Content-component>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import HeaderComponent from 'src/modules/component/layout/Header';
import SidebarComponent from 'src/modules/component/layout/Sidebar';
import BreadcrumbComponent from 'src/modules/component/layout/Breadcrumb';
import ContentComponent from 'src/modules/component/layout/Content';
import { adminRouters } from './router';
export default {
  components: {
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    ContentComponent
  },
  data() {
    return {
      baseTitle: '系统设置',
      adminRouters
    };
  }
};
</script>
