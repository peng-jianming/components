<template>
  <Content-component>
    <Water-mark-component>
      <Table-component :datas="list" :configs="configs" />
    </Water-mark-component>
  </Content-component>
</template>
<script>
import ContentComponent from 'src/modules/component/layout/Content';
import WaterMarkComponent from 'src/modules/component/layout/WaterMark';
import TableComponent from 'src/modules/component/template/Table';
import { listFields } from './config/config';
export default {
  components: {
    ContentComponent,
    WaterMarkComponent,
    TableComponent
  },
  data() {
    return {
      list: [
        {
          ticket_type: 1,
          customer_name: 'pjm',
          phone_number: '12345678909',
          feedback_channel: 1,
          problem_heppen_time: ['2021-01-28 23:59:59', '2020-12-03 00:00:00'],
          problem_heppen_start_time: '2021-01-28 23:59:59',
          problem_heppen_end_time: '2020-12-03 00:00:00',
          description: '问题描述'
        }
      ]
    };
  },
  computed: {
    configs() {
      return listFields.getFields();
    }
  }
};
</script>
