import request from '@/utils/request'
import { LoginApi } from '@/types/api'

/**
 * 登录
 * @param data 
 * @returns 
 */
export function userLogin (data: LoginApi.Options) {
  //@ts-ignore
  data.machine_id = 1
  return request<LoginApi.Response>('/miniprogram/wx/code2Session', data)
}
