export namespace CreateOrder {
  export interface Response {
    pbo_id: number
    name: string
  }
}

export namespace CreateFreeOrder {
  export interface Options {
    goodsList: {
      channel_id: number
      goods_num: number
    }[]
  }

  export interface Response {}
}
