<template>
  <div class="ticket-list-page">
    <div>
      <Query-component :configs="queryConfig" @query="search" @reset="reset" />
      <Table-component :datas="list" :configs="configs" />
    </div>
    <el-pagination
      :current-page.sync="page"
      :page-size="limit"
      background
      hide-on-single-page
      layout="total, prev, pager, next"
      :total="total"
      @current-change="getTicketAboutMe"
    />
  </div>
</template>
<script>
import TableComponent from 'src/modules/component/template/Table';
import QueryComponent from 'src/modules/component/Query';
import { listFields, queryConfig } from './config';
import { getTicketAboutMe } from 'src/dependencies/api/workbench/my-ticket';
export default {
  components: {
    TableComponent,
    QueryComponent
  },
  data() {
    return {
      queryConfig,
      list: [],
      page: 1,
      limit: 10,
      total: 0,
      query: {}
    };
  },
  computed: {
    configs() {
      return listFields.getFields();
    }
  },
  mounted() {
    this.getTicketAboutMe();
  },
  methods: {
    async getTicketAboutMe(
      page = this.page,
      limit = this.limit,
      query = this.query
    ) {
      this.query = query;
      const { data } = await getTicketAboutMe({
        query: {
          ...query,
          limit,
          page
        }
      });
      if (data && data.code === 0) {
        this.list = data.data.data;
        this.total = data.data.total;
      }
    },
    search(params) {
      this.page = 1;
      this.getTicketAboutMe(this.page, this.limit, params);
    },
    reset() {
      this.query = {};
      this.page = 1;
      this.getTicketAboutMe();
    }
  }
};
</script>
<style lang="less" scoped>
.ticket-list-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .el-pagination {
    text-align: center;
  }
}
</style>
