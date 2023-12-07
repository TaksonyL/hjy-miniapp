import request from '@/utils/request'
import { CreateOrder, CreateFreeOrder, ListenScoreOrder, ListenFreeOrder } from '@/types/api'

/**
 * 创建支付分订单
 * @param data 
 * @returns 
 */
export function createOrder (data: any) {
  return request<CreateOrder.Response>('/miniprogram/order/createLeaseOrder', data)
}

/**
 * 发起支付宝支付分授权
 * @param data 
 * @returns 
 */
export function payScoreOrder (data) {
  return request('/miniprogram/order/payScore', data)
}

/**
 * 监听充电宝租借订单结果
 * @param data 
 * @returns 
 */
export function listenScoreOrder (data: ListenScoreOrder.Options) {
  return request<ListenScoreOrder.Response>('/miniprogram/order/monitorPbo', data, false)
}

/**
 * 获取免费领取额度
 * @param data 
 * @returns 
 */
export function getFreeQuota (data: {}) {
  return request('/miniprogram/order/getFreeChance', data, false)
}

/**
 * 免费领取生成订单并出货
 * @param data 
 * @returns 
 */
export function createFreeOrder (data: CreateFreeOrder.Options) {
  return request<CreateFreeOrder.Response>('/miniprogram/order/useFree', data)
}

/**
 * 监听免费领取订单结果
 * @param data 
 * @returns 
 */
export function listenFreeOrder (data: ListenFreeOrder.Options) {
  return request<ListenFreeOrder.Response>('/miniprogram/order/monitorOrder', data, false)
}
