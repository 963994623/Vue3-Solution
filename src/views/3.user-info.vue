<template>{{ routerData }}321</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
const routerData = ref(useRoute().meta);
</script>
