<!--
 * @Author: one-zero
 * @Date: 2021-02-07 10:18:29
 * @Description: 边框2
-->
<template>
  <dv-border-box-2 :color="transferData.color" :backgroundColor="transferData.backgroundColor"/>
</template>

<script>
export default {
  name: 'mtBorderBox2',
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