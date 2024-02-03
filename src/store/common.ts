import Taro from "@tarojs/taro";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCommonStore = defineStore("common", () => {
  const scene = ref(0)
  const machineId = ref(0)
  const machineCode = ref('')
  const appId = ref('')
  const orderId = ref(0)   // 正在租借订单

  const getAppId = () => {
    if (!appId.value) {
      appId.value = Taro.getAccountInfoSync().miniProgram.appId
    }
    return appId.value
  }

  return {
    scene,
    machineId,
    machineCode,
    orderId,

    getAppId
  }
})