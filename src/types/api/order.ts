// 支付类型
export enum PayTypeEnums {
  PAY_SCORE = 1
}

export const payTypeOptions = [
  { label: '微信支付分', value: PayTypeEnums.PAY_SCORE, type: 'success' }
]

// 支付状态
export enum PayStatusEnums {
  PENDING = 1,
  FINISH = 2
}

export const payStatusOptions = [
  { label: '待支付', value: PayStatusEnums.PENDING, type: 'warning' },
  { label: '已支付', value: PayStatusEnums.FINISH, type: 'success' }
]

// 退款状态
export enum RefundStatusEnums {
  NEVER = 1,
  FINISH = 2
}

export const refundStatusOptions = [
  { label: '未退款', value: RefundStatusEnums.NEVER, type: 'info' },
  { label: '已退款', value: RefundStatusEnums.FINISH, type: 'danger' }
]

// 订单状态
export enum OrderStatusEnums {
  UNSTART = 1,
  PENDING = 2,
  FINISH = 3,
  INVALID = 9,
}

export const orderStatusOptions = [
  { label: '未开始', value: OrderStatusEnums.UNSTART, type: 'info' },
  { label: '租借中', value: OrderStatusEnums.PENDING, type: 'warning' },
  { label: '已归还', value: OrderStatusEnums.FINISH, type: 'success' },
  { label: '无效订单', value: OrderStatusEnums.INVALID, type: 'info' }
]

export interface Order {
  pbo_id: number
  trade_no: string
  mch_no: string
  amount: number
  pay_type: PayTypeEnums
  pay_status: PayStatusEnums
  pay_time: number
  refund_status: RefundStatusEnums
  status: OrderStatusEnums
  lease_machine_code: string
  lease_time: number
  return_time: number
  pb_number: string
  rule_content: string
  order_time: number
  service_phone: string
}

// 支付分订单
export interface OrderScore {
  appid: string
  mchid: string
  service_id: string
  out_order_no: string
  package: string
  extraData: {
    mch_id: string
    nonce_str: string
    out_order_no: string
    service_id: string
    sign: string
    sign_type: string
    timestamp: number
  }
}

export namespace CreateOrder {
  export interface Response {
    pbo_id: number
    name: string
  }
}

export namespace PayScoreOrder {
  export interface Response {
    payScore: OrderScore
    pbo: Order
  }
}

export namespace ListenScoreOrder {
  export interface Options {
    pbo_id: number
  }

  export interface Response {
    pbo: {
      pbo_id: number
      trade_no: string
      lease_machine_code: string
      pb_number: string
      status: 1 | 2 | 3
      state_description: string
    }
  }
}

export namespace CreateFreeOrder {
  export interface Options {
    goodsList: {
      channel_id: number
      goods_num: number
    }[]
  }

  export interface Response {
    order_id: number
  }
}

export namespace ListenFreeOrder {
  export interface Options {
    order_id: number
  }

  export interface Response {
    order_out_status: 0 | 1 | 2 | 3 | 4 | 5 | 6 
  }
}

export namespace GetOrderList {
  export interface Options {
    trade_no?: string,
    lease_time?: string
  }

  export interface Response extends Order {}
}

export namespace GetOrderDetail {
  export interface Options {
    pbo_id: number
  }

  export interface Response extends Order {}
}
