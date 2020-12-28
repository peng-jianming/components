<template>
  <Edit-dialog-component
    btn-text="编辑"
    btn-type="text"
    @open="resetParams"
    @submit="submit"
  >
    <Form-component
      ref="form"
      label-width="120px"
      :configs="configs"
      :params="params"
      :data="data"
    />
  </Edit-dialog-component>
</template>
<script>
import EditDialogComponent from 'src/modules/component/EditDialog';
import FormComponent from 'src/modules/component/template/Form';
import { editFields } from './config/config';
import EditDataMinxin from 'src/modules/mixins/edit-data';
export default {
  components: {
    EditDialogComponent,
    FormComponent
  },
  mixins: [EditDataMinxin],
  computed: {
    configs() {
      return editFields.getFields();
    }
  },
  methods: {
    submit() {
      const params = this.$refs.form.submit();
      if (params) {
        alert('提交成功');
      }
    }
  }
};
</script>
