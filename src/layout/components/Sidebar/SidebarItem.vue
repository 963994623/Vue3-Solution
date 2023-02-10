<template>
  <el-sub-menu
    :index="item.path"
    v-if="item.children && item.children.length > 0"
  >
    <template #title>
      <svgIcon icon="password"></svgIcon>
      <span>{{ item.meta.title }}</span>
    </template>
    <template v-if="item.children && item.children.length !== 0">
      <template v-for="childrenItem in item.children">
        <sidebaritem :item="childrenItem"></sidebaritem>
      </template>
    </template>
  </el-sub-menu>

  <el-menu-item :route="item.path" v-else :index="item.path">
    <template #title>
      <svgIcon :icon="item.meta.icon" />
      {{ item.meta.title }}
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import sidebaritem from "./SidebarItem.vue";
import svgIcon from "@/components/SvgIcon/index.vue";
import { ref } from "vue";
const props = defineProps<{
  item: any;
}>();
</script>
