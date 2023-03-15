<script setup lang="ts">
import pinia from "@/store";
import { generateNewStyle, writeNewStyle } from "@/utils/theme";
const { theme } = pinia();
generateNewStyle(theme.mainColorGet).then((newStyle) => {
  writeNewStyle(newStyle);
});
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
