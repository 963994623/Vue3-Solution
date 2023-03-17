<template>
  <div @click="onToggle">
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import screenFull from "screenfull";

const isFullscreen = ref(false);

const onToggle = () => {
  screenFull.toggle();
};

const change = () => {
  isFullscreen.value = screenFull.isFullscreen;
};

onMounted(() => {
  screenFull.on("change", change);
});
onUnmounted(() => {
  screenFull.off("change", change);
});
</script>
