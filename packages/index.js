/*
 * @Author: one-zero
 * @Date: 2021-01-29 10:10:25
 * @Description:
 */
import Button from './button/index'
import Table from './table/index'
import MtBorderBox1 from './mtBorderBox1/index'
import MtBorderBox3 from './mtBorderBox3/index'
import MtDecoration2 from './mtDecoration2/index'
import MtScrollRankingBoard from './mtScrollRankingBoard/index'
import mtActiveRingChart from './mtActiveRingChart/index'
import mtCapsuleChart from './mtCapsuleChart/index'
import mtWaterLevelPond from './mtWaterLevelPond/index'
import mtPercentPond from './mtPercentPond/index'
import mtFlylineChartEnhanced from './mtFlylineChartEnhanced/index'
import mtConicalColumnChart from './mtConicalColumnChart/index'
import mtDigitalFlop from './mtDigitalFlop/index'
import mtScrollBoard from './mtScrollBoard/index'
import mtCharts from './mtCharts/index'
import mtBorderBox2 from './mtBorderBox2/index'
import mtDecoration5 from './mtDecoration5/index'
import mtBorderBox8 from './mtBorderBox8/index'

const components = [
  Button,
  Table,
  MtBorderBox1,
  MtBorderBox3,
  MtDecoration2,
  MtScrollRankingBoard,
  mtActiveRingChart,
  mtCapsuleChart,
  mtWaterLevelPond,
  mtPercentPond,
  mtFlylineChartEnhanced,
  mtConicalColumnChart,
  mtDigitalFlop,
  mtScrollBoard,
  mtCharts,
  mtBorderBox2,
  mtDecoration5,
  mtBorderBox8
]
const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  components.map(component => {
    Vue.component(component.name, component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}
