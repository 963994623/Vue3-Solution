import { createApp } from 'vue'
import './style.css'
import "./style/index.scss"
import routers from "./router"
import App from './App.vue'

import ElementPlus from 'element-plus'


import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register' // 引入注册脚本
import svgIcon from "./components/SvgIcon/index.vue"

import pinia from "@/store/store"
import store from "@/store"
import i18n from './i18n' //国际化处理
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'






const app = createApp(App)
app.use(i18n)
app.use(pinia)

const { app: appStore } = store()
app.use(ElementPlus, {
    locale: appStore.languageGetters === "en" ? en : zhCn
})

app.use(routers as any)



app.component('svg-icon', svgIcon)
app.mount('#app')
