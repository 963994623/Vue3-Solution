<template>
  <div class="demo-pagination-block">
    <div class="demonstration">Change page size</div>
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      layout="sizes, prev, pager, next"
      :total="1000"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
const routerData = ref(useRoute().meta);
</script>
