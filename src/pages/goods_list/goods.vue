<template>
  <view class="goods-wrap bg-color-white rounded">
    <view class="goods-img">
      <ImgWrap :src="item.img" />
      <view v-if="error" class="goods-img-error flex-center">
        <image src="@/assets/break.png" mode="widthFix" />
      </view>
      <view v-else-if="sellOut" class="goods-img-error flex-center">
        <image src="@/assets/sale_out.png" mode="widthFix" />
      </view>
    </view>
    <view class="leading text-base">{{ item.name }}</view>
    <view class="flex-between text-sm">
      <view class="text-color-gray">库存：{{ item.stock }}</view>
      <nut-button type="primary" size="mini" :disabled="error || sellOut" @click="cartAdd">免费领取</nut-button>
    </view>
    
  </view>
</template>

<script lang="ts" setup>
import ImgWrap from '@/components/ImgWrap/index.vue'
import { GoodsItem } from '@/types';

export interface Props {
  item: GoodsItem,
  error: boolean,
  sellOut: boolean
}

withDefaults(defineProps<Props>(), {
  error: false,
  sellOut: false
})
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
    position: relative;
  }
}

.goods-img-error {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba($color: #fff, $alpha: .6);
  image {
    width: 240px;
    height: 120px;
  }
}
</style>
