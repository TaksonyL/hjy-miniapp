import request from '@/utils/request'
import { CreateOrder, CreateFreeOrder } from '@/types/api'

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
 * 免费领取生成订单并出货
 * @param data 
 * @returns 
 */
export function createFreeOrder (data: CreateFreeOrder.Options) {
  return request<CreateFreeOrder.Response>('/miniprogram/order/useFree', data)
}
