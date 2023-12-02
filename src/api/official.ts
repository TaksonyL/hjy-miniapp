import request from '@/utils/request'
import { GetOfficialArticles } from '@/types/api'

/**
 * 获取公众号已发布文章
 * @param data 
 * @returns 
 */
export function getOfficialArticles (data: GetOfficialArticles.Options) {
  return request<GetOfficialArticles.Response>('/miniprogram/wx/getOaArticle', data)
}

/**
 * 分享文章到朋友圈获取免费领取机会
 * @param data 
 * @returns 
 */
export function addOfficialShare (data: { article_id: string }) {
  return request<number>('/miniprogram/order/addFreeChance', data)
}
