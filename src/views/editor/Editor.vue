<!--
 * @Author: one-zero
 * @Date: 2021-01-30 16:28:03
 * @Description:  编辑器
-->
<template>
  <div class="editor-container">
    <mt-header ref="mtHeader"></mt-header>
    <div class="mt-body">
      <mt-aside
        :loadFiles="loadFiles"
        :mergeResources="mergeResources"
        @updateStepOper="updateStepOper"
      ></mt-aside>
      <mtCanvas
        :modulesArr="modulesArr"
        @dataChange="dataChange"
        @updateStepOper="updateStepOper"
        ref="mtCanvas"
      ></mtCanvas>
    </div>
  </div>
</template>

<script lang="ts">
import mtHeader from "./components/mtHeader.vue"
import mtAside from "./components/mtAside.vue"
import mtCanvas from "./components/mtCanvas.vue"
import { Component, Vue } from "vue-property-decorator"
@Component({
  components: {
    mtHeader,
    mtAside,
    mtCanvas,
  },
})
export default class Editor extends Vue {
  relysArr: any[] = []
  modulesArr: any[] = []

  created() {
    this.initData()
  }

  initData() {
    const editorData: any = {
      ctrConfig: {},
      modules: [
        {
          // js: "./modules/baseComponent/baseComponent.umd.js",
          // css: "./modules/baseComponent/baseComponent.css",
          // id: 'm3',
          id: "test4",
          tag: "mt-button",
          transferData: {
            text: "这是一个button",
          },
          baseConfig: {
            width: "100px",
            height: "40px",
            left: 0,
            top: 0,
            rotate: 0,
            transparency: 1,
            zIndex: 1,
          },
        },
        {
          // js: "./modules/baseComponent/baseComponent.umd.js",
          // css: "./modules/baseComponent/baseComponent.css",
          // id: 'm3',
          id: "test5",
          tag: "mt-table",
          baseConfig: {
            width: "500px",
            height: "auto",
            left: 0,
            top: "100px",
            rotate: 0,
            transparency: 1,
            zIndex: 1,
          },
        },
        {
          // js: "./modules/baseComponent/baseComponent.umd.js",
          // css: "./modules/baseComponent/baseComponent.css",
          // id: 'm3',
          id: "test6",
          tag: "mt-table",
          baseConfig: {
            width: "300px",
            height: "auto",
            left: 0,
            top: "400px",
            rotate: 0,
            transparency: 1,
            zIndex: 1,
          },
        },
      ],
    }
    if (editorData.ctrConfig) {
      this.$nextTick(() => {
        const mtCanvas: any = this.$refs.mtCanvas
        if (mtCanvas && typeof mtCanvas.setContainer === "function") {
          mtCanvas.setContainer(editorData.ctrConfig)
        }
      })
    }
    const allPaths = !editorData.modules
      ? []
      : this.mergeResources(editorData.modules)
    // console.log(allPaths)
    this.loadFiles(allPaths, (err) => {
      if (err) {
        console.log(err.message)
      }
      const modules = JSON.parse(JSON.stringify(editorData.modules))
      this.modulesArr = modules.map((item, index) => {
        !item.id && (item.id = "mt_" + index)
        return item
      })
    })
  }

  // 合并资源
  mergeResources(arr) {
    let cssPaths: any[] = []
    let jsPaths: any[] = []
    arr.forEach((data) => {
      const { relys, css, js } = data
      if (relys) {
        if (relys instanceof Object) {
          if (relys instanceof Array) {
            relys.forEach((item) => {
              const { cssArr, jsArr } = this.getPaths(item, cssPaths, jsPaths)
              cssPaths = cssPaths.concat(cssArr)
              jsPaths = jsPaths.concat(jsArr)
            })
          } else {
            const { cssArr, jsArr } = this.getPaths(relys, cssPaths, jsPaths)
            cssPaths = cssPaths.concat(cssArr)
            jsPaths = jsPaths.concat(jsArr)
          }
        }
      }
      css &&
        !cssPaths.includes(css) &&
        !this.relysArr.includes(css) &&
        cssPaths.push(css)
      js &&
        !jsPaths.includes(js) &&
        !this.relysArr.includes(js) &&
        jsPaths.push(js)
    })
    const allPaths: any[] = [...new Set(cssPaths), ...new Set(jsPaths)]
    this.relysArr = [...this.relysArr, ...allPaths]
    // console.log(allPaths)
    return allPaths
  }

