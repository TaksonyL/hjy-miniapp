<template>
  <view class="order-detail-container">
    <Navbar title="订单详情" />

    <view class="px py">
      <view class="bg-color-white rounded px">
        <view class="py-sm flex-between border-b">
          <Tag :value="data.status" :options="orderStatusOptions" plain />
          <view class="text-bold">产生费用：¥ {{ data.amount }}</view>
        </view>
        <view>
          <view class="py-sm text-bold">使用详情</view>

          <view class="detail-cell">
            <view>订单编号</view>
            <view>{{ data.trade_no }}</view>
          </view>
          <view class="detail-cell">
            <view>下单时间</view>
            <view>{{ getDateFormt(data.order_time) }}</view>
          </view>
          <view class="detail-cell">
            <view>租借设备</view>
            <view>{{ data.lease_machine_code }}</view>
          </view>
          <view class="detail-cell">
            <view>借用时间</view>
            <view>{{ getDateFormt(data.lease_time) }}</view>
          </view>
          <view class="detail-cell">
            <view>充电宝ID</view>
            <view>{{ data.pb_number }}</view>
          </view>
          <view class="detail-cell">
            <view>支付方式</view>
            <Tag :value="data.pay_type" :options="payTypeOptions" />
          </view>
          <view class="detail-cell">
            <view>使用计费</view>
            <view class="text-right text-justify">{{ rules }}</view>
          </view>

          <view class="border-b" style="height: 20px;"></view>
          <view class="text-bold py-sm">费用明细</view>
          <view class="detail-cell">
            <view>使用费用</view>
            <view class="text-right">¥ {{ data.amount }}</view>
          </view>
          <view class="text-right">合计：<text class="text-bold">¥ {{ data.amount }}</text></view>
          <view style="height: 20px;"></view>
        </view>
      </view>

      <view class="text-center text-color-danger text-lg" style="margin-top: 20px;" @tap="call">
        <view>客服电话</view>
        <view>{{ data.service_phone }}</view>
      </view>

    </view>
  </view>
</template>

<script setup lang="ts">
import Tag from '@/components/Tag/index.vue'
import { getOrderDetail } from '@/api/order';
import Navbar from '@/components/Navbar/index.vue'
import useRequest from '@/hooks/useRequest';
import { useLoad } from '@tarojs/taro';
import { getDateFormt } from '@/utils'
import { orderStatusOptions, payTypeOptions } from '@/types/api';
import { computed } from 'vue';
import Taro from '@tarojs/taro';

const { data, getData } = useRequest(getOrderDetail)
let id = 0

const rules = computed(() => {
  try {
    const ctx = JSON.parse(data.value.rule_content)
    // return `每${ctx.cycle}天周期内，可获得${ctx.free_duration}小时免费时间${ctx.free_times > 1 ? `（${ctx.free_times}次）`:"" }，${Number(ctx.overdue_amount)}元/${ctx.overdue_cycle}小时，每${ctx.cycle *24}小时封顶${Number(ctx.charge_limit)}元，总封顶${Number(ctx.charge_limit_continuous)}元。`
    return `${Number(ctx.overdue_amount)}元/${ctx.overdue_cycle}小时，每${ctx.cycle *24}小时封顶${Number(ctx.charge_limit)}元，总封顶${Number(ctx.charge_limit_continuous)}元`
  } catch {
    return '--'
  }
})

const call = () => {
  Taro.makePhoneCall({
    phoneNumber: '15207634974'
  })
}

useLoad((options) => {
  if (options.id) {
    id = Number(options.id)
    getData({ pbo_id: id })
  }
})
</script>

<style lang="scss">
.order-detail-container {
  line-height: 40px;

  .detail-cell {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    min-height: 70px;
    color: #777;
    
    view:nth-child(1) {
      width: 120px;
    }
    view:nth-child(2) {
      max-width: 440px;
    }
  }
}
</style>
