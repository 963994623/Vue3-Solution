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
