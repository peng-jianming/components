<template>
  <div class="test-css">
    {{ num }}
    <div class="inner"></div>
    <el-button type="primary" @click="handle"
      >122222222222222222222222222222221</el-button
    >
  </div>
</template>

<script>
import { isEmpty } from 'loadsh';
export default {
  data() {
    return {
      num: 1
    };
  },
  mounted() {},
  methods: {
    handle() {
      console.log(isEmpty({}), '222222222');
      this.num++;
    }
  }
};
</script>

<style lang="less">
.test-css {
  width: 100px;
  height: 100px;
  background-color: red;
  transform: translate(100px);
  .inner {
    width: 50px;
    height: 50px;
    background-color: red;
  }
}
</style>
