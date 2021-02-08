<!--
 * @Author: one-zero
 * @Date: 2021-02-01 09:52:43
 * @Description:  画布
-->
<template>
  <div class="main-wrap">
    <div
      :class="['mt-scroll-wrap', { edit: editMode && activeIndex !== -2 }]"
      ref="mtScroll"
      id="mtScroll"
    >
      <div
        id="mtContainer"
        class="mt-container"
        :style="getCtrStyle"
        ref="mtContainer"
        @click="boxClick"
      >
        <div
          :id="item.id"
          class="mt-module"
          :style="getModuleStyle(item)"
          v-for="(item, index) in modulesArr"
          :key="item.id"
          :ref="'mtModule' + index"
          @click="handleModuleClick(item, index, $event)"
        >
          <component :is="item.tag" :transferData="item.transferData" v-if="!item.refreshFlag"></component>
          <div
            class="mt-mask"
            :style="{zIndex: item.baseConfig.zIndex ? item.baseConfig.zIndex + 2 : 100}"
            @mousedown.stop="handleMousedown(item, index, $event)"
            v-if="editMode && activeIndex === index"
          >
            <div
              :class="['mt-stretch', 'stretch' + i]"
              v-for="i in 4"
              :key="'stretch' + i"
              @mousedown.stop="handleStretch(index, i, $event)"
            >
              <div class="deco-grid" :style="getDecogridStyle(i, num)" v-for="num in 2" :key="num"></div>
            </div>
            <div class="corner-stretch" @mousedown.stop="handleStretch(index, -1, $event)"></div>
            <div
              class="mt-rotate"
              @mousedown.stop="handleMousedown(Object.assign({}, item, {type: 'rotate'}), index, $event)"
            ></div>
          </div>
          <div
            class="hover-mask"
            :style="{zIndex: item.baseConfig.zIndex ? item.baseConfig.zIndex + 1 : 99}"
            v-if="activeIndex !== index"
          ></div>
        </div>
        <div class="baseline-h" ref="baselineH" v-if="showHb"></div>
        <div class="baseline-v" ref="baselineV" v-if="showVb"></div>
      </div>
    </div>
    <editPanel
      :activeIndex="activeIndex"
      :form="form"
      :ctrConfig="ctrConfig"
      @oprChange="oprChange"
      @close="closePanel"
      v-if="editMode"
    ></editPanel>
  </div>
</template>

