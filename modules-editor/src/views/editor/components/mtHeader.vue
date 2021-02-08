<!--
 * @Author: one-zero
 * @Date: 2021-02-01 09:53:41
 * @Description: 
-->
<template>
  <div class="mt-header">
    <div class="title">Module Tool</div>
    <ul class="opr-container">
      <li @click="basicOper('save')">
        <a href="javascript:void(0);">保存</a>
      </li>
      <li @click="basicOper('preview')">
        <a href="javascript:void(0);">预览</a>
      </li>
      <li :class="{disabled: cacheStepOper.length <= 0}" @click="basicOper('revoke')">
        <a href="javascript:void(0);">撤销</a>
      </li>
      <li :class="{disabled: recoverStepOper.length <= 0}" @click="basicOper('recover')">
        <a href="javascript:void(0);">恢复</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
@Component({})
export default class MtHeader extends Vue {
  cacheStepOper: any[] = []
  recoverStepOper: any[] = []
  basicOper(type) {
    const context: any = this.$parent.$refs.mtCanvas
    switch (type) {
      case "save": {
        this.onSave()
        break
      }
      case "preview": {
        const data = this.getFinalData()
        sessionStorage.setItem("mt-json-data", JSON.stringify(data))
        window.open("./parse.html")
        // const $router: any = this.$router
        // const routeData = $router.resolve({
        //   name: "Preview",
        //   query: {
        //     data: JSON.stringify(data),
        //   },
        // })
        // window.open(routeData.href, "_blank")
        break
      }
      case "revoke": {
        if (this.cacheStepOper.length > 0) {
          // 取第一个
          const step = this.cacheStepOper.shift()
          const obj = JSON.parse(JSON.stringify(step))
          obj.types && obj.types.reverse()
          obj.indexs && obj.indexs.reverse()
          // step.type === 'change' && (obj.data = {
          //   baseConfig: JSON.parse(JSON.stringify(this.form))
          // })
          if (step.type === "change") {
            obj.data =
              step.mode === 0
                ? JSON.parse(JSON.stringify(context.ctrConfig))
                : (obj.data = {
                    baseConfig: JSON.parse(JSON.stringify(context.form)),
                  })
          }
          this.updateRecoverStepOper(obj)
          this.stepReproduce(step)
        }
        break
      }
      case "recover": {
        if (this.recoverStepOper.length > 0) {
          // 取第一个
          const step = this.recoverStepOper.shift()
          const obj = JSON.parse(JSON.stringify(step))
          obj.flag = true
          obj.types && obj.types.reverse()
          obj.indexs && obj.indexs.reverse()
          if (step.type === "change") {
            obj.data =
              step.mode === 0
                ? JSON.parse(JSON.stringify(context.ctrConfig))
                : (obj.data = {
                    baseConfig: JSON.parse(JSON.stringify(context.form)),
                  })
          }
          this.updateStepOper(obj)
          this.stepReproduce(step)
        }
        break
      }
    }
  }

  updateStepOper(params) {
    if (!params.flag) {
      this.recoverStepOper = []
    }
    const obj = this.getStep(params)
    if (this.cacheStepOper.length > 1000) {
      this.cacheStepOper.pop()
    }
    this.cacheStepOper.unshift(obj)
  }

  updateRecoverStepOper(params) {
    const obj = this.getStep(params)
    if (this.recoverStepOper.length > 1000) {
      this.recoverStepOper.pop()
    }
    this.recoverStepOper.unshift(obj)
  }

  getStep(params) {
    let obj = params
    if (params.type === "select") {
      const context: any = this.$parent.$refs.mtCanvas
      obj = {
        type: params.type,
        data: {
          editMode: context.editMode,
          activeIndex: context.activeIndex,
        },
      }
    }
    return obj
  }

  stepReproduce(step) {
    const type = step.types ? step.types[0] : step.type
    const context: any = this.$parent.$refs.mtCanvas
    const $parent: any = this.$parent
    const modulesArr = $parent.modulesArr
    switch (type) {
      case "select":
        context.editMode = step.data.editMode
        context.activeIndex = step.data.activeIndex
        break
      case "add":
        if (step.indexs && (step.indexs[0] || step.indexs[0] === 0)) {
          modulesArr.splice(step.indexs[0], 0, step.data)
          context.activeIndex = step.indexs[0]
        } else {
          modulesArr.push(step.data)
          context.activeIndex = modulesArr.length - 1
        }
        context.stopRecord = true
        context.form = modulesArr[context.activeIndex].baseConfig
        context.editMode = true
        break
      case "delete": {
        const index = modulesArr.findIndex((item) => {
          return item.id === step.data.id
        })
        if (index >= 0) {
          modulesArr.splice(context.activeIndex, 1)
          context.activeIndex = step.indexs[0]
          context.editMode = step.indexs[0] >= 0
          context.stopRecord = true
          context.editMode &&
            (context.form = modulesArr[context.activeIndex].baseConfig)
        }
        break
      }
      case "change":
        if (step.mode === 0) {
          context.ctrConfig = step.data
        } else {
          context.stopRecord = true
          context.form = step.data.baseConfig
        }
        break
    }
  }

  onSave() {
    const data = this.getFinalData()
    alert(JSON.stringify(data))
  }

  getFinalData() {
    const context: any = this.$parent
    const ctrConfig = context.$refs.mtCanvas
      ? context.$refs.mtCanvas.ctrConfig
      : {}
    const obj = {}
    for (const item of Object.keys(ctrConfig).slice(2)) {
      obj[item] = ctrConfig[item]
    }
    const data = {
      ctrConfig: obj,
      modules: context.modulesArr,
    }
    return data
  }
}
</script>

<style lang="less" scoped>
.mt-header {
  width: 100%;
  height: 35px;
  float: left;
  margin-top: -35px;
  background-color: #ddd;
  .title {
    float: left;
    height: 35px;
    line-height: 35px;
    padding: 0 5px;
    color: #333;
    font-size: 16px;
    font-weight: bold;
  }
}
.opr-container {
  float: left;
  overflow: hidden;
  li {
    float: left;
    height: 35px;
    line-height: 35px;
    padding: 0 15px;
    // padding: 8px 15px;
    cursor: pointer;
  }
  li a {
    color: #333;
    font-size: 16px;
  }
  li:hover {
    background-color: #abc;
  }
  li.disabled,
  li.disabled a {
    cursor: not-allowed;
  }
  li.disabled a {
    color: #999;
  }
}
</style>