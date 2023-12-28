<template>
  <view style="background-color: #0c161e;height: 100vh;">
    <Navbar theme="transparent" />

    <view class="loading-wrap text-center">
      <image src="@/assets/charge-loading.png" mode="widthFix" />
      <view class="text-color-white">正在准备充电宝，请稍等！</view>
      <view class="flex-center" style="padding: 15px 0;">
        <nut-progress style="width: 50vw;" size="small" :percentage="progressValue" :text-inside="true"
         text-color="#0c161e" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { listenScoreOrder } from '@/api/order';
import Navbar from '@/components/Navbar/index.vue'
import usePollingTask from '@/hooks/usePollingTask';
import Taro from '@tarojs/taro';
import { useLoad } from '@tarojs/taro';
import { ref } from 'vue';

const progressValue = ref(0)
let orderId = 0

const progressPolling = usePollingTask(async () => {
  if (progressValue.value >= 80) return false
  progressValue.value += 20
  return true
}, { delay: 500 })

usePollingTask(async () => {
  const res = await listenScoreOrder({ pbo_id: orderId })
  console.log('result ===', res)
  if (res.data.pbo.status === 2) {
    progressPolling.clearTask()
    progressValue.value = 100

    setTimeout(() => {
      Taro.redirectTo({
        url: '/pages/charge_status/index?id=' + orderId
      })
    }, 1000);

    return false
  }
  return true
})

useLoad((options) => {
  if (options.id) {
    orderId = options.id
  }
})
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
