<template>
  <view style="background-color: #0c161e;height: 100vh;">
    <Navbar theme="transparent" />

    <view class="loading-wrap text-center">
      <image src="@/assets/charge-loading.png" mode="widthFix" />
      <view class="text-color-white">正在准备充电宝，请稍等！</view>
      <view class="flex-center" style="padding: 15px 0;">
        <nut-progress style="width: 50vw;" size="small" percentage="60" :text-inside="true"
         text-color="#0c161e" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Navbar from '@/components/Navbar/index.vue'
</script>

<style lang="scss">
.loading-wrap {
  padding-top: 20vh;
  image {
    width: 50vw;
    margin-bottom: 60px;
  }

  --nut-progress-inner-background-color: rgba(250, 250, 250, 1);
  --nut-progress-outer-background-color: rgba(250, 250, 250, .2);
}
</style>
