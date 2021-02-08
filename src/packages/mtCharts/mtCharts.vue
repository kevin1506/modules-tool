<!--
 * @Author: one-zero
 * @Date: 2021-02-07 10:18:29
 * @Description: 图表
-->
<template>
  <dv-charts :option="transferData.option" :style="getStyle"/>
</template>

<script>
export default {
  name: 'mtCharts',
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