<template>
  <router-link :to="link">{{ value }}</router-link>
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
      return `/detail?id=${this.value}`;
    }
  }
};
</script>
<style scoped>
a {
  color: blue;
}
</style>
