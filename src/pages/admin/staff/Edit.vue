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
      :configs="editConfigs"
      :params="params"
      :data="data"
    />
  </Edit-dialog-component>
</template>
<script>
import EditDialogComponent from 'src/modules/component/EditDialog';
import FormComponent from 'src/modules/component/template/Form';
import { editConfigs } from './config';
import EditDataMinxin from 'src/modules/mixins/edit-data';
import { patchAllUser } from 'src/dependencies/api/user';
export default {
  components: {
    EditDialogComponent,
    FormComponent
  },
  mixins: [EditDataMinxin],
  data() {
    return {
      editConfigs
    };
  },
  methods: {
    async submit(callback) {
      const params = this.$refs.form.submit();
      const { data } = await patchAllUser({ data: params });
      if (data && data.code === 0) {
        this.$message({
          message: '更新成功',
          type: 'success'
        });
        callback && callback();
        this.$emit('reload');
      }
    }
  }
};
</script>
