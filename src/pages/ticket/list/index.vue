<template>
  <div class="ticket-list-page">
    <div>
      <query-component :configs="queryConfig" @query="search" @reset="reset" />
      <table-component :datas="list" :configs="configs" />
    </div>
    <el-pagination
      :current-page.sync="page"
      :page-size="limit"
      background
      hide-on-single-page
      layout="total, prev, pager, next"
      :total="total"
      @current-change="getTicketList"
    />
  </div>
</template>
<script>
import TableComponent from 'src/modules/component/template/Table';
import QueryComponent from 'src/modules/component/Query';
import { listFields, queryFields } from './config/config';
import { getTicketList } from 'src/dependencies/api/ticket/list';
export default {
  components: {
    TableComponent,
    QueryComponent
  },
  data() {
    return {
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
    },
    queryConfig() {
      return queryFields.getFields();
    }
  },
  mounted() {
    this.getTicketList();
  },
  methods: {
    async getTicketList(
      page = this.page,
      limit = this.limit,
      query = this.query
    ) {
      this.query = query;
      const { data } = await getTicketList({
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
      this.getTicketList(this.page, this.limit, params);
    },
    reset() {
      this.query = {};
      this.page = 1;
      this.getTicketList();
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
