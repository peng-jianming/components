<template>
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane
      v-for="{ prop, label, fieldConfig, action } in getFields(tabsFields)"
      :key="prop"
      :label="label"
      :name="prop"
    >
      <form-component
        :ref="prop"
        label-position="left"
        :configs="getFields(fieldConfig)"
      />
      <div class="submit-btn">
        <el-button type="primary" @click="submit(action, prop)">提交</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { tabsFields } from './config';
import FormComponent from 'src/modules/component/template/Form';
import { postTicket } from 'src/dependencies/api/ticket/detail';

export default {
  components: {
    FormComponent
  },
  props: {
    ticket: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      activeName: 'handle_ticket',
      tabsFields
    };
  },
  methods: {
    getFields(config) {
      return config.getFields({
        data: this.ticket,
        user: this.$store.state.user.user
      });
    },
    async submit(action, prop) {
      const params = this.$refs[prop][0].submit();
      const { data } = await postTicket({
        data: {
          action,
          ticket_id: this.ticket.ticket_id,
          current_ticket_status: this.ticket.ticket_status,
          ...params
        }
      });
      if (data && data.code === 0) {
        this.$refs[prop][0].resetParams();
        this.$emit('reload');
        this.activeName = 'handle_ticket';
      }
    }
  }
};
</script>
<style lang="less" scoped>
.submit-btn {
  padding-left: 100px;
}
</style>
