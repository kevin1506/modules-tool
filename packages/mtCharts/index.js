/*
 * @Author: one-zero
 * @Date: 2021-02-07 10:18:43
 * @Description: 图表
 */
import mtCharts from './mtCharts'
mtCharts.install = Vue => {
  Vue.component(mtCharts.name, mtCharts)
}
export default mtCharts