<!--
 * @Author: one-zero
 * @Date: 2021-02-01 09:53:22
 * @Description: 
-->
<template>
  <div class="mt-aside" ref="mtAside">
    <el-tabs v-model="activeTabName" type="card">
      <el-tab-pane label="基础组件" name="jczj">
        <vue-scroll>
          <ul class="buss-com-wrap">
            <li v-for="(item, index) in baseComponentsArr" :key="index">
              <div class="item" draggable="true" @dragend="handleDragend($event, item, 'bus')">
                <div class="bg"></div>
                <div class="text">{{ item.name }}</div>
              </div>
            </li>
          </ul>
        </vue-scroll>
      </el-tab-pane>
      <el-tab-pane label="业务模块" name="ywzj">
        <vue-scroll>
          <ul class="buss-com-wrap">
            <li v-for="(item, index) in bussComponentsArr" :key="index">
              <div class="item" draggable="true" @dragend="handleDragend($event, item, 'bus')">
                <div class="bg"></div>
                <div class="text">{{ item.name }}</div>
              </div>
            </li>
          </ul>
        </vue-scroll>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator"
import baseComConfig from '../utils/config.js'
@Component({})
export default class MtAside extends Vue {
  @Prop({ type: Function }) loadFiles
  @Prop({ type: Function }) mergeResources
  dragAble = false
  activeTabName = 'jczj'
  baseComponentsArr = baseComConfig

  bussComponentsArr = [
    {
      name: '模块A',
      icon: '',
      js: './modules/test/test.umd.js',
      css: './modules/test/test.css',
      tag: 'test',
      relys: {
        js: './modules/bus/bus.umd.js',
      }, // 依赖
    },
    {
      name: '模块B',
      icon: '',
      width: '500px',
      js: './modules/vChart/vChart.umd.js',
      css: './modules/vChart/vChart.css',
      tag: 'v-chart',
      relys: {
        js: ['https://cdn.bootcss.com/echarts/3.7.2/echarts.min.js', './modules/bus/bus.umd.js'],
      }, // 依赖
    },
    {
      name: '模块C',
      icon: '',
      js: './modules/helloWorld/helloWorld.umd.js',
      css: './modules/helloWorld/helloWorld.css',
      tag: 'hello-world',
      relys: [] // 依赖
    }
  ]

  mounted () {
    document.addEventListener('dragover', this.handleDragover, false)
  }

  destroyed () {
    document.removeEventListener('dragover', this.handleDragover)
  }

  // 拖拽事件
  handleDragend (e, data, type) {
    if (!this.dragAble) return
    const context = this.$parent.$refs.mtCanvas
    this.dragAble = false
    context.stopRecord = true
    const mtScroll = document.getElementById('mtScroll')
    const mtHeader = this.$parent.$refs.mtHeader.$el
    const x = e.clientX - this.$refs.mtAside.offsetWidth + mtScroll.scrollLeft
    const y = e.clientY - mtHeader.offsetHeight + mtScroll.scrollTop
    if ((x || x === 0) && (y || y === 0)) {
      switch (type) {
        case 'base': {
          const { tag, alias } = data
          const params = {
            x,
            y,
            data: {
              type,
              tag,
              alias
            }
          }
          this.createComponent(params)
          break
        }
        case 'bus': {
          const { js, css, tag, relys, width, height, refreshFlag, transferData } = data
          const allPaths = this.mergeResources([data])
          const self = this
          this.loadFiles(allPaths, function (err) {
            if (err) {
              alert('模块加载失败')
              return
            }
            const data = {
              type,
              tag
            }
            js && (data.js = js)
            css && (data.css = css)
            relys && (data.relys = relys)
            transferData && (data.transferData = transferData)
            typeof refreshFlag === 'boolean' && (data.refreshFlag = refreshFlag)
            const params = {
              width,
              height,
              x,
              y,
              data
            }
            self.createComponent(params)
            // var obj = {
            //   id: 'mt_' + new Date().getTime(),
            //   type,
            //   js,
            //   css,
            //   tag,
            //   relys,
            //   baseConfig: {
            //     width: width || 'auto',
            //     height: height || 'auto',
            //     left: x + 'px',
            //     top: y + 'px',
            //     rotate: 0,
            //     transparency: 1,
            //     zIndex: 1
            //   }
            // }
            // self.updateStepOper({
            //   types: ['delete', 'add'],
            //   indexs: [self.activeIndex, self.modulesArr.length],
            //   data: obj
            // })
            // self.modulesArr.push(obj)
            // self.form = JSON.parse(JSON.stringify(obj.baseConfig))
            // self.editMode = true
            // self.activeIndex = self.modulesArr.length - 1
          })
          break
        }
      }
    }
  }

  handleDragover (e) {
    this.dragAble = false
    const mtContainer = document.getElementById('mtContainer')
    if (mtContainer && mtContainer.contains(e.target)) {
      this.dragAble = true
      e.preventDefault()
    }
  }

  createComponent (params) {
    const obj = {
      id: 'mt_' + new Date().getTime(),
      ...params.data,
      baseConfig: {
        width: params.width || 'auto',
        height: params.height || 'auto',
        left: params.x + 'px',
        top: params.y + 'px',
        rotate: 0,
        transparency: 1,
        zIndex: 1
      }
    }
    // this.$emit('createComponent', obj)
    if (this.$parent && this.$parent.$refs.mtCanvas) {
      const context = this.$parent.$refs.mtCanvas
      this.$emit('updateStepOper', {
        types: ['delete', 'add'],
        indexs: [context.activeIndex, this.$parent.modulesArr.length],
        data: obj
      })
      this.$parent.modulesArr.push(obj)
      context.form = JSON.parse(JSON.stringify(obj.baseConfig))
      context.editMode = true
      context.activeIndex = this.$parent.modulesArr.length - 1
    }
  }
}
</script>

<style lang="less" scoped>
.mt-aside {
  width: 200px;
  height: 100%;
  float: left;
  margin-left: -200px;
  /deep/ .el-tabs {
    height: 100%;
    .el-tabs__content {
      height: calc(100% - 56px);
    }
    .el-tab-pane {
      height: 100%;
    }
  }
}
.buss-com-wrap {
  // overflow: hidden;
  // height: 100%;
  // overflow-y: auto;
  font-size: 0;
  li {
    // float: left;
    width: 50%;
    margin-bottom: 10px;
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
  }
  .item {
    width: 60px;
    margin: 0 auto;
    text-align: center;
    .bg {
      width: 100%;
      height: 60px;
      border: 1px solid #ddd;
    }
  }
}
</style>