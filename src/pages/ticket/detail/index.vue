<template>
  <div class="page-detail">
    <div class="page-detail-content">
      <div class="page-detail-content-process"></div>
      <div class="page-detail-content-operation"></div>
    </div>
    <div class="page-detail-tool">
      <Information-component :ticket="ticket" />
    </div>
  </div>
</template>
<script>
import InformationComponent from 'src/pages/ticket/detail/components/Information';
import { getTicket } from 'src/dependencies/api/ticket/detail';
import { getURIParams } from 'src/modules/utils/uri';
export default {
  components: {
    InformationComponent
  },
  data() {
    return {
      ticket: {}
    };
  },
  mounted() {
    this.getTicket();
  },
  methods: {
    async getTicket() {
      const { data } = await getTicket({
        params: getURIParams()
      });
      if (data && data.code === 0) {
        this.ticket = data.data;
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
    box-sizing: border-box;
    width: 350px;
    padding-left: 20px;
    border-left: 1px solid #ccc;
  }
  &-content {
    width: 100%;
    &-process {
      width: 100%;
      height: 500px;
      background-color: #eee;
    }
  }
}
</style>
