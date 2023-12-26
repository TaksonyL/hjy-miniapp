import request from '@/utils/request'
import { LoginApi } from '@/types/api'

/**
 * 登录
 * @param data 
 * @returns 
 */
export function userLogin (data: LoginApi.Options) {
  return request<LoginApi.Response>('/miniprogram/wx/code2Session', data)
}
