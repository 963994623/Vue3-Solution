<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip content="国际化" :effect="effect">
        <Svg icon="guojihua"></Svg>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="language == 'zh'"
          >中文</el-dropdown-item
        >
        <el-dropdown-item command="en" :disabled="language == 'en'"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import useStore from "@/store";
import { ElMessage } from "element-plus";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import Svg from "@/components/SvgIcon/index.vue";

withDefaults(
  defineProps<{
    effect: "dark" | "light";
  }>(),
  {
    effect: "dark",
  }
);

// 把pinia的app模块导出
const { app } = useStore();

// 切换语言的方法
const i18n = useI18n();

// 获取Pinia里的 语言状态 zh|en
const language = computed(() => {
  return app.languageGetters;
});

// 处理切换语言的事件
const handleSetLanguage = (lang: "zh" | "en") => {
  i18n.locale.value = lang;
  app.setLanguage(lang);
  ElMessage({
    type: "success",
    message: "修改成功",
  });
};
</script>
