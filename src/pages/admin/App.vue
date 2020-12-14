<template>
  <div class="test-css">
    {{ num }}
    <div class="inner"></div>
    <el-button type="primary" @click="handle"
      >122222222222222222222222222222221</el-button
    >
    <el-button type="primary" @click="click">33333</el-button>
  </div>
</template>

<script>
import axios from 'axios';
import { isEmpty } from 'loadsh';
export default {
  data() {
    return {
      num: 1
    };
  },
  methods: {
    async handle() {
      console.log(isEmpty({}), '222222222');
      this.num++;
      const { data } = await this.$http.post(
        '/login',
        {
          name: 'lisi',
          password: '555'
        },
        {
          debounce: false
        }
      );
      axios.defaults.headers.common.Authorization = data.token;
    },
    async click() {
      const { data } = await this.$http.get('/user');
      console.log(data);
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
