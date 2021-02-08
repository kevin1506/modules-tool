<!--
 * @Author: one-zero
 * @Date: 2021-02-03 15:16:27
 * @Description: 预览页
-->
<template>
  <div class="main-wrap">
    <div class="mt-scroll-wrap" ref="mtScroll" id="mtScroll">
      <div id="mtContainer" class="mt-container" :style="getCtrStyle" ref="mtContainer">
        <div
          :id="item.id"
          class="mt-module"
          :style="getModuleStyle(item)"
          v-for="(item, index) in modulesArr"
          :key="item.id"
          :ref="'mtModule' + index"
        >
          <component :is="item.tag" :transferData="item.transferData" v-if="!item.refreshFlag"></component>
          <!-- <component
            :is="item.tag"
            :[getDynaAttr(item,1)]="item.config || ''"
            :[getDynaAttr(item,2)]="item.option || ''"
          ></component>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
  components: {},
})
export default class Preview extends Vue {
  relysArr: any[] = []
  modulesArr: any[] = []
  ctrConfig: any = {}
  created() {
    if (this.$route.query.data) {
      const $route: any = this.$route
      const editorData = JSON.parse($route.query.data)
      if (editorData.ctrConfig) {
        const { width, height, bg } = editorData.ctrConfig
        width && (this.ctrConfig.width = width)
        height && (this.ctrConfig.height = height)
        bg && (this.ctrConfig.bg = bg)
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
  }

  get getCtrStyle() {
    if (JSON.stringify(this.ctrConfig) === "{}") {
      return {}
    }
    const { width, height, bg: backgroundColor } = this.ctrConfig
    return {
      width,
      height,
      backgroundColor,
    }
  }

  // 模块设置样式
  getModuleStyle(item) {
    const baseConfig = item.baseConfig
    const obj: any = {}
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
  }

  getDynaAttr(item, type) {
    const types = ["", "config", "option"]
    if (item[types[type]]) {
      return types[type]
    }
    return ""
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
}
.mt-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.mt-module {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>