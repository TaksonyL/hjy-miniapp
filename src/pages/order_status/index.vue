<template>
  <view class="order-status-container">
    <Navbar title="领取成功" :is-back="false" />

    <view class="status-wrap bg-color-white text-center rounded">
      <view class="icon-wrap" :style="{ backgroundColor: type===MessageType.LOADING?'#ffc300':'#fafafa' }">
        <IconFont v-if="type === MessageType.LOADING" name="loading1" color="#fafafa" :size="48"></IconFont>
        <IconFont v-else-if="type === MessageType.SUCCESS" name="checked" color="#07c160" :size="80"></IconFont>
        <IconFont v-else-if="type === MessageType.FAIL" name="mask-close" color="#d7000f" :size="80"></IconFont>
      </view>
      <view class="text-lg">{{ messageInfo.content }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { listenFreeOrder } from '@/api/order';
import Navbar from '@/components/Navbar/index.vue'
import usePollingTask from '@/hooks/usePollingTask';
import { IconFont } from '@nutui/icons-vue-taro';
import { useLoad } from '@tarojs/taro';
import { computed, ref } from 'vue';

enum MessageType {
  LOADING,
  SUCCESS,
  FAIL
}

let orderId = 0
const type = ref<MessageType>(MessageType.LOADING)

const messageInfo = computed(() => {
  switch(type.value) {
    case MessageType.LOADING:
      return {
        icon: 'loading1',
        size: '48',
        color: '#fafafa',
        content: '设备出货中，请等待！'
      }
    case MessageType.SUCCESS:
      return {
        icon: 'checked',
        size: '80',
        color: '#07c160',
        content: '出货成功!'
      }
    case MessageType.FAIL:
      return {
        icon: 'mask-close',
        size: '80',
        color: '#d7000f',
        content: '出货失败！'
      }
  }
})

usePollingTask(async () => {
  const res = await listenFreeOrder({ order_id: orderId })
  console.log('order ===', res)
  switch(res.data.order_out_status) {
    case 0:
    case 3:
    case 6:
      return true
    case 1:
      type.value = MessageType.SUCCESS
      return false
    default:
      type.value = MessageType.FAIL
      return false
  }
})

useLoad((options) => {
  if (options.id) {
    orderId = Number(options.id)
  }
})
</script>

<style lang="scss">
.order-status-container {
  .status-wrap {
    width: 500px;
    height: 240px;
    margin: 25vh auto 0;
    padding-top: 120px;
    position: relative;
    box-sizing: border-box;
    .icon-wrap {
      position: absolute;
      left: 50%;
      top: -80px;
      margin-left: -80px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 160px;
      height: 160px;
    }
  }
}
</style>
