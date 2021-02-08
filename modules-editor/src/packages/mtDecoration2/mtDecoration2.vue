<!--
 * @Author: one-zero
 * @Date: 2021-02-04 19:14:39
 * @Description: 装饰2
-->
<template>
  <dv-decoration-2 :color="transferData.color"></dv-decoration-2>
</template>

<script>
export default {
  name: 'mtDecoration2',
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