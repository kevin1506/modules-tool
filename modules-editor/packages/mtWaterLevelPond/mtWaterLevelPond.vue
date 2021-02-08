<!--
 * @Author: one-zero
 * @Date: 2021-02-07 10:03:39
 * @Description: 水位图
-->
<template>
  <dv-water-level-pond :config="transferData.config" :style="getStyle"/>
</template>

<script>
export default {
  name: 'mtWaterLevelPond',
  props: {
    transferData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    getStyle () {
      let obj = {
        width: '100%',
        height: '100%'
      }
      this.transferData.style && (obj = { ...obj, ...this.transferData.style })
      return obj
    }
  }
}
</script>

<style lang="less" scoped>
</style>