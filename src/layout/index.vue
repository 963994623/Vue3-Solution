<template>
  <div
    class="app-wrapper"
    :class="[app.sidebarOpenedGet ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧emun菜单 -->
    <Sidebar
      class="sidebar-container"
      :style="{ backgroundColor: user.cssVar.menuBg }"
    ></Sidebar>
    <div
      :class="[
        'main-container',
        app.sidebarOpenedGet ? 'marginLeft' : 'marginLeft-',
      ]"
    >
      <div class="fixed-header">
        <!-- 顶部navbar -->
        <Navbar></Navbar>
      </div>
      <!-- 内容区域 -->
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script lang="ts" setup>
import configColor from "@/style/variables.module.scss";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar/index.vue";
import AppMain from "./components/AppMain.vue";
import pinia from "@/store";
const { app, user } = pinia();
</script>

<style lang="scss" scoped>
@import "@/style/mixin.scss";
@import "@/style/variables.module.scss";

.marginLeft- {
  margin-left: $hideSideBarWidth !important;
}
:deep(.el-sub-menu__title) {
  padding-right: 0 !important;
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
