<template>
  <div>
    <a v-if="acrossPage" :href="link">{{ value }}</a>
    <router-link v-else :to="link">{{ value }}</router-link>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    acrossPage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    link() {
      return this.acrossPage
        ? `/ticket/detail?id=${this.value}`
        : `/detail?id=${this.value}`;
    }
  }
};
</script>
<style scoped>
a {
  color: blue;
}
</style>
