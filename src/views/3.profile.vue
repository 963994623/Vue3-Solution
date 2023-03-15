<template>
  <div class="demo-pagination-block">
    <div class="demonstration">Change page size</div>

    <el-button>Default</el-button>
    <el-button type="primary">Default</el-button>
    <el-button type="success">Default</el-button>
    <el-button type="info">Default</el-button>
    <el-button type="warning">Default</el-button>
    <el-button type="danger">Default</el-button>
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
