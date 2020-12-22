<template>
  <div class="watermark-wrapper">
    <div
      class="watermark"
      :style="{ backgroundImage: waterMarkImg, opacity }"
    ></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    img: {
      type: String,
      default: ''
    },
    opacity: {
      type: Number,
      default: 0.1
    }
  },
  computed: {
    waterMarkImg() {
      return `url(${this.img})`;
    }
  }
};
</script>
<style lang="less" scoped>
.watermark-wrapper {
  position: relative;
  .watermark {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    pointer-events: none;
  }
}
</style>
