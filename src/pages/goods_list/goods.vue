<template>
  <view class="goods-wrap bg-color-white rounded">
    <view class="goods-img">
      <ImgWrap :src="item.img" />
    </view>
    <view class="leading text-base">{{ item.name }}</view>
    <view class="flex-between text-sm">
      <view class="text-color-gray">库存：{{ item.stock }}</view>
      <nut-button type="primary" size="mini" @click="cartAdd">免费领取</nut-button>
    </view>
    
  </view>
</template>

<script lang="ts" setup>
import ImgWrap from '@/components/ImgWrap/index.vue'
import { GoodsItem } from '@/types';

export interface Props {
  item: GoodsItem
}

withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  cartAdd: []
}>()

const cartAdd = () => {
  emit("cartAdd")
}
</script>

<style lang="scss">
.goods-wrap {
  display: inline-block;
  padding: 20px;
  width: 330px;
  box-sizing: border-box;
  margin-bottom: 30px;

  .goods-img {
    width: 100%;
    height: 300px;
  }
}
</style>
