<!--
 * @Author: one-zero
 * @Date: 2021-02-04 17:49:40
 * @Description: 边框1
-->
<template>
  <dv-border-box-1 :color="transferData.color" :backgroundColor="transferData.backgroundColor"></dv-border-box-1>
</template>

<script>
export default {
  name: 'mtBorderBox1',
  props: {
    transferData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>