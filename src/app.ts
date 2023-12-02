import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/index.scss'
import './app.scss'
import { useCommonStore } from './store/common'

const App = createApp({
  onShow (options) {
    const commonStore = useCommonStore()
    commonStore.scene = options.scene
    console.log('app show ===', options)
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(createPinia())

export default App
