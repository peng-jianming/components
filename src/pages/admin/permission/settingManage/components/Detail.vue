<template>
  <el-card style="padding-top: 10px">
    <form-list-component :configs="config" :data="currentData" />
  </el-card>
</template>

<script>
import FormListComponent from 'src/modules/component/template/FormList';
import config from '../configs';
export default {
  components: {
    FormListComponent
  },
  props: {
    currentData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      config
    };
  }
};
</script>
<style lang="less" scoped></style>
