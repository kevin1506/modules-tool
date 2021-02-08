<!--
 * @Author: one-zero
 * @Date: 2021-02-04 19:09:17
 * @Description: 边框8
-->
<template>
  <dv-border-box-8 :color="transferData.color" :backgroundColor="transferData.backgroundColor"></dv-border-box-8>
</template>

<script>
export default {
  name: 'mtBorderBox8',
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