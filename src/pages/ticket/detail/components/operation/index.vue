<template>
  <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane
      v-for="({ prop, label, fieldConfig, action }, index) in getFields(
        tabsFields
      )"
      :key="prop"
      :label="label"
      :name="prop"
    >
      <form-component
        ref="form"
        label-position="left"
        :configs="getFields(fieldConfig)"
      />
      <div class="submit-btn">
        <el-button type="primary" @click="submit(action, index)"
          >提交</el-button
        >
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
    async submit(action, index) {
      const params = this.$refs.form[index].submit();
      const { data } = await postTicket({
        data: {
          action,
          ticket_id: this.ticket.ticket_id,
          current_ticket_status: this.ticket.ticket_status,
          ...params
        }
      });
      if (data && data.code === 0) {
        this.$refs.form[index].resetParams();
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
