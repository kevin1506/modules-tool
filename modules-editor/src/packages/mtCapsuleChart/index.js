/*
 * @Author: one-zero
 * @Date: 2021-02-07 09:42:10
 * @Description: 胶囊柱图
 */
import mtCapsuleChart from './mtCapsuleChart'
mtCapsuleChart.install = Vue => {
  Vue.component(mtCapsuleChart.name, mtCapsuleChart)
}
export default mtCapsuleChart