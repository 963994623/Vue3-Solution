<template>
  <div class="app-wrapper">
    <!-- 左侧emun菜单 -->
    <Sidebar
      class="sidebar-container"
      :style="{ backgroundColor: configColor.menuBg }"
    ></Sidebar>
    <div class="main-container">
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

console.log(configColor);
</script>

<style lang="scss" scoped>
@import "@/style/mixin.scss";
@import "@/style/variables.module.scss";

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
}
</style>
