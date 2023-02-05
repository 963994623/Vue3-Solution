import { createApp } from 'vue'
import './style.css'
import "./style/index.scss"
import routers from "./router"
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register' // 引入注册脚本
import svgIcon from "./components/SvgIcon/index.vue"

const app = createApp(App)
app.use(routers as any)
app.use(ElementPlus)
app.component('svg-icon', svgIcon)
app.mount('#app')
