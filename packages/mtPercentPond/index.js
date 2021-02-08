/*
 * @Author: one-zero
 * @Date: 2021-02-07 10:18:43
 * @Description: 进度池
 */
import mtPercentPond from './mtPercentPond'
mtPercentPond.install = Vue => {
  Vue.component(mtPercentPond.name, mtPercentPond)
}
export default mtPercentPond