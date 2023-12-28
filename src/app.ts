import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/index.scss'
import './app.scss'
import { useCommonStore } from './store/common'
import { listenScoreOrder } from './api/order'
import Taro from '@tarojs/taro'

const App = createApp({
  onShow (options) {
    const commonStore = useCommonStore()
    commonStore.scene = options.scene
    console.log('app show ===', options)

    if (options?.scene === 1038) {
      const { extraData } = options.referrerInfo;
      if (extraData?.query_id) {
        listenScoreOrder({ pbo_id: commonStore.orderId }).then(res => {
          if (res.data.pbo.state_description === 'USER_CONFIRM') {
            Taro.redirectTo({
              url: '/pages/charge_loading/index?id=' + res.data.pbo.pbo_id
            })
          }
        })
      }
    }
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(createPinia())

export default App
