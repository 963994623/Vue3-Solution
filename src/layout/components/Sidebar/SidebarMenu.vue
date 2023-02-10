<template>
  <el-menu
    :collapse="!app.sidebarOpenedGet"
    :background-color="user.cssVar.menuBg"
    :text-color="user.cssVar.menuText"
    :active-text-color="user.cssVar.menuActiveText"
    router
    :default-active="routerIndexCom"
  >
    <template v-for="item in menuList">
      <sidebarItem :item="item"></sidebarItem>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from "vue";
import sidebarItem from "./SidebarItem.vue";
import pinia from "@/store/index";
import { useRoute } from "vue-router";
const routes = useRoute();
const { user, app } = pinia();

const props = defineProps<{
  menuList: any[];
}>();

const routerIndexCom = computed(() => {
  const { path } = routes;
  return path;
});
</script>
