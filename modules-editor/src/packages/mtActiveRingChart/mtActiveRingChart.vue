<!--
 * @Author: one-zero
 * @Date: 2021-02-04 20:05:02
 * @Description: 动态环图
-->
<template>
  <dv-active-ring-chart :config="transferData.config" style="width:100%;height:100%;"></dv-active-ring-chart>
</template>

<script>
export default {
  name: 'mtActiveRingChart',
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
.dv-active-ring-chart {
  /deep/ .active-ring-info .active-ring-name {
    color: inherit;
  }
}
</style>