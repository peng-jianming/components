<template>
  <div class="test-css">1
    <div class="inner"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.test-css {
  width: 100px;
  height: 100px;
  background-color: yellow;
  transform: translate(100px);
  .inner {
    width: 50px;
    height: 50px;
    background-color: red;
  }
}
</style>