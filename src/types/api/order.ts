export namespace CreateOrder {
  export interface Response {
    pbo_id: number
    name: string
  }
}

export namespace ListenScoreOrder {
  export interface Options {
    pbo_id: number
  }

  export interface Response {
    status: 1 | 2 | 3
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
