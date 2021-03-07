<template>
  <div class="staff">
    <query-component :configs="queryConfigs" @query="getAllUser" />
    <table-component
      :configs="listConfigs"
      :datas="users"
      @reload="getAllUser"
    />
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
    async getAllUser(params) {
      const { data } = await getAllUser({ query: params });
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
