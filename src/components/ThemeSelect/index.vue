<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <!-- 图标 -->
    <div>
      <el-tooltip content="主题色">
        <svg-icon icon="change-theme"></svg-icon>
      </el-tooltip>
    </div>
    <!-- menu -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">主题色更改</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <div>
    <SelectColor v-model="SelectColorVisible"> </SelectColor>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SelectColor from "./components/SelectColor.vue";

// 主题色更改按钮
const handleSetTheme = (com: "color") => {
  SelectColorVisible.value = true;
};

// dialog show|hide
const SelectColorVisible = ref(false);
</script>
