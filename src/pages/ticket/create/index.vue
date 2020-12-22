<template>
  <Content-component>
    <WaterMark-component>
      <Form-component ref="form" :label-width="'120px'" :configs="configs">
        <el-form-item>
          <el-button type="primary" @click="submit">立即创建</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </Form-component>
    </WaterMark-component>
  </Content-component>
</template>
<script>
import ContentComponent from 'src/modules/component/layout/Content';
import WaterMarkComponent from 'src/modules/component/layout/WaterMark';
import FormComponent from 'src/modules/component/template/Form';
import { configs } from './config/configs';
export default {
  components: {
    ContentComponent,
    WaterMarkComponent,
    FormComponent
  },
  data() {
    return {
      configs
    };
  },
  mounted() {
    this.$refs.form && this.$refs.form.resetParams();
  },
  methods: {
    submit() {
      this.$refs.form.submit();
    },
    reset() {
      this.$refs.form.resetParams();
    }
  }
};
</script>
