<template>
  <el-container>
    <el-header height="50px">
      <header-component />
    </el-header>
    <el-container>
      <sidebar-component />
      <el-container>
        <el-main>工单</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import HeaderComponent from 'src/modules/component/layout/Header';
import SidebarComponent from 'src/modules/component/layout/Sidebar';
export default {
  components: {
    HeaderComponent,
    SidebarComponent
  }
};
</script>