  getPaths(item, cssPaths, jsPaths) {
    const cssArr: any[] = []
    const jsArr: any[] = []
    if (item.css) {
      if (item.css instanceof Array) {
        item.css.forEach((path: string) => {
          path &&
            this.relysArr.indexOf(path) < 0 &&
            cssPaths.indexOf(path) < 0 &&
            cssArr.push(path)
        })
      } else {
        item.css &&
          this.relysArr.indexOf(item.css) < 0 &&
          cssPaths.indexOf(item.css) < 0 &&
          cssArr.push(item.css)
      }
    }
    if (item.js) {
      if (item.js instanceof Array) {
        item.js.forEach((path) => {
          path &&
            this.relysArr.indexOf(path) < 0 &&
            jsPaths.indexOf(path) < 0 &&
            jsArr.push(path)
        })
      } else {
        item.js &&
          this.relysArr.indexOf(item.js) < 0 &&
          jsPaths.indexOf(item.js) < 0 &&
          jsArr.push(item.js)
      }
    }
    return { cssArr, jsArr }
  }

  loadFiles(arr, callback) {
    const urls = JSON.parse(JSON.stringify(arr))
    callback = callback || function (): void {}
    // 添加script或link属性，并添加到head中
    const self = this
    const loader = function (src, handler) {
      const type = self.getFileType(src)
      let tag
      if (type === ".js") {
        tag = document.createElement("script")
        tag.type = "text/javascript"
        tag.src = src
      } else if (type === ".css") {
        tag = document.createElement("link")
        tag.rel = "stylesheet"
        tag.type = "text/css"
        tag.href = src
      }
      tag.onload = function () {
        tag.onload = null
        tag.onerror = null
        handler()
      }
      tag.onerror = function () {
        tag.onload = null
        tag.onerror = null
        callback({
          message: src + "依赖未加载成功！",
        })
      }
      const head = document.getElementsByTagName("head")[0]
      ;(head || document.body).appendChild(tag)
    }
    // 自执行函数，用于循环loader
    ;(function run() {
      if (urls.length > 0) {
        loader(urls.shift(), run)
      } else {
        callback()
      }
    })()
  }

  getFileType(url) {
    if (url != null && url.length > 0) {
      return url.substr(url.lastIndexOf(".")).toLowerCase()
    }
    return ""
  }

  dataChange(v) {
    const { formData, activeIndex } = v
    for (const key in formData) {
      this.modulesArr[activeIndex].baseConfig[key] !== formData[key] &&
        this.$set(this.modulesArr[activeIndex].baseConfig, key, formData[key])
    }
    const { refreshFlag } = this.modulesArr[activeIndex]
    if (typeof refreshFlag === "boolean") {
      // 强制刷新组件
      this.modulesArr[activeIndex].refreshFlag = true
      this.$nextTick(() => {
        this.modulesArr[activeIndex].refreshFlag = false
      })
    }
  }

  updateStepOper(params) {
    const mtHeader: any = this.$refs.mtHeader
    mtHeader &&
      typeof mtHeader.updateStepOper === "function" &&
      mtHeader.updateStepOper(params)
  }
}
</script>

<style lang="less" scoped>
.editor-container {
  height: 100%;
  padding-top: 35px;
}
.mt-body {
  height: 100%;
  padding-left: 200px;
}
</style>