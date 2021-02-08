<!--
 * @Author: one-zero
 * @Date: 2021-01-29 10:09:29
 * @Description: 按钮组件
-->
<template>
  <div class="mt-button">
    <button>{{ transferData.text }}</button>
  </div>
</template>

<script>
export default {
  name: 'mtButton',
  props: {
    transferData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.mt-button {
  width: 100%;
  height: 100%;
  button {
    width: 100%;
    height: 100%;
    padding: 0;
    color: #333;
    cursor: pointer;
  }
}
</style>
