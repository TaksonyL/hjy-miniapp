<template>
  <view class="index">
    <Navbar theme="transparent" />

    <view class="rent-wrap bg-color-white px shadow-top">
      <view class="text-sm px" style="line-height: 30px;padding-bottom: 20px;padding-top: 20px;">
        <view>1. 三线设计，机身侧边备有充电口</view>
        <view>2. 1元/时，每24小时封顶10元</view>
        <view>3. 附近有100家可归还门店</view>
      </view>
      <view class="shadow bg-color-main text-color-white text-center"
        style="padding: 5px; border-radius: 24px;" @click="rent">
        <view>申请免押金租借</view>
        <view class="text-xs">(微信支付分550分及以上有经济会免押金)</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Navbar from '@/components/Navbar/index.vue'
import Taro from '@tarojs/taro';

const rent = () => {
  Taro.navigateTo({
    url: '/pages/charge_loading/index'
  })
}
</script>

<style lang="scss">
.rent-wrap {
  position: fixed;
  bottom: 0;
  width: 100vw;
  box-sizing: border-box;
  border-radius: 60px 60px 0 0;
  padding-top: 30px;
  padding-bottom: 60px;
}
</style>
