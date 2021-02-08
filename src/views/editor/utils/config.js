/*
 * @Author: one-zero
 * @Date: 2021-02-03 09:08:55
 * @Description:
 */
export default [
  {
    name: '按钮',
    icon: '',
    width: '100px',
    height: '40px',
    // js: './modules/baseComponent/baseComponent.umd.js',
    // css: './modules/baseComponent/baseComponent.css',
    tag: 'mt-button',
    transferData: { text: '按钮' }
  },
  {
    name: '表格',
    icon: '',
    width: '500px',
    // js: './modules/baseComponent/baseComponent.umd.js',
    // css: './modules/baseComponent/baseComponent.css',
    tag: 'mt-table',
  },
  {
    name: '边框1',
    icon: '',
    width: '500px',
    height: '300px',
    // js: 'https://unpkg.com/@jiaminghi/data-view/dist/datav.min.vue.js',
    tag: 'mt-border-box-1',
    refreshFlag: false // 是否强制刷新
  },
  {
    name: '边框2',
    icon: '',
    width: '500px',
    height: '300px',
    // js: 'https://unpkg.com/@jiaminghi/data-view/dist/datav.min.vue.js',
    tag: 'mt-border-box-2',
    refreshFlag: false, // 是否强制刷新
    transferData: {
      color: ['red', 'green']
    }
  },
  {
    name: '边框3',
    icon: '',
    width: '500px',
    height: '300px',
    // js: 'https://unpkg.com/@jiaminghi/data-view/dist/datav.min.vue.js',
    tag: 'mt-border-box-3',
    refreshFlag: false
  },
  {
    name: '边框8',
    icon: '',
    width: '500px',
    height: '300px',
    tag: 'mt-border-box-8',
    refreshFlag: false
  },
  {
    name: '装饰2',
    icon: '',
    width: '500px',
    height: '30px',
    tag: 'mt-decoration-2',
    refreshFlag: false
  },
  {
    name: '装饰5',
    icon: '',
    width: '500px',
    height: '30px',
    tag: 'mt-decoration-5',
    refreshFlag: false
  },
  {
    name: '排名轮播图',
    icon: '',
    width: '500px',
    height: '300px',
    tag: 'mt-scroll-ranking-board',
    refreshFlag: false,
    transferData: { // 配置数据
      config: {
        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          },
          {
            name: '信阳',
            value: 45
          },
          {
            name: '漯河',
            value: 29
          }
        ]
      }
    }
  },
  {
    name: '动态环图',
    icon: '',
    width: '300px',
    height: '300px',
    tag: 'mt-active-ring-chart',
    refreshFlag: false,
    transferData: { // 配置数据
      config: {
        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          },
          {
            name: '信阳',
            value: 45
          },
          {
            name: '漯河',
            value: 29
          }
        ],
        digitalFlopStyle: {
          fill: '#797979'
        }
      }
    }
  },
  {
    name: '胶囊柱图',
    icon: '',
    width: '500px',
    height: '300px',
    tag: 'mt-capsule-chart',
    refreshFlag: false,
    transferData: { // 配置数据
      style: {
        color: '#797979'
      },
      config: {
        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          },
          {
            name: '信阳',
            value: 45
          },
          {
            name: '漯河',
            value: 29
          }
        ],
        digitalFlopStyle: {
          fill: '#797979'
        }
      }
    }
  },
  {
    name: '水位图',
    icon: '',
    width: '200px',
    height: '300px',
    tag: 'mt-water-level-pond',
    refreshFlag: false,
    transferData: { // 配置数据
      config: {
        data: [66]
      }
    }
  },
  {
    name: '进度池',
    icon: '',
    width: '200px',
    height: '100px',
    tag: 'mt-percent-pond',
    refreshFlag: false,
    transferData: { // 配置数据
      config: {
        value: 66
      }
    }
  },
  {
    name: '飞线图',
    icon: '',
    width: '500px',
    height: '600px',
    tag: 'mt-flyline-chart-enhanced',
    refreshFlag: false,
    transferData: { // 配置数据
      config: {
        points: [
          {
            name: '郑州',
            coordinate: [0.48, 0.35],
            // icon: {
            //   src: '/img/flylineChart/mapCenterPoint.png',
            //   width: 30,
            //   height: 30
            // },
            text: {
              color: '#fb7293'
            }
          },
          {
            name: '新乡',
            coordinate: [0.52, 0.23]
          },
          {
            name: '焦作',
            coordinate: [0.43, 0.29]
          },
          {
            name: '开封',
            coordinate: [0.59, 0.35]
          },
          {
            name: '许昌',
            coordinate: [0.53, 0.47]
          },
          {
            name: '平顶山',
            coordinate: [0.45, 0.54]
          },
          {
            name: '洛阳',
            coordinate: [0.36, 0.38]
          },
          {
            name: '周口',
            coordinate: [0.62, 0.55]
          },
          {
            name: '漯河',
            coordinate: [0.56, 0.56]
          },
          {
            name: '南阳',
            coordinate: [0.37, 0.66]
          },
          {
            name: '信阳',
            coordinate: [0.55, 0.81]
          },
          {
            name: '驻马店',
            coordinate: [0.55, 0.67]
          },
          {
            name: '济源',
            coordinate: [0.37, 0.29]
          },
          {
            name: '三门峡',
            coordinate: [0.20, 0.36]
          },
          {
            name: '商丘',
            coordinate: [0.76, 0.41]
          },
          {
            name: '鹤壁',
            coordinate: [0.59, 0.18]
          },
          {
            name: '濮阳',
            coordinate: [0.68, 0.17]
          },
          {
            name: '安阳',
            coordinate: [0.59, 0.10]
          }
        ],
        lines: [
          {
            source: '新乡',
            target: '郑州'
          },
          {
            source: '焦作',
            target: '郑州'
          },
          {
            source: '开封',
            target: '郑州'
          },
          {
            source: '许昌',
            target: '郑州'
          },
          {
            source: '平顶山',
            target: '郑州'
          },
          {
            source: '洛阳',
            target: '郑州'
          },
          {
            source: '周口',
            target: '郑州'
          },
          {
            source: '漯河',
            target: '郑州'
          },
          {
            source: '南阳',
            target: '郑州'
          },
          {
            source: '信阳',
            target: '郑州'
          },
          {
            source: '驻马店',
            target: '郑州'
          },
          {
            source: '济源',
            target: '郑州'
          },
          {
            source: '三门峡',
            target: '郑州'
          },
          {
            source: '商丘',
            target: '郑州'
          },
          {
            source: '鹤壁',
            target: '郑州'
          },
          {
            source: '濮阳',
            target: '郑州'
          },
          {
            source: '安阳',
            target: '郑州'
          }
        ],
        // icon: {
        //   show: true,
        //   src: '/img/flylineChart/mapPoint.png'
        // },
        text: {
          show: true,
        }
        // bgImgSrc: '/img/flylineChart/map.jpg'
      }
    }
  },
  {
    name: '锥形柱图',
    icon: '',
    width: '400px',
    height: '200px',
    tag: 'mt-conical-column-chart',
    refreshFlag: false,
    transferData: { // 配置数据
      config: {
        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 71
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          },
          {
            name: '信阳',
            value: 35
          },
          {
            name: '漯河',
            value: 15
          }
        ],
        textColor: '#797979'
      }
    }
  },
  {
    name: '数字翻牌器',
    icon: '',
    width: '200px',
    height: '50px',
    tag: 'mt-digital-flop',
    refreshFlag: false,
    transferData: { // 配置数据
      config: {
        number: [100],
        content: '{nt}个'
      }
    }
  },
  {
    name: '轮播表',
    icon: '',
    width: '500px',
    height: '220px',
    tag: 'mt-scroll-board',
    refreshFlag: false,
    transferData: { // 配置数据
      config: {
        data: [
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3'],
          ['行7列1', '行7列2', '行7列3'],
          ['行8列1', '行8列2', '行8列3'],
          ['行9列1', '行9列2', '行9列3'],
          ['行10列1', '行10列2', '行10列3']
        ]
      }
    }
  },
  {
    name: '图表',
    icon: '',
    width: '300px',
    height: '300px',
    tag: 'mt-charts',
    refreshFlag: false,
    transferData: { // 配置数据
      config: {
        title: {
          text: '剩余油量表',
          style: {
            fill: '#fff'
          }
        },
        series: [
          {
            type: 'gauge',
            data: [{ name: 'itemA', value: 55 }],
            center: ['50%', '55%'],
            axisLabel: {
              formatter: '{value}%',
              style: {
                fill: '#fff'
              }
            },
            axisTick: {
              style: {
                stroke: '#fff'
              }
            },
            animationCurve: 'easeInOutBack'
          }
        ]
      }
    }
  }
]