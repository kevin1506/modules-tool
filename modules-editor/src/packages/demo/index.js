/*
 * @Author: one-zero
 * @Date: 2021-02-07 10:18:43
 * @Description: demo
 */
import mtCapsuleChart from './mtCapsuleChart'
mtCapsuleChart.install = Vue => {
  Vue.component(mtCapsuleChart.name, mtCapsuleChart)
}
export default mtCapsuleChart