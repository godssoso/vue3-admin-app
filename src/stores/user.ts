import { ref } from "vue"
import { defineStore } from "pinia"
import store from "./index";
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import { type LoginRequestData } from "@/api/login/types/login"
import { loginApi } from "@/api/login"


export const useUserStore = defineStore('user',() => {
  const token = ref<string>(getToken() || "")
  const roles = ref<string[]>([])
  const username = ref<string>("")


  // 登录
  const login = async (param:LoginRequestData) => {
    const { data } = await loginApi(param)
    console.log(data,'data');
    
    setToken(data.token)
    token.value = data.token
  }

  return { token, roles, username, login }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}