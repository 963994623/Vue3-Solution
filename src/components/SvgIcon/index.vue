<template>
  <div
    v-if="external"
    :style="styleExternalIcon"
    :class="className"
    class="svg-external-icon svg-icon"
  ></div>
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { isExternal } from "@/utils/validate.js";
const props = withDefaults(
  defineProps<{
    icon: string;
    className?: string;
  }>(),
  {
    className: "",
  }
);

// 判断是否外部图标
const external = computed(() => isExternal(props.icon));

/**
 * 外部图标样式
 * 如果是线上地址svg需要做统一样式管理
 * 如果是谷歌引擎需要做兼容 下方的style样式也一样
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  "-webkit-mask": `url(${props.icon}) no-repeat 50% 50%`,
}));

/**
 * 内部图标 固定格式  #icon-本地svg图标名   例: #icon-password
 */
const iconName = computed(() => `#icon-${props.icon}`);
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  //做谷歌兼容
  -webkit-mask-size: cover !important;
  display: inline-block;
}
</style>
