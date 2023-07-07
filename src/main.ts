import { createApp } from 'vue'
import store from "@/stores"

import App from './App.vue'
import router from './router'
import "@/router/permission"


import 'element-plus/dist/index.css'
import "element-plus/theme-chalk/dark/css-vars.css"
import "@/styles/index.scss"

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
