<template>
  <el-dialog title="提示" :model-value="modelValue" @close="closed" width="22%">
    <div class="content">
      <p class="title">主题色更换</p>
      <el-color-picker
        v-model="mColor"
        :predefine="predefineColor"
      ></el-color-picker>
    </div>
    <template #footer>
      <el-button @click="closed">关闭</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import pinia from "@/store";
import { generateNewStyle, writeNewStyle } from "@/utils/theme";
import { log } from "console";

const { theme } = pinia();

withDefaults(
  defineProps<{
    modelValue: boolean;
  }>(),
  {
    modelValue: true,
  }
);

const emits = defineEmits(["update:modelValue"]);

const closed = () => {
  emits("update:modelValue", false);
};
const confirm = async () => {
  const data = await generateNewStyle(mColor.value);
  writeNewStyle(data);

  theme.setMainColor(mColor.value);
  closed();
};

// 取色器初始可选值
const predefineColor = [
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255,69,0,0.68)",
  "rgba(255,120,0)",
  "hsv(51,100,98)",
  "hsva(128,40,94,0.5)",
  "hsl(181,100%,37%)",
  "hsla(209,100%,56%,0.73)",
  "#c7158577",
];
// 取色器默认色值
const mColor = ref(theme.mainColorGet);
console.log(mColor);
</script>
<style scoped lang="scss">
.content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
