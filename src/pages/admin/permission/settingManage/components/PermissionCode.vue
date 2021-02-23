<template>
  <div>
    <span>{{ value }}</span>
    <el-button
      icon="el-icon-document-copy"
      type="text"
      @click="copy"
    ></el-button>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  methods: {
    copy() {
      this.$copyText(this.value).then(() => {
        this.$message({
          message: '复制成功',
          type: 'success'
        });
      });
    }
  }
};
</script>
