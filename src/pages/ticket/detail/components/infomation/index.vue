<template>
  <div>
    <div class="custom-information">
      <div class="custom-information-title">
        <span class="el-icon-tickets"></span> 客户信息
      </div>
      <Form-list-component
        :configs="customerConfigs"
        label-width="85px"
        label-position="left"
        :data="ticket"
      />
    </div>
    <div class="ticket-information">
      <div class="ticket-information-title">
        <span class="el-icon-tickets"></span> 工单信息
      </div>
      <Form-list-component
        :configs="ticketConfigs"
        label-width="85px"
        label-position="left"
        :data="ticket"
      />
    </div>
  </div>
</template>
<script>
import FormListComponent from 'src/modules/component/template/FormList';
import { customerConfigFields, ticketConfigFields } from './config';
export default {
  components: {
    FormListComponent
  },
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  computed: {
    customerConfigs() {
      return customerConfigFields.getFields();
    },
    ticketConfigs() {
      return ticketConfigFields.getFields();
    }
  }
};
</script>
<style lang="less" scoped>
.custom-information {
  margin-bottom: 40px;
  margin-top: 10px;
}
.custom-information-title,
.ticket-information-title {
  font-weight: 550;
  margin-bottom: 10px;
}
</style>
