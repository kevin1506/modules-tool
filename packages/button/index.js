/*
 * @Author: one-zero
 * @Date: 2021-01-29 10:09:21
 * @Description:
 */
import Button from './button'
Button.install = Vue => {
  Vue.component(Button.name, Button)
}
export default Button
