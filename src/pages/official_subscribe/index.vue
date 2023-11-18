<template>
  <view>
    <Navbar title="关注公众号" />

    <view style="padding-top: 20vh;" class="text-center">
      <nut-button type="primary" @click="subscribe">关注公众号</nut-button>

      <official-account></official-account>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Navbar from '@/components/Navbar/index.vue'
import Taro from '@tarojs/taro';

const subscribe = () => {
  Taro.navigateTo({
    url: "/pages/goods_list/index"
  })
}
</script>