<script>
import editPanel from './editPanel'
export default {
  components: {
    editPanel
  },
  props: {
    modulesArr: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      // modulesArr: [],
      editMode: false,
      activeIndex: -2,
      ctrEle: null,
      dragData: {
        ele: null,
        isDrag: false,
        l: 0,
        t: 0,
        x: 0,
        y: 0,
      },
      stretchData: {
        ele: null,
        isStretch: false,
        index: null,
        x: 0,
        y: 0,
      },
      showHb: false,
      showVb: false,
      dragAble: false,
      form: {
        width: "",
        height: "",
        left: "",
        top: "",
        rotate: "",
        transparency: "",
        zIndex: "",
      },
      ctrConfig: {
        grid: false,
        align: true,
        width: "1920px",
        height: "1080px",
        bg: "#ffffff",
      },
      isFirstLoad: false,
      stopRecord: false,
      isModuleChange: false,
      cacheModuleData: null
    }
  },
  mounted () {
    this.ctrEle = this.$refs.mtContainer;
    this.ctrConfig.grid && this.createGrid()
    document.addEventListener('mouseup', this.handleMouseup, false)
    document.addEventListener("keyup", this.handleKeyup, false)
    document.body.onselectstart = document.body.ondrag = function () {
      return false;
    }
  },
  computed: {
    formData () {
      return JSON.parse(JSON.stringify(this.form))
    },
    ctrForm () {
      return JSON.parse(JSON.stringify(this.ctrConfig))
    },
    getCtrStyle () {
      const { width, height, bg: backgroundColor } = this.ctrConfig
      return {
        width,
        height,
        backgroundColor,
      }
    }
  },
  watch: {
    formData: {
      handler (v, old) {
        if (this.stopRecord || this.isModuleChange) {
          this.stopRecord === true && (this.stopRecord = false)
        } else {
          this.$emit('updateStepOper', {
            mode: 1,
            type: 'change',
            data: {
              baseConfig: JSON.parse(JSON.stringify(old))
            }
          })
        }
        // for (const key in v) {
        //   this.modulesArr[this.activeIndex].baseConfig[key] !== v[key] && this.$set(this.modulesArr[this.activeIndex].baseConfig, key, v[key])
        // }
        this.$emit('dataChange', { formData: v, activeIndex: this.activeIndex })
      },
      deep: true
    },
    ctrForm: {
      handler (v, o) {
        if (this.isFirstLoad) {
          this.isFirstLoad = false
          return
        }
        this.$emit('updateStepOper', {
          mode: 0,
          type: 'change',
          data: JSON.parse(JSON.stringify(o))
        })
      },
      deep: true
    }
  },
  destroyed () {
    document.removeEventListener('mouseup', this.handleMouseup)
    document.removeEventListener("keyup", this.handleKeyup)
  },
  methods: {
    // 模块设置样式
    getModuleStyle (item) {
      const baseConfig = item.baseConfig
      const obj = {}
      if (baseConfig && baseConfig instanceof Object) {
        for (const key in baseConfig) {
          if (key !== "rotate") {
            obj[key === "transparency" ? "opacity" : key] = baseConfig[key]
          }
        }
      }
      if (baseConfig.rotate || baseConfig.rotate === 0) {
        obj.transform = "rotate(" + baseConfig.rotate + "deg)"
      }
      return obj
    },
    getDecogridStyle (i, num) {
      let left;
      let top
      switch (i) {
        case 1:
          top = '1px'
          left = num === 1 ? 'calc(-4px)' : 'calc(50% - 4px)'
          break;
        case 2:
          top = num === 1 ? 'calc(-4px)' : 'calc(50% - 4px)'
          left = '1px'
          break;
        case 3:
          top = '1px'
          left = num === 1 ? 'calc(50% - 4px)' : 'calc(100% - 4px)'
          break;
        case 4:
          top = num === 1 ? 'calc(50% - 4px)' : 'calc(100% - 4px)'
          left = '1px'
          break;
      }
      return { left, top }
    },
    oprChange (data) {
      const { val, type } = data
      if (type === 'grid') {
        if (val) {
          this.createGrid()
        } else {
          const ele = document.getElementById('mtGrid')
          ele && this.ctrEle.removeChild(ele)
        }
      }
    },
    setContainer (ctrConfig) {
      const { width, height, bg } = ctrConfig;
      (width || height || bg) && (this.isFirstLoad = true)
      width && (this.ctrConfig.width = width)
      height && (this.ctrConfig.height = height)
      bg && (this.ctrConfig.bg = bg)
    },
    createGrid () {
      const s = 12
      const canvas = document.createElement('canvas')
      canvas.setAttribute('width', s + 'px')
      canvas.setAttribute('height', s + 'px')
      const ctx = canvas.getContext('2d')
      ctx.beginPath();
      // ctx.lineWidth = 2;
      ctx.strokeStyle = '#ddd';
      ctx.fillStyle = '#ddd';
      ctx.arc(s / 2, s / 2, 1, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.fill();
      const base64Url = canvas.toDataURL()
      const div = document.createElement('div')
      div.id = "mtGrid"
      div.setAttribute('style', `
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
                pointer-events:none;
                background-repeat:repeat;
                background-image:url('${base64Url}')
              `)
      this.ctrEle.appendChild(div)
    },
    closePanel () {
      this.editMode = false
      this.activeIndex = -2
      // const ele = this.$refs.editPanel
      // console.log(ele)
      // ele.$el.style.animation = "hide 0.3s"
      // // window.requestAnimationFrame(() => {
      // //   this.editMode = false
      // //   this.activeIndex = -2
      // // })
      // if (this.aniTimer) {
      //   clearTimeout(this.aniTimer)
      //   this.aniTimer = null
      // }
      // this.aniTimer = setTimeout(() => {
      //   this.editMode = false
      //   this.activeIndex = -2
      // }, 300)
    },
    // 容器点击事件
    boxClick (e) {
      const className = e.target.className
      if (className === "mt-stretch") {
        this.editMode = false
        this.activeIndex = -2
        return
      }
      if (className === "mt-container") {
        this.$emit('updateStepOper', {
          type: "select",
        })
        this.editMode = true
        this.activeIndex = -1
      }
    },
    // 每个模块点击事件
    handleModuleClick (item, index, e) {
      const className = e.target.className
      if (
        className === "mt-mask" ||
        className === "mt-rotate" ||
        e.target.classList.contains("mt-stretch") ||
        className === "deco-grid"
      ) {
        return
      }
      this.stopRecord = true
      this.$emit('updateStepOper', {
        type: "select",
      })
      this.editMode = true
      if (!this.editMode) {
        this.activeIndex = -2
        return
      }
      this.activeIndex = index
      const configData = this.modulesArr[index].baseConfig
      // this.form = JSON.parse(JSON.stringify(configData))
      for (const key in this.form) {
        if (configData[key] || configData[key] === 0) {
          this.form[key] = configData[key]
        } else {
          this.form[key] = ""
        }
      }
    },
    // 拖动事件
    handleMousedown (item, index, e) {
      if (e.target.className !== 'mt-mask' && e.target.className !== 'mt-rotate') return
      // console.log(this.$refs['mtModule' + index])
      const refs = this.$refs['mtModule' + index]
      if (!refs || !refs[0]) return
      this.dragData.isDrag = true
      this.cacheModuleData = JSON.parse(JSON.stringify(this.modulesArr[this.activeIndex]))
      const ele = refs[0]
      this.dragData.ele = ele
      this.dragData.x = e.clientX
      this.dragData.y = e.clientY
      if (item.type === 'rotate') {
        // this.dragData.cacheAngle = this.form.rotate
        // this.dragData.center = [ele.offsetWidth / 2 + ele.offsetLeft, ele.offsetHeight / 2 + ele.offsetTop]
        document.addEventListener('mousemove', this.rotateMove, false)
        return
      }
      this.dragData.l = ele.offsetLeft
      this.dragData.t = ele.offsetTop
      document.addEventListener('mousemove', this.move, false)
    },
    move (e) {
      e.stopPropagation()
      this.isModuleChange = true
      // this.dragData.isDrag = true
      const { l, t, x, y, ele } = this.dragData
      let xf = l + e.clientX - x
      let yf = t + e.clientY - y
      // let sobj = window.getComputedStyle(ele)
      xf < 0 && (xf = 0)
      yf < 0 && (yf = 0)
      if (this.ctrEle.offsetWidth - xf < ele.offsetWidth) {
        xf = this.ctrEle.offsetWidth - ele.offsetWidth
      }
      if (this.ctrEle.offsetHeight - yf < ele.offsetHeight) {
        yf = this.ctrEle.offsetHeight - ele.offsetHeight
      }
      // 基线对齐
      if (this.ctrConfig.align) {
        this.showHb = false
        this.showVb = false
        // 找到所有的模块
        let nearXData = []
        let nearYData = []
        this.modulesArr.forEach((item, index) => {
          if (index !== this.activeIndex) {
            const refs = this.$refs['mtModule' + index]
            if (refs && refs[0]) {
              const cl = refs[0].offsetLeft
              const ct = refs[0].offsetTop
              const cr = refs[0].offsetLeft + refs[0].offsetWidth
              const cb = refs[0].offsetTop + refs[0].offsetHeight
              const eleL = ele.offsetLeft
              const eleT = ele.offsetTop
              const eleR = ele.offsetLeft + ele.offsetWidth
              const eleB = ele.offsetTop + ele.offsetHeight
              const letrs = [[eleL, cl, 'left'], [eleL, cr, 'left'], [eleR, cl, 'right'], [eleR, cr, 'right']]
              const hArrs = [[eleT, ct, 'top'], [eleT, cb, 'top'], [eleB, ct, 'bottom'], [eleB, cb, 'bottom']]
              const arr1 = this.calcDistance(letrs)
              const arr2 = this.calcDistance(hArrs)
              arr1.length > 0 && (nearXData = nearXData.concat(arr1))
              arr2.length > 0 && (nearYData = nearYData.concat(arr2))
            }
          }
        })
        if (nearXData.length > 0) {
          const minX = this.findMin(nearXData)
          if (minX.mar !== minX.val && minX.dif < 5) {
            xf = minX.type === 'left' ? minX.val : minX.val - ele.offsetWidth
          }
          this.showVb = true
          this.$nextTick(() => {
            this.$refs.baselineV && (this.$refs.baselineV.style.left = minX.val + 'px')
          })
        }
        if (nearYData.length > 0) {
          const minY = this.findMin(nearYData)
          if (minY.mar !== minY.val && minY.dif < 5) {
            yf = minY.type === 'top' ? minY.val : minY.val - ele.offsetHeight
          }
          this.showHb = true
          this.$nextTick(() => {
            this.$refs.baselineH && (this.$refs.baselineH.style.top = minY.val + 'px')
          })
        }
      }
      this.$set(this.form, 'left', xf + 'px')
      this.$set(this.form, 'top', yf + 'px')
    },
    rotateMove (e) {
      this.isModuleChange = true
      const { ele, x, y } = this.dragData
      const sx = e.clientX
      const sy = e.clientY
      const cx = this.getOffsetLeft(ele) + ele.offsetWidth / 2 - this.$refs.mtScroll.scrollLeft
      const cy = this.getOffsetTop(ele) + ele.offsetHeight / 2 - this.$refs.mtScroll.scrollTop
      let angle = this.getAngle(x - cx, y - cy, sx - cx, sy - cy)
      if (angle > 180) {
        angle = angle - 360
      }
      this.$set(this.form, 'rotate', this.form.rotate + angle)
      this.dragData.x = sx
      this.dragData.y = sy
    },
    handleMouseup () {
      if (this.isModuleChange) {
        this.$emit('updateStepOper', {
          mode: 1,
          type: 'change',
          data: this.cacheModuleData
        })
        this.isModuleChange = false
      }
      this.showHb = false
      this.showVb = false
      if (this.dragData.isDrag) {
        document.removeEventListener('mousemove', this.move)
        document.removeEventListener('mousemove', this.rotateMove)
        this.dragData.isDrag = false
      }
      if (this.stretchData.isStretch) {
        document.removeEventListener('mousemove', this.stretchMove)
        this.stretchData.isStretch = false
      }
    },
    // 拉伸
    handleStretch (index, i, e) {
      if (!e.target.classList.contains('mt-stretch') && e.target.className !== 'deco-grid' && e.target.className !== 'corner-stretch') return
      const refs = this.$refs['mtModule' + index]
      if (!refs || !refs[0]) return
      this.stretchData.isStretch = true
      this.cacheModuleData = JSON.parse(JSON.stringify(this.modulesArr[this.activeIndex]))
      const ele = refs[0]
      this.stretchData.ele = ele
      this.stretchData.index = i
      this.stretchData.x = e.clientX
      this.stretchData.y = e.clientY
      document.addEventListener('mousemove', this.stretchMove, false)
    },
    stretchMove (e) {
      e.stopPropagation()
      this.isModuleChange = true
      const { ele, index, x, y } = this.stretchData
      let xf;
      let yf;
      let left;
      let top;
      switch (index) {
        case -1:
          xf = e.clientX - x
          yf = e.clientY - y
          break;
        case 1:
          yf = y - e.clientY
          top = ele.offsetTop + (yf * -1) + 'px'
          break;
        case 2:
          xf = e.clientX - x
          break;
        case 3:
          yf = e.clientY - y
          break;
        case 4:
          xf = x - e.clientX
          left = ele.offsetLeft + (xf * -1) + 'px'
          break;
      }
      if (xf) {
        // ele.style.width = width
        // this.$set(this.modulesArr[this.activeIndex].baseConfig, 'width', width)
        const width = ele.offsetWidth + xf + 'px'
        this.$set(this.form, 'width', width)
      }
      if (yf) {
        const height = ele.offsetHeight + yf + 'px'
        this.$set(this.form, 'height', height)
      }
      if (top) {
        this.$set(this.form, 'top', top)
      }
      if (left) {
        this.$set(this.form, 'left', left)
      }
      this.stretchData.x = e.clientX
      this.stretchData.y = e.clientY
    },
    getOffsetLeft (obj) {
      let tmp = obj.offsetLeft;
      let val = obj.offsetParent;
      while (val != null) {
        tmp += val.offsetLeft;
        val = val.offsetParent;
      }
      return tmp;
    },
    getOffsetTop (obj) {
      let tmp = obj.offsetTop;
      let val = obj.offsetParent;
      while (val != null) {
        tmp += val.offsetTop;
        val = val.offsetParent;
      }
      return tmp;
    },
    calcDistance (arr) {
      const rs = []
      arr.forEach(item => {
        const dif = Math.abs(item[0] - item[1])
        if (dif < 50) {
          rs.push({
            dif,
            mar: item[0],
            val: item[1],
            type: item[2]
          })
        }
      })
      return rs
    },
    findMin (arr) {
      let min;
      for (let i = 0, m = arr.length; i < m; i++) {
        min = arr[0];
        if (arr[i].dif < min.dif) {
          min = arr[i]
        }
      }
      return min
    },
    getAngle (x1, y1, x2, y2) {
      const dot = x1 * x2 + y1 * y2
      const det = x1 * y2 - y1 * x2
      const angle = Math.atan2(det, dot) / Math.PI * 180
      return Math.round(angle + 360) % 360
    },
    handleKeyup (e) {
      if (this.editMode && this.activeIndex >= 0 && e.keyCode === 46) {
        this.$emit('updateStepOper', {
          types: ['add', 'delete'],
          indexs: [this.activeIndex, -1],
          data: this.modulesArr[this.activeIndex]
        })
        this.$parent.modulesArr && this.$parent.modulesArr.splice(this.activeIndex, 1)
        this.activeIndex = -1
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main-wrap {
  height: 100%;
}
.mt-scroll-wrap {
  width: 100%;
  height: 100%;
  overflow: auto;
  border: 1px solid #000;
}
.mt-scroll-wrap.edit {
  width: calc(100% - 300px);
  transition: all 0.3s;
  /* border: 1px solid #ddd; */
}
.mt-container {
  position: relative;
  width: 100%;
  height: 2000px;
}
.mt-module {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.mt-mask,
.hover-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.mt-mask {
  cursor: move;
  border: 1px solid #666;
}
.hover-mask {
  z-index: 999999;
}
.hover-mask:hover {
  border: 1px solid #666;
}
.mt-stretch {
  position: absolute;
}
.stretch1,
.stretch3 {
  width: 100%;
  height: 10px;
}
.stretch2,
.stretch4 {
  width: 10px;
  height: 100%;
}
.stretch1 {
  left: 0;
  top: -5px;
  cursor: n-resize;
}
.stretch2 {
  right: -5px;
  top: 0;
  cursor: e-resize;
}
.stretch3 {
  left: 0;
  bottom: -5px;
  cursor: s-resize;
}
.stretch4 {
  left: -5px;
  top: 0;
  cursor: w-resize;
}
.corner-stretch {
  position: absolute;
  right: -5px;
  bottom: -5px;
  width: 10px;
  height: 10px;
  cursor: se-resize;
  z-index: 10;
}
.deco-grid {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #fff;
  border: 1px solid #666;
}
.baseline-h,
.baseline-v {
  position: absolute;
  background-color: #333;
  z-index: 999;
}
.baseline-h {
  width: 100%;
  height: 1px;
  left: 0 !important;
}
.baseline-v {
  width: 1px;
  height: 100%;
  top: 0 !important;
}
.mt-rotate {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: url(../img/rotate.png) 17px 17px no-repeat;
  cursor: pointer;
}
</style>