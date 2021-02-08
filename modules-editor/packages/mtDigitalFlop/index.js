/*
 * @Author: one-zero
 * @Date: 2021-02-07 10:18:43
 * @Description: 数字翻牌器
 */
import mtDigitalFlop from './mtDigitalFlop'
mtDigitalFlop.install = Vue => {
  Vue.component(mtDigitalFlop.name, mtDigitalFlop)
}
export default mtDigitalFlop