<template>
  <div>
    {{ title }}<el-button type="text" @click="open">点击查看</el-button>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    open() {
      this.$emit('open', this.id);
    }
  }
};
</script>
<style lang="less" scoped></style>
