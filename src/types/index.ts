export interface GoodsItem {
  id: number,
  name: string,
  img: string,
  stock: number
}

// 设备信息
export interface MachineInfo {
  machine_id: number
  machine_lat: string
  machine_lng: string
  machine_name: string
  machine_car_limit: number
  machine_channel_limit: number
}

// 货道信息
export interface Channel {
  channel_id: number
  channel_code: string
  channel_stock: number
  channel_status: 1
  channel_goods_name: string
  channel_goods_pic: string
}

// 用户信息
export interface UserInfo {
  user_id: number
  user_subscribe: 0 | 1 | 2,
  user_of_id: number,
  of_subscrible: 0 | 1 | 2,   // 0 - 未关注，1 - 已关注，2 - 取消关注
}

// 公众号文章信息
export interface OfficialArticleItem {
  author: string
  content: string
  content_source_url: string
  digest: string
  is_deleted: boolean
  need_open_comment: number
  only_fans_can_comment: number
  show_cover_pic: number
  thumb_media_id: string
  thumb_url: string
  title: string
  url: string
}
export interface OfficialArticle {
  article_id: string
  content: {
    create_time: number
    news_item: OfficialArticleItem[]
    update_time: number
  }
  update_time: number
}

