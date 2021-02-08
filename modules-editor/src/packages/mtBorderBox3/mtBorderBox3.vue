<!--
 * @Author: one-zero
 * @Date: 2021-02-04 19:09:17
 * @Description: 边框3
-->
<template>
  <dv-border-box-3 :color="transferData.color" :backgroundColor="transferData.backgroundColor"></dv-border-box-3>
</template>

<script>
export default {
  name: 'mtBorderBox3',
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