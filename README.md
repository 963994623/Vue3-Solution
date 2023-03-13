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





### 4.element-plus Menu组件 伸缩方案

element-plus menu组件中可以选择是否伸缩 但会出现一些小问题, 顺便配合pinia做案例



#### 4.1  使用pinia 对menu的伸缩数据做存储



```
//src/store/modules/app.ts

import { defineStore } from "pinia"
export default defineStore("app", {
    state: () => ({
        sidebarOpened: true, //默认为true 展开
    }),
    actions: {
        triggerSidebarOpened() {
            this.sidebarOpened = !this.sidebarOpened //取反


        }
    },
    getters: {
        sidebarOpenedGet: (state) => state.sidebarOpened //计算属性
    }
})
```





#### 4.2 封装伸缩按钮组件

```
//src/components/hamburger/index.vue


<template>
  <div class="hamburger-container" @click="toggleClick">
    <svgIcon :icon="icon" class="hamburger"></svgIcon>
  </div>
</template>

<script lang="ts" setup>
import svgIcon from "../SvgIcon/index.vue";
import { computed } from "vue";
import pinia from "@/store";
const { app } = pinia();

const icon = computed(() => {
  return app.sidebarOpenedGet ? "hideMenu" : "showMenu";
});

const toggleClick = () => {
  app.triggerSidebarOpened();
};
</script>
<style scoped lang="scss">
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>

```





#### 4.3  el-menu 绑定collapse

```
//src/layout/components/sidebar/sidebarMenu.vue

<template>
  <el-menu
    :collapse="!app.sidebarOpenedGet"
  >
  </el-menu>
</template>
<script setup lang="ts">
import pinia from "@/store/index";
const { user, app } = pinia();

</script>
```



#### 4.4 处理问题

> 完成上述步骤 出现的问题

##### menu组件内的item项收缩 但menu组件本身没伸缩

解决 将menu的宽度设置 根据pinia的数据源的true和false 设置另外一个css类 并对宽度进行 !important 

##### menu右侧内容并没有因为menu的伸缩而变宽

每个人的布局不一样   我出现问题的原因是  左侧菜单栏固定 右侧内容区域设置margin-left - 左侧宽度，最后通过动态设置margin-left 解决问题

##### 自己封装的svg组件和menu item项产生冲突 缩小之后图标消失

deep穿透  把element-plus的样式减去一部分









### 5.动态面包削 和 vue3 transition动画

后台管理系统中常见的处理方案



#### 5.1 使用route 获取当前路由链

```
// src/components/Breadcrumb/index.vue

<script lang="ts" setup>
import { watch, ref } from "vue";
import { useRoute, useRouter, RouteRecordNormalized } from "vue-router";
const route = useRoute();
const router = useRouter();

// 面包削数据
const breadcrumData = ref<RouteRecordNormalized[]>([]);

// 过滤不满足条件的面包削
const getBreadcrumData = () => {
  breadcrumData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
};

//面包削点击跳转
const onLinkClick = (item) => {
  router.push(item.path);
};

//侦听route的变化 让面包削数据随之变化 并开启第一次监听
watch(
  route,
  () => {
    getBreadcrumData();
    console.log(breadcrumData.value);
  },
  {
    immediate: true,
  }
);
</script>
```





#### 5.2 使用 vue3 提供的TransitionGroup实现动画效果

> vue3提供了两个动画组件 一个是Transition 另一个就是TransitionGroup ,后者用来对v-for的内容做渲染

```
// src/components/Breadcrumb/index.vue

<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <TransitionGroup name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumData"
        :key="item.path"
      >
        <span v-if="index === breadcrumData.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <span v-else class="redirect" @click="onLinkClick(item)">{{
          item.meta.title
        }}</span>
      </el-breadcrumb-item>
    </TransitionGroup>
  </el-breadcrumb>
</template>
```



#### 5.3 对出入动画进行定义

> 5.2的框架已经搭好  根据transition的文档   transitionGroup 需要指定name 而name的值对应css类型的前缀

```
//src/style/transition.scss 
// .breadcrumb就是前面定义的name 后面的则是动画的出入状态

.breadcrumb-enter-active,
.breadcrumb-move,
.breadcrumb-leave-active{
    transition: all .5s;
    
}
.breadcrumb-enter-from,
.breadcrumb-leave-to{
    opacity: 0;
    transform: translateX(20px);
    
}
.breadcrumb-leave-active{
    position: absolute;
}

```



#### 5.4 全局引入 transition.scss

```
//src/style/index.scss

在之前已经将index.scss 进行全局引入  所以只需要将transition.scss 在index.scss里引入即可

@import "./transition.scss";
```







### 6.国际化处理



#### 6.1 使用vue-i18n 来处理vue项目中的国际化问题

```
//src/i18n/index.ts

//创建数据  在使用数据时 会根据当前的locale来决定使用哪部分的数据 en|zh
const message = {
    en: {
        msg: {
            ...enLocale
        }
    },
    zh: {
        msg: {
            ...zhLocale
        }
    }
}

//动态决定是中文还是英文  使用pinia作为状态管理
function getLanguage() {
    return app && app.languageGetters
}

const locale = getLanguage() || "zh";


//创建i18n 并导出 在main.ts中 使用vue.use进行安装

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale,
    messages: message
})
export default i18n

// main.ts
import i18n from './i18n' //国际化处理
app.use(i18n)

```



#### 6.2 使用国际化文字

```
//在vue文件中 直接使用$t() 渲染文字 
注 不需要已en|zh 为前缀
例 $t("msg.login.title")

//在非vue文件中  需要将自己创建的文件引入   本项目中路径为//src/i18n/index.ts
//然后使用i18n.global.t() 进行渲染文字
```

