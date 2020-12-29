<template>
  <div>
    <div class="custom-information">
      <div class="custom-information-title">
        <span class="el-icon-tickets"></span> 客户信息
      </div>
    </div>
    <div class="ticket-information">
      <div class="ticket-information-title">
        <span class="el-icon-tickets"></span> 工单信息
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="less">
.custom-information-title,
.ticket-information-title {
  font-weight: 550;
}
</style>
