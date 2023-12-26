import request from '@/utils/request'
import { GetChannelList, GetMachine, CheckLocation, GetLeaseRule, GetMachineNear } from '@/types/api'

/**
 * 获取设备信息
 * @param data 
 * @returns 
 */
export function getMachine (data: {}) {
  return request<GetMachine.Response>('/miniprogram/machine/getMachine', data)
}

/**
 * 获取附近设备
 * @param data 
 * @returns 
 */
export function getMachineNear (data: GetMachineNear.Options) {
  return request<GetMachineNear.Response[]>('/miniprogram/machine/getNearby', data)
}

/**
 * 获取货道列表
 * @param data 
 * @returns 
 */
export function getChannelList (data: GetChannelList.Options) {
  return request<GetChannelList.Response>('/miniprogram/machine/getChannelList', data)
}

/**
 * 检查坐标与设备距离
 * @param data 
 * @returns 
 */
export function checkLocation (data: CheckLocation.Options) {
  return request<number>('/miniprogram/machine/checkDistance', data)
}

/**
 * 获取租借规则
 * @param data 
 * @returns 
 */
export function getLeaseRule (data: {}) {
  return request<GetLeaseRule.Response>('/miniprogram/machine/getSlr', data)
}
