<template>
  <view>
    <Navbar title="确认订单" />

    <view class="cell-group">
      <Cell label="设备编号" text="123456" :border="true" />
      <Cell label="订单时间" text="121212" />
    </view>

    <view class="cell-group bg-color-white" style="padding-bottom: 10px;">
      <Cell label="商品列表" :border="true" />
      <goodsItem v-for="(item, index) in cartStore.cartList" :key="index"
        :item="item" />
    </view>

    <view class="toolbar-block"></view>
    
    <view class="toolbar safe-b shadow-t text-right bg-color-white">
      <view class="toolbar-wrap px flex-between">
        <view>商品总数：{{ cartStore.cartLen }}</view>
        <nut-button type="success" style="width: 120px;" @click="submit">确认</nut-button>  
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Navbar from '@/components/Navbar/index.vue'
import goodsItem from '@/components/GoodsItem/index.vue'
import Cell from './cell.vue'
import { useCartStore } from '@/store/cart';
import { createFreeOrder } from '@/api/order';
import Taro from '@tarojs/taro';

const cartStore = useCartStore()

const submit = () => {
  const cart = cartStore.cartList.map(item => {
    return {
      channel_id: item.id,
      goods_num: item.num
    }
  })
  createFreeOrder({
    goodsList: cart
  }).then(res => {
    console.log('order ===', res)
    cartStore.cartClear()
    Taro.redirectTo({
      url: '/pages/order_status/index'
    })
  })
}
</script>

<style lang="scss">
.cell-group {
  margin-top: 20px;
}

.toolbar-block {
  height: 130px;
}

.toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  .toolbar-wrap {
    height: 100px;
  }
}
</style>
