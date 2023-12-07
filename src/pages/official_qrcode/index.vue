<template>
  <view class="">
    <Navbar title="关注公众号" />

    <view class="text-wrap text-center text-lg">
      <template v-if="isQuota">
        <view>已有免费领取资格</view>
        <view>正在等待跳转</view>
      </template>
      <template v-else>
        <view>关注公众号</view>
        <view>获得免费领取资格</view>
      </template>
    </view>
    <view v-if="!isQuota" class="qrcode-wrap">
      <ImgWrap :src="qrcode" :is-prefix="false" />
    </view>
  </view>
</template>

<script lang="ts" setup> 
import Navbar from '@/components/Navbar/index.vue'
import ImgWrap from '@/components/ImgWrap/index.vue'
import { useDidShow } from '@tarojs/taro';
import { getOfficialQrcode } from '@/api/official';
import { ref } from 'vue';
import { getFreeQuota } from '@/api/order';
import Taro from '@tarojs/taro';
import { useUserStore } from '@/store/user';

const userStore = useUserStore()
const isQuota = ref(false)    // 是否有免费领取资格
const qrcode = ref('')

useDidShow(() => {
  getFreeQuota({}).then(() => {
    // 已有免费额度
    Taro.redirectTo({
      url: '/pages/goods_list/index'
    })
  }).catch(() => {
    if (userStore.userInfo && userStore.userInfo?.of_subscrible === 1) {
      // 已关注过
      Taro.redirectTo({
        url: '/pages/official_subscribe/index'
      })
    } else {
      // 未关注过
      getOfficialQrcode({}).then(res => {
        qrcode.value = res.data
      })
    }
  })
})
</script>

<style lang="scss">
.text-wrap {
  margin: 10vh 0 30px;
}
.qrcode-wrap {
  width: 600px;
  height: 600px;
  margin: 0 auto;
}
</style>
