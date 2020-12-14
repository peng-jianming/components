<template>
  <div class="page-header">
    <div class="page-logo">
      <img :src="logo" alt="logo" />
    </div>
    <ul class="page-menu">
      <!-- 123 -->
    </ul>
  </div>
</template>

<script>
import logo from 'src/modules/img/andon-logo-2.png';
export default {
  data() {
    return {
      logo
    };
  }
};
</script>

<style lang="less" scoped>
.page-header {
  position: relative;
  min-height: 50px;
  background-color: #262626;
}
.page-logo {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  img {
    width: 160px;
    height: 49px;
    &:hover {
      background-color: #262626;
    }
  }
}
</style>
