<template>
  <div class="test-css">
    {{ num }}
    <div class="inner"></div>
    <el-button type="primary" @click="handle"
      >122222222222222222222222222222221</el-button
    >
    <son-component />
  </div>
</template>

<script>
import { isEmpty } from 'loadsh';
import { add } from 'src/modules/utils/add';
import SonComponent from './SonOne';
export default {
  components: {
    SonComponent
  },
  data() {
    return {
      num: 1
    };
  },
  mounted() {
    console.log(add(2, 4));
  },
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
