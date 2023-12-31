export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/charge_rent/index',
    'pages/charge_loading/index',
    'pages/charge_status/index',
    'pages/official_subscribe/index',
    'pages/official_article/index',
    'pages/official_share/index',
    'pages/official_qrcode/index',
    'pages/order_confirm/index',
    'pages/order_status/index',
    'pages/goods_list/index',
    'pages/order_list/index',
    'pages/order_detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于核实是否位于设备旁边'
    }
  },
  requiredPrivateInfos: [
    "getLocation"
  ]
})
