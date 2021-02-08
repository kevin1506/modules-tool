window.GlobalConfig = {
  // 公司开发环境地址
  dev: true,
  title: '配置文件，可修改',
  // 开发环境地址
  apiIp: 'http://192.168.201.234:8380', // 接口IP
  cubeUrl: 'http://192.168.201.234:8481/userDefineFlow/index.html', // 数据魔方页面url
  // apiIp: 'http://192.168.201.71:8380', // 接口IP(合肥)
  mapIp: '', // 地图服务IP
  mqttIp: '192.168.201.71:61614',
  mqttTopic: 'test', // mqtt连接主题
  isCommunication: true, // 是否和高速大脑连接通讯
  isDesensitization: true, // 是否脱敏
  cityCode: '3400', // 当前默认城市代码
  systemName: '安徽交通大数据', // 系统名称
  // 地图相关配置
  mapConf: window.GlobalMapConfig,
  // 单点登录跳转地址，如不添加单点登录，则删除该属性即可
  loginUrl: 'http://192.168.200.243:8077/fw-sys/cn/user/toLogin.html',
  loginip: 'http://192.168.200.243:8081'
}
