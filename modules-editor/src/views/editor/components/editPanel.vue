<!--
 * @Author: one-zero
 * @Date: 2021-02-01 10:24:25
 * @Description: 模块编辑page
-->
<template>
  <div :class="['edit-panel', isShow ? 'show' : 'hide']" ref="editPanel">
    <template v-if="activeIndex === -1">
      <h3>组件容器配置</h3>
      <el-form class="form-wrap" ref="ctrConfig" :model="ctrConfig" label-width="90px">
        <!-- <el-form-item label="网格：">
            <el-checkbox name="type" v-model="ctrConfig.grid" @change="val => {handleChange(val, 'grid')}">
            </el-checkbox>
          </el-form-item>
          <el-form-item label="基线对齐：">
            <el-checkbox name="type" v-model="ctrConfig.align">
            </el-checkbox>
        </el-form-item>-->
        <el-form-item label="宽度：">
          <el-input v-model="ctrConfig.width"></el-input>
        </el-form-item>
        <el-form-item label="高度：">
          <el-input v-model="ctrConfig.height"></el-input>
        </el-form-item>
        <el-form-item label="背景色：" style="height:40px;">
          <!-- <el-input v-model="form1.bg"></el-input> -->
          <el-color-picker v-model="ctrConfig.bg"></el-color-picker>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="ctrConfig.grid" @change="val => {handleChange(val, 'grid')}">网格</el-checkbox>
          <el-checkbox v-model="ctrConfig.align">基线对齐</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
          <el-button @click="closePanel">取消</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template v-else>
      <h3>基本属性配置</h3>
      <el-form class="form-wrap" ref="form" :model="form" label-width="80px">
        <el-form-item label="宽度：">
          <el-input v-model="form.width"></el-input>
        </el-form-item>
        <el-form-item label="高度：">
          <el-input v-model="form.height"></el-input>
        </el-form-item>
        <el-form-item label="左边距：">
          <el-input v-model="form.left"></el-input>
        </el-form-item>
        <el-form-item label="上边距：">
          <el-input v-model="form.top"></el-input>
        </el-form-item>
        <el-form-item label="角度(度)：">
          <!-- <el-input v-model="form.rotate"></el-input> -->
          <el-input-number v-model="form.rotate"></el-input-number>
        </el-form-item>
        <el-form-item label="透明度：">
          <el-slider v-model="form.transparency" :max="1" :step="0.1"></el-slider>
        </el-form-item>
        <el-form-item label="层级：">
          <el-input v-model="form.zIndex"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
          <el-button @click="closePanel">取消</el-button>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator"
@Component({})
export default class EditPanel extends Vue {
  @Prop({ type: Number }) activeIndex!: any
  @Prop({ type: Object }) form!: any
  @Prop({ type: Object }) ctrConfig!: any
  isShow = true
  aniTimer: any = null

  handleChange(val, type) {
    this.$emit("oprChange", { val, type })
  }

  closePanel() {
    this.isShow = false
    // const ele = this.$refs.editPanel
    // ele.style.animation = "hide 0.3s"
    // window.requestAnimationFrame(() => {
    //   this.editMode = false
    //   this.activeIndex = -2
    // })
    if (this.aniTimer) {
      clearTimeout(this.aniTimer)
      this.aniTimer = null
    }
    this.aniTimer = setTimeout(() => {
      this.$emit("close")
    }, 300)
    // this.$emit("close")
  }
}
</script>

<style lang="less" scoped>
.edit-panel {
  width: 300px;
  height: calc(100% - 35px);
  background-color: #fff;
  position: fixed;
  right: 0;
  top: 35px;
  border: 1px solid #ddd;
  padding: 5px 10px;
  z-index: 999;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* transition: all 0.5s; */
  // animation: show 0.3s;
  &.show {
    animation: show 0.3s;
  }
  &.hide {
    animation: hide 0.3s;
  }
}
@keyframes show {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}
@keyframes hide {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
}
.form-wrap {
  margin-top: 20px;
}
.form-wrap .el-slider {
  padding-right: 15px;
}
</style>