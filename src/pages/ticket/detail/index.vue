<template>
  <Content-component>
    <Water-mark-component>
      <div class="page-detail">
        <div class="page-detail-content">
          <div class="page-detail-content-process"></div>
          <div class="page-detail-content-operation"></div>
        </div>
        <div class="page-detail-tool">
          <Information-component :ticket="ticket" />
        </div>
      </div>
    </Water-mark-component>
  </Content-component>
</template>
<script>
import ContentComponent from 'src/modules/component/layout/Content';
import WaterMarkComponent from 'src/modules/component/layout/WaterMark';
import InformationComponent from './components/Information';
export default {
  components: {
    ContentComponent,
    WaterMarkComponent,
    InformationComponent
  },
  data() {
    return {
      ticket: {
        ticket_id: '1000001',
        ticket_type: 1,
        ticket_status: '建单',
        customer_name: 'pjm',
        phone_number: '12345678909',
        feedback_channel: 1,
        problem_heppen_time: ['2021-01-28 23:59:59', '2020-12-03 00:00:00'],
        problem_heppen_start_time: '2021-01-28 23:59:59',
        problem_heppen_end_time: '2020-12-03 00:00:00',
        description: '问题描述',
        create_time: '2020-12-29 11:12:00'
      }
    };
  }
};
</script>
<style lang="less">
.page-detail {
  display: flex;
  justify-content: space-between;
  &-tool {
    box-sizing: border-box;
    width: 300px;
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
