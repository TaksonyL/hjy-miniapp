import { userLogin } from "@/api/user";
import { UserInfo } from "@/types";
import Taro from "@tarojs/taro";
import { defineStore } from "pinia";
import { ref } from "vue";

// 获取小程序 code
const getLoginCode = async () => {
  const res = await Taro.login()
  return res.code
}

// 获取用户信息
const getUserInfo = async () => {
  const info = Taro.getStorageSync('USERINFO')
  if (info) return info as Taro.UserInfo
  // const res = await Taro.getUserProfile({
  //   desc: "用于完善会员资料"
  // })
  const res = await Taro.getUserInfo()
  Taro.setStorageSync('USERINFO', res.userInfo)
  return res.userInfo
}

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userInfo = ref<UserInfo | null>(null)

  const login = async () => {
    const info = await getUserInfo()
    const code = await getLoginCode()
    const result = await userLogin({ code, userInfo: info })
    token.value = result.data.token
    userInfo.value = result.data.user
    Taro.setStorageSync('TOKEN', result.data.token)
    return result
  }

  const getToken = async () => {
    // token.value = Taro.getStorageSync('TOKEN')
    if (!token.value) {
      const result = await login()
      token.value = result.data.token
    }
    return token.value
  }

  return {
    token,
    userInfo,
    login,
    getToken
  }
})
