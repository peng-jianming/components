<template>
  <Content-component>
    <!-- 分离模块挂载点,由于路由嵌套,如果在子项目有路由,父项目路由需要和子项目一致 -->
    <div id="spa-container"></div>
  </Content-component>
</template>
<script>
import ContentComponent from 'src/modules/component/layout/Content';
export default {
  components: {
    ContentComponent
  }
};
</script>
