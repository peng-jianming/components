<template>
  <Table-component :datas="list" :configs="configs" />
</template>
<script>
import TableComponent from 'src/modules/component/template/Table';
import { listFields } from './config/config';
export default {
  components: {
    TableComponent
  },
  data() {
    return {
      list: [
        {
          ticket_id: '1000001',
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
