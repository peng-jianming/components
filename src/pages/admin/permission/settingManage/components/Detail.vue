<template>
  <el-card style="padding-top: 10px">
    <form-list-component :configs="config" :data="currentData" />
  </el-card>
</template>

<script>
import FormListComponent from 'src/modules/component/template/FormList';
import { title } from 'src/dependencies/fields/admin/permission/settingManage';
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
  computed: {
    config() {
      return this.currentData.permission_code ? config : [title];
    }
  }
};
</script>
