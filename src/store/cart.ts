import { GoodsItem } from "@/types";
import Taro from "@tarojs/taro";
import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";

export interface CartItem extends GoodsItem {
  num: number;
}

export const useCartStore = defineStore("cart", () => {
  const cart = ref(new Map<number, CartItem>())

  const cartList = computed(() => {
    return [...cart.value.values()]
  })

  const cartLen = computed(() => {
    let num = 0
    for (const item of cartList.value) {
      num += item.num
    }
    return num
  })

  // 购物车加入
  const cartAdd = (item: GoodsItem) => {
    if (cart.value.has(item.id)) {
      cart.value.set(item.id, { ...item, num: cart.value.get(item.id)!.num + 1 })
    } else {
      cart.value.set(item.id, { ...item, num: 1 })
    }

    Taro.setStorageSync('CART', JSON.stringify([...cart.value.values()]))
  }

  // 购物车数量变化
  const cartNum = (id: number , num: number) => {
    if (cart.value.has(id)) {
      cart.value.set(id, { ...cart.value.get(id)!, num })
    } else {
      Taro.showToast({
        title: '该商品不存在',
        icon: 'none'
      })
    }

    Taro.setStorageSync('CART', JSON.stringify([...cart.value.values()]))
  }

  // 购物车删除
  const cartDel = (id: number) => {
    if (cart.value.has(id)) {
      cart.value.delete(id)
    } else {
      Taro.showToast({
        title: '该商品不存在',
        icon: 'none'
      })
    }

    Taro.setStorageSync('CART', JSON.stringify([...cart.value.values()]))
  }

  // 清空购物车
  const cartClear = () => {
    cart.value.clear()
  }

  onMounted(() => {
    const arr = Taro.getStorageSync('CART')
    if (arr) {
      for (const item of JSON.parse(arr)) {
        cart.value.set(item.id, item)
      }
    }
  })

  return {
    cartList,
    cartLen,
    cartAdd,
    cartNum,
    cartDel,
    cartClear
  }
})
