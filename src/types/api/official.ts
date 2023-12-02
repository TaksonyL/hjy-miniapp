import { OfficialArticle } from "@/types"

export namespace GetOfficialArticles {
  export interface Options {
    pageNum: number
    start: number
    no_content?: 1 | 0
  }

  export interface Response {
    item: OfficialArticle[]
    item_count: number
    total_count: number
  }
}
