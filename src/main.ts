import { createApp } from 'vue'
import store from "@/stores"

import App from './App.vue'
import router from './router'
import "@/router/permission"

import { loadSvg } from "@/icons"


import 'element-plus/dist/index.css'
import "element-plus/theme-chalk/dark/css-vars.css"
import "@/styles/index.scss"

const app = createApp(App)

/** 加载全局 SVG */
loadSvg(app)

app.use(store)
app.use(router)

router.isReady().then(() => {
  app.mount("#app")
})
