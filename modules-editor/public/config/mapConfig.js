// 地图配置
window.GlobalMapConfig = {
  center: [117.246, 32.237], // 默认中心位置
  zoom: 8.8, // 默认地图缩放等级
  baseMap: { // 地图底图
    cite: 'gaosu_map',
    name: 'gaosu_map',
    extent: [108.36330700000008, 24.488952000000086, 122.6998977661133, 38.21349716186528]
  },
  textMap: { // 文字图层
    cite: 'gaosu_map_label',
    name: 'gaosu_map_label',
    extent: [114.881357, 29.422414, 119.636249, 34.648418]
  },
  roadMap: { // 双线路网 高速公路双线图层 最小比例1:25000，最大比例1:1
    // cite: 'gaosu_highway_level6_8',
    cite: 'gaosu_highway',
    name: 'gaosu_highway',
    extent: [115.19698100000005, 29.42368300000004, 119.55718800000011, 34.59951600000005],
    wms: '/geoserver/cite/wms?service=WMS&version=1.1.0&request=GetMap&layers=cite:gaosu_highway&styles=&bbox=115.19698100000005,29.42368300000004,119.55718800000011,34.59951600000005&width=646&height=768&srs=EPSG:4326&format=application/openlayers'
  },
  areaMap: { // 行政区划区域
    cite: 'gaosu_city_polygon',
    name: 'district'
  },
  roadMap_level6_8: { // 双线路网 高速公路双线图层，最小比例1:6000000，最大比例1:800000
    cite: 'gaosu_highway_level6_8',
    name: 'gaosu_highway_level6_8',
    extent: [115.19698100000005, 29.42368300000004, 119.55718800000011, 34.59951600000005],
    wms: '/geoserver/cite/wms?service=WMS&version=1.1.0&request=GetMap&layers=cite%3Agaosu_highway_level6_8&bbox=115.19601415215443%2C29.42238462074161%2C119.56124938466172%2C34.605679082616845&width=646&height=768&srs=EPSG%3A4326&format=application/openlayers'
  },
  roadMap_level9_11: { // 双线路网 高速公路双线图层，最小比例1:800000，最大比例1:100000
    cite: 'gaosu_highway_level9_11',
    name: 'gaosu_highway_level9_11',
    extent: [115.19698100000005, 29.42368300000004, 119.55718800000011, 34.59951600000005],
    wms: '/geoserver/cite/wms?service=WMS&version=1.1.0&request=GetMap&layers=cite%3Agaosu_highway_level9_11&bbox=115.19685163043094%2C29.423573575106605%2C119.55800027693243%2C34.60074861652341&width=646&height=768&srs=EPSG%3A4326&format=application/openlayers'
  },
  roadMap_level12_13: { // 双线路网 高速公路双线图层，最小比例1:100000，最大比例1:25000
    cite: 'gaosu_highway_level12_13',
    name: 'gaosu_highway_level12_13',
    extent: [115.19698100000005, 29.42368300000004, 119.55718800000011, 34.59951600000005],
    wms: '/geoserver/cite/wms?service=WMS&version=1.1.0&request=GetMap&layers=cite%3Agaosu_highway_level12_13&bbox=115.19700802264097%2C29.423672057510696%2C119.55726922769334%2C34.599639261652385&width=646&height=768&srs=EPSG%3A4326&format=application/openlayers'
  },
  xuancheng: {
    roadMap: { // 宣城双线路网
      cite: 'gaosu_h5road_double_xc',
      name: 'gaosu_h5road_double_xc',
      extent: [118.63196546900008, 30.884489531000042, 118.90795405100005, 31.041918424000073],
      wms: '/geoserver/cite/wms?service=WMS&version=1.1.0&request=GetMap&layers=cite%3Agaosu_h5road_xc&bbox=118.63196546900008%2C30.884489531000042%2C118.90795405100005%2C31.041918424000073&width=768&height=438&srs=EPSG%3A4326&format=application/openlayers'
    },
    gist: {
      cite: 'xuancheng_GIST',
      name: 'xuancheng_GIST',
      extent: [118.502746582031, 30.8636856079102, 119.562484741211, 31.0389385223389],
      center: [117.246, 31.837],
      wms: '/geoserver/cite/wms?service=WMS&version=1.1.0&request=GetMap&layers=cite%3Axuancheng_GIST&bbox=118.502746582031%2C30.8636856079102%2C119.562484741211%2C31.0389385223389&width=768&height=330&srs=EPSG%3A4326&format=application/openlayers'
    }
  },
  gist: {
    cite: 'gaosu_GIST',
    name: 'gaosu_GIST',
    extent: [115.175338745117, 29.3979358673096, 119.578872680664, 34.6253280639648],
    center: [117.246, 31.837],
    wms: '/geoserver/cite/wms?service=WMS&version=1.1.0&request=GetMap&layers=cite%3Agaosu_GIST&bbox=115.175338745117%2C29.3979358673096%2C119.578872680664%2C34.6253280639648&width=646&height=768&srs=EPSG%3A4326&format=application/openlayers'
  }
}
