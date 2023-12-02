<template>
  <view>
    <Navbar title="商品列表" />
    
    <view class="px flex-between flex-wrap" style="padding-top: 15px;">

      <goods v-for="(item, index) in goodslist" :key="index"
        :item="item" @cart-add="cartAdd(index)" />

    </view>

    <view class="cart-icon bg-color-main rounded-full shadow flex-center" @click="cartShow = true">
      <nut-badge :value="cartStore.cartLen" :hidden="cartStore.cartLen === 0">
        <image style="width: 20px; height: 20px;" src="@/assets/cart.png"></image>
      </nut-badge>
    </view>

    <nut-popup v-model:visible="cartShow" position="bottom" round close-on-click-overlay>
      <view class="cart-wrap bg-color-white">

        <view class="cart-goods px">
          <goodsItem v-for="(item, index) in cartStore.cartList" :key="index"
            :item="item" @num-change="(num) => onGoodsNumChange(item.id, num)" @del="onGoodsDel(item.id)" />

          <nut-empty v-if="cartStore.cartList.length === 0" image="empty" description="购物车暂无商品！"></nut-empty>
        </view>

        <view class="cart-bar shadow-t px text-right flex-between">
          <view>商品总数：{{ cartStore.cartLen }}</view>
          <nut-button type="success" style="width: 120px;" @click="submit">确认</nut-button>
        </view>
      </view>
    </nut-popup>

  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import goods from './goods.vue';
import goodsItem from '@/components/GoodsItem/index.vue'
import Navbar from '@/components/Navbar/index.vue'
import { GoodsItem } from '@/types/index'
import { useCartStore } from '@/store/cart';
import Taro from '@tarojs/taro';
import { getChannelList } from '@/api/machine';

const goodslist = ref<GoodsItem[]>([
  {
    id: 1,
    name: '测试商品1',
    img: '',
    stock: 10
  },
  {
    id: 2,
    name: '测试商品2',
    img: '',
    stock: 10
  },
  {
    id: 3,
    name: '测试商品3',
    img: '',
    stock: 10
  },
  {
    id: 4,
    name: '测试商品4',
    img: '',
    stock: 10
  },
  {
    id: 5,
    name: '测试商品5',
    img: '',
    stock: 10
  }
])

const getData = () => {
  getChannelList({}).then(res => {
    // console.log('channel list ===', res)
    goodslist.value = res.data.map(item => ({
      id: item.channel_id,
      name: item.channel_code,
      img: item.channel_code,
      stock: item.channel_stock
    }))
  })
}
getData()

const cartStore = useCartStore()
const cartAdd = (index: number) => {
  const item = goodslist.value[index]
  cartStore.cartAdd(item)
}

const cartShow = ref(false)

const onGoodsNumChange = (id: number, num: number) => {
  cartStore.cartNum(id, num)
}

const onGoodsDel = (id: number) => {
  cartStore.cartDel(id)
}

const submit = () => {
  if (cartStore.cartLen === 0) {
    Taro.showToast({
      title: '购物车暂无商品',
      icon: 'none'
    })
    return
  }
  Taro.navigateTo({
    url: '/pages/order_confirm/index'
  })
}
</script>

<style lang="scss">
.cart-icon {
  position: fixed;
  right: 30px;
  bottom: 360px;
  width: 70px;
  height: 70px;
}

.cart-wrap {

  .cart-goods {
    height: 60vh;
    min-height: 600px;
    overflow: auto;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .cart-bar {
    height: 100px;
    border-top: 1px solid #e5e5e5;
  }
}
</style>
