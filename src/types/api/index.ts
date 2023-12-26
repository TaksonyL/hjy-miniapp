export * from './user'
export * from './order'
export * from './machine'
export * from './official'

export interface RequestPageData {
  page?: number,
  pageNum?: number
}

export interface ResponsePageData<T> {
  current_page: number,
  last_page: number,
  per_page: number,
  total: number,
  data: T[]
}
