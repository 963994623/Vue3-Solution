<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <TransitionGroup name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumData"
        :key="item.path"
      >
        <span v-if="index === breadcrumData.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <span v-else class="redirect" @click="onLinkClick(item)">{{
          item.meta.title
        }}</span>
      </el-breadcrumb-item>
    </TransitionGroup>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { watch, ref } from "vue";
import { useRoute, useRouter, RouteRecordNormalized } from "vue-router";
import pinia from "@/store/index";

const route = useRoute();
const router = useRouter();
const { user } = pinia();

// 面包削数据
const breadcrumData = ref<RouteRecordNormalized[]>([]);
// 过滤不满足条件的面包削
const getBreadcrumData = () => {
  breadcrumData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
};

//面包削点击跳转
const onLinkClick = (item) => {
  router.push(item.path);
};

//侦听route的变化 让面包削数据随之变化 并开启第一次监听
watch(
  route,
  () => {
    getBreadcrumData();
    console.log(breadcrumData.value);
  },
  {
    immediate: true,
  }
);

// 设置 字体hover颜色 从pinia里提取
const linkHoverColor = ref(user.cssVar.menuBg);
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  position: relative;
  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
  }
  .redirect:hover {
    color: v-bind(linkHoverColor);
  }
  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
