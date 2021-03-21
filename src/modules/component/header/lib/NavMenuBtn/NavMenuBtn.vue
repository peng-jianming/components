<template>
  <div
    class="nav-menu-btn"
    :class="{ 'nav-menu-btn--open': isOpen }"
    @click.stop="change"
  >
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'NavMenuBtn',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  watch: {
    value(val) {
      this.isOpen = val;
    }
  },
  created() {
    this.isOpen = this.value;
  },
  methods: {
    change() {
      this.isOpen = !this.isOpen;
      this.$emit('input', this.isOpen);
    }
  }
};
</script>

<style scoped lang="less">
.nav-menu-btn {
  width: 30px;
  height: 25px;
  cursor: pointer;
  display: inline-block;
  position: relative;
  text-align: center;
  > div {
    position: absolute;
    transition: all 0.3s;
    display: block;
    width: 100%;
    border-top: 3px solid #fff;
    height: 1px;
  }
  > div:nth-child(1) {
    top: 0;
    left: 0;
    transform-origin: right bottom;
  }
  > div:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
  }
  > div:nth-child(3) {
    left: 0;
    bottom: 0;
    transform-origin: right bottom;
  }
  &--open {
    > div:nth-child(1) {
      transform: rotate(-45deg) translate(-2px, -5px);
    }
    > div:nth-child(2) {
      width: 0;
    }
    > div:nth-child(3) {
      transform: rotate(45deg) translate(-6px, 3px);
    }
  }
}
</style>
