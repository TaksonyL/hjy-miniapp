import { Channel, MachineInfo } from "@/types";

export namespace GetMachine {
  export interface Response extends MachineInfo  {

  }
}

export namespace GetMachineNear {
  export interface Options {
    lat: string,
    lng: string,
    pageNum: number
  }

  export interface Response extends MachineInfo {}
}

export namespace GetChannelList {
  export interface Options {}

  export type Response = Channel[] 
}

export namespace CheckLocation {
  export interface Options {
    lat: number
    lng: number
  }
}

export namespace GetLeaseRule {
  export interface Response {
    slr_id: number
    charge_limit: string
    charge_limit_continuous: string
    cycle: number
    desc: string
    free_duration: number
    free_times: number
    name: string
    overdue_amount: string
    overdue_cycle: number
  }
}
