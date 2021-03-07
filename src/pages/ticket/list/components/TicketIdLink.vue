<template>
  <a :href="link">{{ value }}</a>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    link() {
      return `/ticket/detail?id=${this.value}`;
    }
  }
};
</script>
<style scoped>
a {
  color: blue;
}
</style>
