<template>
  <div>
    <div class="logo-container">
      <el-avatar size="44" shape="square" src="src/assets/icon.png"></el-avatar>
      <h1 class="logo-title" v-if="app.sidebarOpenedGet">DUXIH</h1>
    </div>
    <sidebarMenu :menuList="gener" />
  </div>
</template>

<script setup lang="ts">
import { Location } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { generateMenus, filterRoutes } from "@/utils/route";
import sidebarMenu from "./SidebarMenu.vue";
import pinia from "@/store";
const { app } = pinia();

const router = useRouter();
const filter = filterRoutes(router.getRoutes());
const gener = generateMenus(filter);
console.log(gener);
</script>

<style lang="scss" scoped>
.logo-container {
  height: 44px;
  padding: 10px 0 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
