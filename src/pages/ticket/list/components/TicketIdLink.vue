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
      return `/ticket/#/detail?id=1612604823482`;
    }
  }
};
</script>
<style scoped>
a {
  color: blue;
}
</style>
