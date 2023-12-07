<template>
  <view>
    <Navbar title="分享文章" />

    <view class="share-wrap">
      <view class="share-item bg-color-white rounded shadow">
        <view class="share-header">
          <image src="@/assets/article-header.png" style="width: 100%;" mode="widthFix" />
        </view>
        <view class="share-text text-lg">{{ shareInfo.title }}</view>
        <image class="rounded-sm" :src="shareInfo.img" />
      </view>

      <view v-if="!isShare && shareAble" class="text-center">
        <nut-button type="primary" shape="square" @click="goFree">免费领取</nut-button>  
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { addOfficialShare } from '@/api/official';
import Navbar from '@/components/Navbar/index.vue'
import { useCommonStore } from '@/store/common';
import Taro, { useDidShow, useLoad, useRouter, useShareTimeline } from '@tarojs/taro';
import { computed, reactive, ref } from 'vue';

const shareInfo = reactive({
  id: '',
  title: '',
  img: '',
  path: ''
})
const commonStore = useCommonStore()
const isShare = computed(() => {
  // 是否分享朋友圈的单页模式
  return commonStore.scene === 1154
})

const shareAble = ref(false)
useShareTimeline(() => {
  const query = `id=${shareInfo.id}&title=${shareInfo.title}&img=${encodeURIComponent(shareInfo.img)}&url=${encodeURIComponent(shareInfo.path)}`
  addOfficialShare({ article_id: shareInfo.id }).then(() => {
    shareAble.value = true
  })

  return {
    title: shareInfo.title,
    query
  }
})

const goFree = () => {
  Taro.redirectTo({
    url: '/pages/goods_list/index'
  })
}

const router = useRouter()
useLoad(() => {
  const { url, title, img, id } = router.params
  console.log('test ===', router.params, router)
  if (url) {
    shareInfo.path = decodeURIComponent(decodeURIComponent(url))
    shareInfo.img = decodeURIComponent(decodeURIComponent(img || ''))
    shareInfo.title = decodeURIComponent(title || '公众号文章')
    shareInfo.id = id || ''
  } else {
    Taro.showToast({
      title: '参数错误',
      icon: 'none'
    })
  }
})

useDidShow(() => {
  if (commonStore.scene === 1155) {
    Taro.redirectTo({
      url: `/pages/official_article/index?id=${shareInfo.id}&title=${shareInfo.title}&img=${encodeURIComponent(shareInfo.img)}&url=${encodeURIComponent(shareInfo.path)}&share=true`
    })
  }
})
</script>

<style lang="scss">
.share-wrap {
  .share-item {
    margin: 20vh auto 60px;
    width: 600px;
    padding: 30px;
    padding-top: 40px;
    box-sizing: border-box;
    position: relative;
    .share-header {
      position: absolute;
      width: 100%;
      left: 0;
      top: -200px;
    }
    image {
      width: 100%;
      height: 360px;
      margin-top: 30px;
    }
  }
}
</style>
