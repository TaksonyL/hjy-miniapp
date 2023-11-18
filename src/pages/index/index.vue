<template>
  <view class="flex flex-col" style="height: 100vh;">
    <Navbar title="首页" />

    <view class="flex-center flex-col" style="height: 100%;">
      <view class="btn-item text-color-white bg-color-main flex-center flex-col shadow" style="margin-bottom: 20px;"
        @click="goPage('/pages/charge_rent/index')">
        <image src="@/assets/icon-charge-pal.png" mode="heightFix" />
        <view>充电宝租借</view>
      </view>
      <view class="btn-item text-color-white bg-color-main flex-center flex-col shadow"
        @click="goPage('/pages/official_subscribe/index')">
        <image src="@/assets/icon-gift.png" mode="heightFix" />
        <view>免费领取礼品</view>
      </view>  
    </view>
  </view>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar/index.vue'
import Taro from '@tarojs/taro';


const goPage = (url: string) => {
  Taro.navigateTo({
    url
  })
}
</script>

<style lang="scss">
.btn-item {
  width: 300px;
  height: 300px;
  text-align: center;
  border-radius: 16px;
  image {
    height: 120px;
    width: 120px;
    margin-bottom: 10px;
  }
}
</style>
