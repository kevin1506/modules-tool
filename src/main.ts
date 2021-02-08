/*
 * @Author: one-zero
 * @Date: 2021-01-30 15:16:48
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuescroll from 'vuescroll'
import './assets/style/reset.less'
import "element-ui/lib/theme-chalk/index.css";
import './plugin/element.js'
import dataV from '@jiaminghi/data-view'
import baseComponent from './packages/index.js'

Vue.config.productionTip = false;
const win: any = window
win.Vue = Vue

Vue.use(dataV)
Vue.use(baseComponent)
Vue.use(vuescroll, {
  ops: {
    rail: {
      // background: 'rgba(2,124,142,0.7)',
      background: 'rgba(0,0,0,0.1)',
      size: '8px',
      specifyBorderRadius: '0px',
      gutterOfSide: '0px'
    },
    bar: {
      background: 'rgba(0,0,0,0.2)',
      onlyShowBarOnScroll: false,
      keepShow: true
    }
  } // 在这里设置全局默认配置
  // name: 'vueScroll' // 在这里自定义组件名字，默认是vueScroll
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
