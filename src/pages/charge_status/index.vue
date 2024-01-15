<template>
  <view class="order-status-container">
    <Navbar title="租借成功" />

    <view class="status-wrap bg-color-white text-center rounded">
      <view class="icon-wrap" :style="{ backgroundColor: type===MessageType.LOADING?'#ffc300':'#fafafa' }">
        <IconFont :name="messageInfo.icon" :color="messageInfo.color" :size="messageInfo.size"></IconFont>
      </view>
      <view class="text-lg text-bold" style="margin-bottom: 30px;">{{ messageInfo.content }}</view>
      <view v-if="data.pbo" class="px">
        <view class="order-cell">
          <view>订单编号：</view>
          <view>{{ data.pbo.trade_no }}</view>
        </view>
        <view class="order-cell">
          <view>设备编号：</view>
          <view>{{ data.pbo.lease_machine_code }}</view>
        </view>
        <view class="order-cell">
          <view>充电宝编号：</view>
          <view>{{ data.pbo.pb_number }}</view>
        </view>
      </view>
    </view>

    <view class="order-button leading bg-color-success mx-auto text-color-white text-center rounded"
     @click="goDetail">查看订单</view>

  </view>
</template>

<script lang="ts" setup>
import Navbar from '@/components/Navbar/index.vue'
import { IconFont } from '@nutui/icons-vue-taro';
import { computed, ref } from 'vue';
import { listenScoreOrder } from '@/api/order';
import { useLoad } from '@tarojs/taro';
import useRequest from '@/hooks/useRequest';
import Taro from '@tarojs/taro';

enum MessageType {
  LOADING,
  SUCCESS,
  FAIL
}

const type = ref<MessageType>(MessageType.SUCCESS)

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
        content: '租借成功!'
      }
    case MessageType.FAIL:
      return {
        icon: 'mask-close',
        size: '80',
        color: '#d7000f',
        content: '租借失败！'
      }
  }
})

const goDetail = () => {
  Taro.redirectTo({
    url: '/pages/order_detail/index?id=' + orderId
  })
}

const { data, getData } = useRequest(listenScoreOrder)

let orderId = 0
useLoad((options) => {
  if (options.id) {
    orderId = Number(options.id)
    getData({ pbo_id: orderId })
  }
})
</script>

<style lang="scss">
.order-status-container {
  .status-wrap {
    width: 600px;
    margin: 20vh auto 0;
    padding-top: 120px;
    padding-bottom: 60px;
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

  .order-button {
    width: 360px;
    margin-top: 60px;
  }

  .order-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 50px;
    color: #777;
  }
}
</style>
