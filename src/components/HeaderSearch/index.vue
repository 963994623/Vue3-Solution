<template>
  <div class="header-search" :class="{ show: isShow }">
    <svg-icon
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    ></svg-icon>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { filterRoutes, generateMenus } from "@/utils/route";
import { useRouter } from "vue-router";
import { generateRoutes } from "./FuseData";
import Fuse from "fuse.js";
import { watchSwitchLang } from "@/utils/i18n";

// 数据源
const router = useRouter();
let searchPool = computed(() => {
  const filterRouters = filterRoutes(router.getRoutes());
  return generateRoutes(filterRouters);
});

// 控制search展示
const isShow = ref(false);

watch(isShow, (val) => {
  if (val) {
    headerSearchSelectRef.value.focus();
    document.body.addEventListener("click", onClose);
  } else {
    document.body.removeEventListener("click", onClose);
  }
});

const headerSearchSelectRef = ref();

const onClose = () => {
  headerSearchSelectRef.value.blur();
  isShow.value = false;
  searchOptions.value = [];
};

// search相关
const search = ref("");

const onShowClick = () => {
  isShow.value = !isShow.value;
};

// 搜索库相关
let fuse: any;

const initFuse = (searchPool: any) => {
  fuse = new Fuse(searchPool.value, {
    shouldSort: true,
    minMatchCharLength: 1,
    keys: [
      {
        name: "title",
        weight: 0.7,
      },
      {
        name: "path",
        weight: 0.3,
      },
    ],
  });
};
initFuse(searchPool);

// 搜索数据源
const searchOptions = ref<any[]>([]);
// 搜索方法
const querySearch = (query: string) => {
  if (query !== "") {
    searchOptions.value = fuse.search(query);
  } else {
    searchOptions.value = [];
  }
};

// 选中回调
const onSelectChange = (val: string) => {
  router.push(val.path);
};

watchSwitchLang(() => {
  searchPool.value = computed(() => {
    const filterRouters = filterRoutes(router.getRoutes());
    return generateRoutes(filterRouters);
  });
});
</script>
<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  :deep(.search-icon) {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
