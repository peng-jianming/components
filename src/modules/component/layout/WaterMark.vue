<template>
  <div class="watermark-wrapper">
    <div
      class="watermark"
      :style="{ backgroundImage: `url(${waterMarkImg})`, opacity }"
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
      default: 0.2
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    waterMarkImg() {
      return this.img || this.getWaterSvg();
    }
  },
  methods: {
    getWaterSvg({
      content = this.text,
      width = '300px',
      opacity = this.opacity,
      fontSize = '20px'
    } = {}) {
      const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${width}">
<text x="50%" y="50%" dy="12px"
text-anchor="middle"
stroke="#000000"
stroke-width="1"
stroke-opacity="${opacity}"
fill="none"
transform="rotate(-45, 120 120)"
style="font-size: ${fontSize};">
${content}
</text>
</svg>`;
      return `data:image/svg+xml;base64,${window.btoa(
        unescape(encodeURIComponent(svgStr))
      )}`;
    }
  }
};
</script>
<style lang="less" scoped>
.watermark-wrapper {
  height: 100%;
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
