<!--
 * @Author: one-zero
 * @Date: 2021-02-04 19:19:52
 * @Description: 排名轮播图
-->
<template>
  <dv-scroll-ranking-board :config="transferData.config"></dv-scroll-ranking-board>
</template>

<script>
export default {
  name: 'mtScrollRankingBoard',
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