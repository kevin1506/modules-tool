/*
 * @Author: one-zero
 * @Date: 2021-02-07 10:03:45
 * @Description: 水位图
 */
import mtWaterLevelPond from './mtWaterLevelPond'
mtWaterLevelPond.install = Vue => {
  Vue.component(mtWaterLevelPond.name, mtWaterLevelPond)
}
export default mtWaterLevelPond