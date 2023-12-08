import settings from "@/settings"
import { useCommonStore } from "@/store/common"
import { useUserStore } from "@/store/user"
import Taro from "@tarojs/taro"

type methodType = 'POST' | 'GET'

export enum ResponseState {
  SUCCESS = 200,
  AUTH_EXPIRED = 99,
  AUTH_NONE = 98
}

export interface Response<T> {
  state: ResponseState
  msg: string
  data: T
}

let cookie = ''

const cookieParse = (val: string) => {
  return val.replace(/(path=\/,|expires=.*?GMT; Max-Age=\d+; path=\/)/g, '');
}
 
export default function request<T = any>(api: string, data: any, loading: boolean = true, method: methodType = 'POST'): Promise<Response<T>> {
  if (loading) {
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
  }
  
  const url = settings.baseUrl + api
  const header:any = { 
    'Content-type': 'application/json',
    'token': useUserStore().getToken()
  };

  // if (userStore.openType > 0) data.inType = userStore.openType

  //@ts-ignore
  data.machine_id = useCommonStore().machineId

  return new Promise((resolve, reject) => {
    Taro.request<Response<T>>({
      url,
      data,
      method,
      header,
      success (res) {
        if (loading) Taro.hideLoading()
        if (res.header['Set-Cookie']) cookie = cookieParse(res.header['Set-Cookie'])

        if (res.statusCode !== 200) {
          Taro.showToast({
            title: '网络错误',
            icon: 'none'
          })
          reject(res.data)
          return
        }

        // 登录失效
        if (res.data.state === ResponseState.AUTH_NONE || res.data.state === ResponseState.AUTH_EXPIRED) {
          Taro.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          return          
        }

        if (res.data.state !== ResponseState.SUCCESS) {
          Taro.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          reject(res.data)
          return
        }
        
        resolve(res.data)
      },
      fail (err) {
        if (loading) Taro.hideLoading()
        reject(err)
      }
    })
  })
}
