<template>
  <view class="container">
    <Navbar title="订单列表" />

    <view class="order-list px pt text-sm">
      
      <view v-for="(item, index) in data" :key="index"
       class="order-item bg-color-white rounded-sm"
       @tap="goDetail(item.pbo_id)">
        <view class="order-cell border-b px">
          <Tag :value="item.status" :options="orderStatusOptions" plain />
          <view class="text-bold">产生费用：¥ {{ item.amount }}</view>
        </view>
        <view class="order-content px">
          <view class="order-cell">
            <view>订单号</view>
            <view>{{ item.trade_no }}</view>
          </view>
          <view class="order-cell">
            <view>租用设备</view>
            <view>{{ item.lease_machine_code }}</view>
          </view>
          <view class="order-cell">
            <view>租借时间</view>
            <view>{{ getDateFormt(item.lease_time) }}</view>
          </view>
          <view class="order-cell">
            <view>支付方式</view>
            <Tag :value="item.pay_type" :options="payTypeOptions" />
          </view>
        </view>
      </view>
    
    </view>
  </view>
</template>

<script lang="ts" setup>
import Tag from '@/components/Tag/index.vue';
import { getOrderList } from '@/api/order';
import Navbar from '@/components/Navbar/index.vue';
import useDataList from '@/hooks/useDataList';
import { payTypeOptions, orderStatusOptions } from '@/types/api'
import { getDateFormt } from '@/utils'
import Taro from '@tarojs/taro';

const { data } = useDataList(getOrderList)

const goDetail = (id: number) => {
  Taro.navigateTo({
    url: '/pages/order_detail/index?id=' + id
  })
}
</script>

<style lang="scss">
.order-list {
  padding-top: 20px;
  .order-item {
    margin-bottom: 20px;
    line-height: 40px;
    .order-content {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .order-cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
    }
  }
}
</style>
