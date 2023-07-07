import { request } from "@/utils/service"
import type * as Login from "./types/login"



/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "login",
    method: "post",
    data
  })
}