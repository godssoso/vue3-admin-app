import { type RouteRecordRaw,createRouter, createWebHashHistory } from 'vue-router'
import Layouts from "@/layouts/index.vue";


/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/",
    component: Layouts,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "dashboard",
        meta: {
          title: "首页",
          // svgIcon: "dashboard",
          // affix: true
        }
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/register",
    component: () => import("@/views/register/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/403",
    component: () => import("@/views/errorPage/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
]


/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/permission",
    component: Layouts,
    redirect: "/permission/page",
    name: "Permission",
    meta: {
      title: "权限管理",
      // svgIcon: "lock",
      roles: ["admin"], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/PagePermission.vue"),
        name: "PagePermission",
        meta: {
          title: "页面权限",
          roles: ["admin"] // 或者在子导航中设置角色
        }
      },
      {
        path: "directive",
        component: () => import("@/views/permission/DirectivePermission.vue"),
        name: "DirectivePermission",
        meta: {
          title: "指令权限" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        }
      }
    ]
  },
  {
    path:'/about',
    component:Layouts,
    redirect: "/about/index",
    name:'About',
    meta: {
      title: "关于我们",
      svgIcon: "food",
      roles: ["admin"], // 可以在根路由中设置角色
      alwaysShow: false // 将始终显示根菜单
    },
    children:[
      {
        path: "index",
        component: () => import("@/views/about/index.vue"),
        name: "about",
        meta: {
          title: "关于我们",
          svgIcon: "food",
          roles: ["admin"] 
        }
      },
    ]
  },
  {
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
