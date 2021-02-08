/*
 * @Author: one-zero
 * @Date: 2021-02-04 20:05:07
 * @Description: 动态环图
 */
import mtActiveRingChart from './mtActiveRingChart'
mtActiveRingChart.install = Vue => {
  Vue.component(mtActiveRingChart.name, mtActiveRingChart)
}
export default mtActiveRingChart