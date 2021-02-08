<!--
 * @Author: one-zero
 * @Date: 2021-02-07 10:18:29
 * @Description: 装饰5
-->
<template>
  <dv-decoration-5 :color="transferData.color"/>
</template>

<script>
export default {
  name: 'mtDecoration5',
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