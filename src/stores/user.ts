import { ref } from "vue"
import { defineStore } from "pinia"
import store from "./index";
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import { type LoginRequestData } from "@/api/login/types/login"
import { loginApi,getUserInfoApi } from "@/api/login"
import asyncRouteSettings from "@/config/async-route"


export const useUserStore = defineStore('user',() => {
  const token = ref<string>(getToken() || "")
  const roles = ref<string[]>([])
  const username = ref<string>("")

  // 设置角色数组
  const setRoles = (value: string[]) => {
    roles.value = value
  }

  // 登录
  const login = async (param:LoginRequestData) => {
    const { data } = await loginApi(param)
    console.log(data,'data');
    
    setToken(data.token)
    token.value = data.token
  }

  //获取用户信息
  const getInfo = async () => {
    const { data } = await getUserInfoApi()
    username.value = data.username
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = data.roles?.length > 0 ? data.roles : asyncRouteSettings.defaultRoles
  }

  // 重置 Token
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }

  return { token, roles, username, login, getInfo , setRoles, resetToken }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}