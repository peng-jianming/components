<template>
  <div class="staff">
    <QueryComponent :configs="queryConfigs" />
    <TableComponent :configs="listConfigs" :datas="users" />
  </div>
</template>
<script>
import QueryComponent from 'src/modules/component/Query';
import TableComponent from 'src/modules/component/template/Table';
import { queryConfigs, listConfigs } from './config';
import { getAllUser } from 'src/dependencies/api/user';
export default {
  components: {
    QueryComponent,
    TableComponent
  },
  provide() {
    return {
      aaa: () => {
        return this.users;
      }
    };
  },
  data() {
    return {
      queryConfigs,
      listConfigs,
      users: []
    };
  },
  mounted() {
    this.getAllUser();
  },
  methods: {
    async getAllUser() {
      const { data } = await getAllUser();
      if (data && data.code === 0) {
        this.users = data.data.data;
      }
    }
  }
};
</script>
<style scoped>
.staff {
  flex: 1;
}
</style>
