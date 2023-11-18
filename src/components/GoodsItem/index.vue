<template>
  <view class="goods-item-wrap flex">
    <view style="margin-right: 15px">
      <image style="width: 80px;height: 80px;" src="@/assets/product.png"></image>
    </view>
    <view style="padding-top: 5px;">{{ item.name }}</view>
    <view class="goods-item-num flex-center">
      <!-- <nut-input-number v-model="num" :min="0" :max="item.stock" readonly @change="onNumChange" /> -->
      <IconFont name="minus" @click="numMinus"></IconFont>
      <view class="goods-item-num-value bg-color-back text-center text-sm">{{ num }}</view>
      <IconFont :class="{ 'text-color-gray': num >= numMax }" name="plus" @click="numPlus"></IconFont>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { CartItem } from '@/store/cart';
import { ref, watch } from 'vue';
import { debounce } from '@/utils';
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


const num = ref(props.item.num)
const numMax = props.item.stock

const numPlus = () => {
  if (num.value >= numMax) return
  num.value++
}

const numMinus = () => {
  if (num.value <= 1) {
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
  num.value--
}

const onNumChange = debounce(() => {
  emit('numChange', num.value)
})

watch(num, () => {
  onNumChange()
})

watch(() => props.item.num, (newVal) => {
  if (newVal !== num.value) num.value = newVal
})
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
