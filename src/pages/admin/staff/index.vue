<template>
  <div class="staff">
    <query-component
      :configs="queryConfigs"
      @query="getAllUser"
      @reset="reset"
    />
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
      users: [],
      query: {}
    };
  },
  mounted() {
    this.getAllUser();
  },
  methods: {
    async getAllUser(query = this.query) {
      const { data } = await getAllUser({ query });
      if (data && data.code === 0) {
        this.users = data.data.data;
      }
    },
    reset() {
      this.query = {};
      this.getAllUser();
    }
  }
};
</script>
<style scoped>
.staff {
  flex: 1;
}
</style>
