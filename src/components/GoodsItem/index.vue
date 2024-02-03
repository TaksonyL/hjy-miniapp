<template>
  <view class="goods-item-wrap flex">
    <view style="margin-right: 15px;width: 80px;height: 80px;">
      <ImgWrap :src="item.img" />
    </view>
    <view style="padding-top: 5px;">{{ item.name }}</view>
    <view class="goods-item-num flex-center">
      <!-- <nut-input-number v-model="num" :min="0" :max="item.stock" readonly @change="onNumChange" /> -->
      <IconFont name="minus" @click="numMinus"></IconFont>
      <view class="goods-item-num-value bg-color-back text-center text-sm">{{ item.num }}</view>
      <IconFont :class="{ 'text-color-gray': item.num >= numMax }" name="plus" @click="numPlus"></IconFont>
    </view>
  </view>
</template>

<script lang="ts" setup>
import ImgWrap from '@/components/ImgWrap/index.vue'
import { CartItem } from '@/store/cart';
import { throttle } from '@/utils';
import { IconFont } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro';

export interface Props {
  item: CartItem
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  numChange: [ value: number ]
  del: []
}>()


const numMax = props.item.stock

const numPlus = () => {
  if (props.item.num >= numMax) return
  numChange(props.item.num + 1)
}

const numMinus = () => {
  if (props.item.num <= 1) {
    Taro.showModal({
      title: '提示',
      content: '是否移除商品？',
      success(res) {
        if (res.confirm) {
          emit('del')
        }
      }
    })
    return
  }
  numChange(props.item.num - 1)
}

const numChange = throttle((number: number) => {
  emit('numChange', number)
}, 300)
</script>

<style lang="scss">
.goods-item-wrap {
  padding: 20px;
  position: relative;
  
  .goods-item-num {
    position: absolute;
    bottom: 30px;
    right: 20px;

    .goods-item-num-value {
      width: 80px;
      margin: 0 10px;
      border-radius: 10px;
      line-height: 40px;
    }
  }
}
</style>
