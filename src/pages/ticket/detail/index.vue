<template>
  <div class="page-detail">
    <div class="page-detail-content">
      <el-card class="page-detail-content-process">
        <ProcessComponent :ticket="ticket" />
      </el-card>
      <div class="page-detail-content-operation">
        <OperationComponent :ticket="ticket" @reload="getTicket" />
      </div>
    </div>
    <el-card class="page-detail-tool">
      <Information-component :ticket="ticket" />
    </el-card>
  </div>
</template>
<script>
import moment from 'moment';
import InformationComponent from 'src/pages/ticket/detail/components/infomation';
import OperationComponent from 'src/pages/ticket/detail/components/operation';
import ProcessComponent from 'src/pages/ticket/detail/components/process';
import { getTicket } from 'src/dependencies/api/ticket/detail';
import Socket from 'src/pages/ticket/websocket';
import storage from 'src/modules/utils/storage';

const { get: getToken } = storage('token');

const FATMAT = 'YYYY-MM-DD hh:mm:ss';

export default {
  components: {
    InformationComponent,
    OperationComponent,
    ProcessComponent
  },
  data() {
    return {
      ticket: {}
    };
  },
  watch: {
    $route: {
      handler: 'getTicket',
      immediate: true
    }
  },
  mounted() {
    this.socket = new Socket({
      url: 'www.pengjianming.top/ws:8080',
      token: getToken(),
      roomId: this.$route.query.id,
      callback: data => {
        if (data.event === 'chat') {
          this.getTicket();
        }
      }
    });
  },
  destroyed() {
    this.socket.close();
  },
  methods: {
    async getTicket() {
      const { data } = await getTicket({
        params: {
          id: this.$route.query.id
        }
      });
      if (data && data.code === 0) {
        this.ticket = data.data;
        this.ticket.create_time = moment(data.data.create_time).format(FATMAT);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.page-detail {
  flex: 1;
  display: flex;
  justify-content: space-between;
  &-tool {
    width: 280px;
    padding-left: 20px;
    margin-left: 5px;
  }
  &-content {
    width: 100%;
    &-process {
      margin-bottom: 10px;
      box-sizing: border-box;
      width: 100%;
      height: 500px;
      background-color: #f3f3f3;
    }
  }
}
</style>
