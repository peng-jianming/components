<template>
  <div>son</div>
</template>
<script>
import { add } from 'src/modules/utils/add';
export default {
  mounted() {
    console.log(add(1, 2));
  }
};
</script>
