<template>
  <view class="official-article-container">
    <web-view :src='webUrl' />

    <cover-view v-if="!isShare" class="toolbar px shadow-t bg-color-white safe-b">
      <cover-view class="toolbar-wrap flex-center">
        <button class="shadow text-base bg-color-main text-color-white" style="padding: 0 10px;"  shape="square"
          @click="goShow">分享朋友圈，免费领取商品</button>
      </cover-view>
    </cover-view>
  </view>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { useLoad, useRouter } from '@tarojs/taro';
import { ref } from 'vue';

const router = useRouter()
const webUrl = ref('')

let shareInfo = {
  id: '',
  title: '',
  img: ''
}

const isShare = ref(true)  // 是否为分享页面
useLoad(() => {
  const { id, url, title, img, share } = router.params
  if (url) {
    webUrl.value = decodeURIComponent(decodeURIComponent(url))
    shareInfo.img = decodeURIComponent(decodeURIComponent(img || ''))
    shareInfo.title = decodeURIComponent(title || '公众号文章')
    shareInfo.id = id || ''

    setTimeout(() => {
      isShare.value = !!share
    }, 500)
  } else {
    Taro.showToast({
      title: '参数错误',
      icon: 'none'
    })
  }
})

const goShow = () => {
  Taro.navigateTo({
    url: `/pages/official_share/index?id=${shareInfo.id}&title=${shareInfo.title}&img=${encodeURIComponent(shareInfo.img)}&url=${encodeURIComponent(webUrl.value)}`
  })
}
</script>

<style lang="scss">
.official-article-container {
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999999;
    width: 100%;
    box-sizing: border-box;
    .toolbar-wrap {
      height: 100px;
    }
  }
}
</style>
