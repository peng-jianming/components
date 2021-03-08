<template>
  <div class="query">
    <form-component ref="form" :configs="configs" is-query />
    <div class="query-btn">
      <el-button type="primary" icon="el-icon-search" @click="submit"
        >搜索</el-button
      >
      <el-button type="primary" @click="reset">重置</el-button>
    </div>
  </div>
</template>
<script>
import FormComponent from 'src/modules/component/template/Form';
export default {
  components: {
    FormComponent
  },
  props: {
    configs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    submit() {
      const params = this.$refs.form.submit();
      this.$emit('query', params);
    },
    reset() {
      this.$refs.form.resetParams();
      this.$emit('reset');
    }
  }
};
</script>
<style>
.query {
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.query-btn {
  padding-left: 100px;
  padding-bottom: 10px;
}
</style>
