<template>
  <el-container>
    <el-header height="50px">
      <header-component />
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>系统设置</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios';
import { isEmpty } from 'loadsh';
import HeaderComponent from 'src/modules/component/layout/Header';
export default {
  components: {
    HeaderComponent
  },
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
