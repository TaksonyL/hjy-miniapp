<template>
  <view class="order-status-container">
    <Navbar title="领取成功" />

    <view class="status-wrap bg-color-white text-center rounded">
      <IconFont class="status-icon" name="checked" color="#07c160" size="80"></IconFont>
      <view class="text-lg">领取成功，等待出货</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Navbar from '@/components/Navbar/index.vue'
import { IconFont } from '@nutui/icons-vue-taro';
</script>

<style lang="scss">
.order-status-container {
  .status-wrap {
    width: 500px;
    height: 240px;
    margin: 25vh auto 0;
    .status-icon {
      margin-top: -80px;
      margin-bottom: 30px;
    }
  }
}
</style>
