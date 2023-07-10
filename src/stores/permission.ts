import { ref } from "vue"
import store from "@/stores"
import { defineStore } from "pinia"
import { type RouteRecordRaw } from "vue-router"
import { constantRoutes, asyncRoutes } from "@/router"
import asyncRouteSettings from "@/config/async-route"

/**判断是否拥有该路由权限 */
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  const routeRoles = route.meta?.roles
  return routeRoles ? roles.some((role) => routeRoles.includes(role)) : true   // 用户的权限数组中是否至少一个存在于路由权限数组中
}

/**过滤权限路由数组，递归子数组，确保父级路由对象包含经过权限控制的子路由数组 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tempRoute = { ...route }
    if (hasPermission(roles, tempRoute)) {
      if (tempRoute.children) {
        tempRoute.children = filterAsyncRoutes(tempRoute.children, roles)
      }
      res.push(tempRoute)
    }
  })
  return res
}

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])  //动态路由数组

  const setRoutes = (roles: string[]) => {   // 接收用户的权限数组
    //动态路由开启时，通过filterAsyncRoutes过滤出该用户有权限访问的路由；未开启时，默认所有异步路由都可访问
    const accessedRoutes = asyncRouteSettings.open ? filterAsyncRoutes(asyncRoutes, roles) : asyncRoutes
    routes.value = constantRoutes.concat(accessedRoutes)  //最终路由 = 常量路由 + 动态路由
    dynamicRoutes.value = accessedRoutes
  }

  return { routes, dynamicRoutes, setRoutes }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
