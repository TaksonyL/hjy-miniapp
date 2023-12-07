<template>
  <view>
    <Navbar title="商品列表" />

    <nut-noticebar v-if="goodslist.length > 0 && cartStore.channelLimit > 0"
     :text="`每个商品限购${cartStore.channelLimit}个`" />
    
    <nut-empty v-if="goodslist.length === 0" description="暂无商品信息"></nut-empty>

    <view class="px flex-between flex-wrap" style="padding-top: 15px;">

      <goods v-for="(item, index) in goodslist" :key="index"
        :item="item" @cart-add="cartAdd(index)" />

    </view>

    <nut-popup v-model:visible="cartShow" position="bottom" round close-on-click-overlay>
      <view class="cart-wrap bg-color-back safe-b">

        <view class="cart-goods px">
          <goodsItem v-for="(item, index) in cartStore.cartList" :key="index"
            class="bg-color-white rounded"
            :item="item" @num-change="(num) => onGoodsNumChange(item.id, num)" @del="onGoodsDel(item.id)" />

          <nut-empty v-if="cartStore.cartList.length === 0" image="empty" description="购物车暂无商品！"></nut-empty>
        </view>

        <view class="cart-toolbar-block"></view>
      </view>
    </nut-popup>

    <view class="cart-toolbar-block"></view>
    <view class="cart-toolbar safe-b bg-color-white shadow-t">
      <view class="px flex-between" style="height: 100%;">
        <view class="flex-row" @click="cartShow = !cartShow">
          <view class="cart-toolbar-icon bg-color-main rounded-full flex-center">
            <nut-badge :value="cartStore.cartLen" :hidden="cartStore.cartLen === 0">
              <IconFont name="cart" color="#fafafa" size="14" />
            </nut-badge>
          </view>
          <view>免费领取：{{ cartStore.cartLen }}{{ cartStore.cartLimit>0?`/${cartStore.cartLimit}`:'' }}</view>
        </view>
        <nut-button type="primary" style="width: 120px;" @click="submit">确认</nut-button>  
      </view>
    </view>

  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import goods from './goods.vue';
import goodsItem from '@/components/GoodsItem/index.vue'
import Navbar from '@/components/Navbar/index.vue'
import { IconFont } from '@nutui/icons-vue-taro';
import { GoodsItem } from '@/types/index'
import { useCartStore } from '@/store/cart';
import Taro from '@tarojs/taro';
import { getChannelList } from '@/api/machine';

const goodslist = ref<GoodsItem[]>([])

const getData = () => {
  getChannelList({}).then(res => {
    // console.log('channel list ===', res)
    goodslist.value = res.data.map(item => ({
      id: item.channel_id,
      name: item.channel_goods_name,
      img: item.channel_goods_pic,
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
.cart-wrap {

  .cart-goods {
    height: 60vh;
    min-height: 600px;
    overflow: auto;
    padding-top: 30px;
    padding-bottom: 30px;
  }
}

$cart-toolbar-height: 100px;
.cart-toolbar-block {
  height: $cart-toolbar-height;
}
.cart-toolbar {
  height: $cart-toolbar-height;
  border-top: 1px solid #e5e5e5;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2050;
  width: 100%;
  box-sizing: content-box;
  .cart-toolbar-icon {
    width: 60px;
    height: 60px;
    margin-right: 20px;
  }
}
</style>
