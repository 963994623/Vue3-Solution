# 此项目用来整理各种解决方案 

> 注：代码中 双星号代表需要添加





### 1 对svg图标进行全局引入并使用

需求: element-plus 的icon图标不够满足需求 想用svg图标来代替

如不需要封装组件 直接使用svg进行渲染 请跳过1.1 1.4

原文资料: https://www.jb51.net/article/258650.htm

本案例涉及 ==main.ts== | ==vite.confit.ts== | ==src/components/SvgIcon/index.vue== | ==src/utlis/validate.ts== |  ==src/views/2.login.vue== | 



#### 1.1 如果需要使用svg在项目中 那么就会分为两类  线上地址和本地图标  那么就需要封装组件 

```
<template>
  <div
    v-if="external"
    :style="styleExternalIcon"
    :class="className"
    class="svg-external-icon svg-icon"
  ></div>
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { isExternal } from "@/utils/validate.js";
const props = withDefaults(
  defineProps<{
    icon: string;
    className?: string;
  }>(),
  {
    className: "",
  }
);

// 判断是否外部图标
const external = computed(() => isExternal(props.icon));

/**
 * 外部图标样式
 * 如果是线上地址svg需要做统一样式管理
 * 如果是谷歌引擎需要做兼容 下方的style样式也一样
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  "-webkit-mask": `url(${props.icon}) no-repeat 50% 50%`,
}));

/**
 * 内部图标 固定格式  #icon-本地svg图标名   例: #icon-password
 */
const iconName = computed(() => `#icon-${props.icon}`);
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  //做谷歌兼容
  -webkit-mask-size: cover !important;
  display: inline-block;
}
</style>

```



#### 1.2 全局导入svg

```
我使用的是vite构建的  需要下载三个包
npm i fast-glob@3.x -D 
npm i vite-plugin-svg-icons@2.x -D
npm install path
```

```
//vite.config.ts

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
**import { resolve } from "path"
**import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  plugins: [
    vue(),
    **createSvgIconsPlugin({
      **// 指定需要缓存的图标文件夹
      **iconDirs: [resolve(process.cwd(), './src/icons/svg/')],
   ** })],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  }
})


```



#### 1.3引入注册脚本

```
//main.ts

import { createApp } from 'vue'
import './style.css'
import "./style/index.scss"
import routers from "./router"
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
**import 'virtual:svg-icons-register' // 引入注册脚本
import svgIcon from "./components/SvgIcon/index.vue"

const app = createApp(App)
app.use(routers as any)
app.use(ElementPlus)
app.component('svg-icon', svgIcon)
app.mount('#app')

```



#### 1.4 使用组件

```
<SvgIcon icon="https://res.lgdsunday.club/user.svg"></SvgIcon>
或  第一个是线上地址  第二个是本地图标  注:password 是你本地svg的名称
<SvgIcon icon="password"></SvgIcon>
```

