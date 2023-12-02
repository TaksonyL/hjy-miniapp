import { UserInfo } from "@/types"

export namespace LoginApi {
  export interface Options {
    userInfo: Taro.UserInfo,
    code: string
  }

  export interface Response {
    user: UserInfo,
    token: string
  } 
}
