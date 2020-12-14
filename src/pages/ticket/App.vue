<template>
  <el-container>
    <el-header>工单</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
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
