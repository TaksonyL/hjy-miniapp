<template>
  <view>
    <Navbar title="分享文章" />

    <view v-if="tipsShow" class="share-mask"
      @click="tipsShow = false"
    >
      <view class="share-tips bg-color-main text-color-white px rounded-sm">
        点击•••可将小程序直接转发至朋友圈
        <IconFont style="margin-left: 8px;" name="close" size="8" />
        <view class="share-arrow"></view>
      </view>
    </view>

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
import { IconFont } from '@nutui/icons-vue-taro';

const tipsShow = ref(true);

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
  }).catch(err => {
    if (err?.msg) {
      Taro.showModal({
        title: '提示',
        content: err.msg
      })
    }
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
.share-mask {
  position: fixed;
  z-index: 9;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .5);

  .share-tips {
    position: absolute;
    right: 0;
    top: 30px;
    height: 70px;
    line-height: 70px;

    .share-arrow {
      position: absolute;
      right: 120px;
      top: -36px;
      width: 0;
      height: 0;
      border-color: transparent transparent $color-main transparent;
      border-width: 20px;
      border-style: solid;
    }
  }
}
// .share-tips {
//   position: absolute;
// }

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
