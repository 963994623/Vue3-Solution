# 此项目用来整理各种解决方案 

> 注：代码中 双星号代表需要添加





### 1 对svg图标进行全局引入并在组件中使用

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





### 2.对请求进行统一管理

需求: 在开发和生产环境上 所需要使用的接口可能不同 需要分辨开发和生产环境

本案例涉及 ==src/config/index.ts== | ==vite.confit.ts== | ==src/utlis/requests.ts== |  ==src/api/sys.ts== | 





#### 2.1 使用import.meta.env.MODE(vite) 来获取当前环境 并根据当前环境 抛出对应的baseApi和mockApi

> baseApi是以当前用户的网址+/api作为路径使用  例 localhost:8080/api

```
//src/config/index.ts

import { EnvConfigI, EnvConfigKey } from "./indexTs"
const env: string = import.meta.env.MODE || "prod"

const EnvConfig: EnvConfigI = {
    development: {
        baseApi: "/api",
        mockApi: ""
    },
    production: {
        baseApi: "/api",
        mockApi: ""
    }
}

const EnvConfigItem: Partial<{ [P in keyof EnvConfigI]: EnvConfigI[P] }> = EnvConfig[env]
export default {
    ...EnvConfigItem as { [P in EnvConfigKey]: string }
}




```



#### 2.2 创建axios 并设置baseURL

> 配置完baseURL之后 每次访问都不需要在路径上写/api

```
// src/utils/requests.ts

import axios from "axios"
import config from "../config"
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 5000
})
export default service

```



#### 2.3 接口统一管理

```
//src/api/sys.ts

import request from "../utils/requests"

export const login = (data: any) => {
    return request({
        url: '/sys/login',
        method: "POST",
        data
    })
}
```



#### 2.4 配置代理

现在/api和/api后的路径都配置完毕了   /api/sys/login   现在的路径是这样的，但是前面的网址和域名不清楚，如果是在服务器上 不需要配置  直接使用就访问到服务器地址+/api/sys/login ,但如果是一个线上接口地址,访问本地地址肯定不对 ， 需要做代理去访问线上接口地址

```
vite.config.ts

export default defineConfig({
	....
  server: {
    port: 5173, //前端项目启动接口
    proxy: {
      "/api": {
        target: "https://www.mislv.cn/", //线上接口地址
        changeOrigin: true, //跨域？
      }
    },
    https: false,
    open: true,
  },
  	....
  
  })

```



#### 2.5 之后就可以正常访问线上接口地址 并且对接口进行统一管理







### 3.scss和js之间的共享变量

需求: 想要在js内容中去更改或者使用scss的变量

资料来源:https://blog.csdn.net/youyacoder/article/details/127364009

本案例涉及 :  ==src/style/variables.module.scss==  | ==src/style/mixin.scss== |  ==src/layout/index.vue== | 



#### 3.1 声明scss外部文件 

> 文件名需要满足 *.module.scss   如果写成  不带.module  则不会被js识别

```
// src/style/variables.module.scss

//编写完 scss变量时候 通过 :export导出



$menuText:#bfcbd9;
$menuActiveText:#fff;
$subMenuActiveText:#f4f4f5;

$menuBg:#304156;
$menuHover:#263445;

$subMenuBg:#1f2d3d;
$subMenuHover:#001528;

$sideBarWidth:210px;

:export{
    menuText:$menuText;
    menuActiveText:$menuActiveText;
    subMenuActiveText:$subMenuActiveText;
    menuBg:$menuBg;
    menuHover:$menuHover;
    subMenuBg:$subMenuBg;
    subMenuHover:$subMenuHover;
    sideBarWidth:$sideBarWidth

}
```



#### 3.2在vue文件的js部分导入

```
//src/layout/index.vue


<script lang="ts" setup>
import configColor from "@/style/variables.module.scss";
console.log(configColor); //此时他是个对象 和js中的对象是一样的 可以 configColor.*** 来使用变量
</script>
```





#### 3.扩展

> 关于scss 的mixin 部分

下面定义了一个外部scss文件 使用了scss的mixin  将一些固定的样式打包 并可以被scss导入 使用

```
// src/style/mixin.scss
//定义mixin

@mixin clearfix{
    &:after{
        content: " ";
        display: table;
        clear: both;
    }
}
@mixin scrollBar{
    &::-webkit-scrollbar-track-piece{
        background-color: #d3dce6;
    }
    &::-webkit-scrollbar{
        width: 6px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #99a9bf;
        border-radius: 20px;
    }
}
@mixin relative{
    position: relative;
    width: 100%;
    height: 100%;
}
```

```
//src/layout/index.vue

//定义时使用@mixin  使用时用@include

<style lang="scss" scoped>
@import "@/style/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
```

