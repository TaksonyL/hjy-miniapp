import { GoodsItem } from "@/types";
import Taro from "@tarojs/taro";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface CartItem extends GoodsItem {
  num: number;
}

export const useCartStore = defineStore("cart", () => {
  const cart = ref(new Map<number, CartItem>())

  const cartLimit = ref(0)    // 购物车限制
  const channelLimit = ref(0) // 货道限制

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

  // 检查购物车限制
  const checkCartLimit = ():boolean => {
    if (cartLimit.value > 0 && cartLen.value >= cartLimit.value) {
      Taro.showToast({
        title: '购物车已满',
        icon: 'none'
      })
      return false
    }
    return true
  }

  // 购物车加入
  const cartAdd = (item: GoodsItem) => {
    if (!checkCartLimit()) return
    if (cart.value.has(item.id)) {
      const goods = cart.value.get(item.id)!
      if (goods.num >= goods.stock || (goods.num >= channelLimit.value && channelLimit.value > 0)) {
        Taro.showToast({
          title: '超出商品数量上限',
          icon: 'none'
        })
        return
      }
      cart.value.set(item.id, { ...item, num: goods.num + 1 })
    } else {
      cart.value.set(item.id, { ...item, num: 1 })
    }
  }

  // 购物车数量变化
  const cartNum = (id: number , num: number) => {
    
    if (cart.value.has(id)) {
      const goods = cart.value.get(id)!
      if (goods.num < num) {
        // 增加时检查限制
        if (!checkCartLimit()) return
        if (channelLimit.value > 0 && num > channelLimit.value) {
          Taro.showToast({
            title: '超出商品数量上限',
            icon: 'none'
          })
          return
        }
      }
      cart.value.set(id, { ...goods, num })
    } else {
      Taro.showToast({
        title: '该商品不存在',
        icon: 'none'
      })
    }
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
  }

  // 清空购物车
  const cartClear = () => {
    cart.value.clear()
  }

  return {
    cartLimit,
    channelLimit,
    cartList,
    cartLen,
    cartAdd,
    cartNum,
    cartDel,
    cartClear
  }
})
