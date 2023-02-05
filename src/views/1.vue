<template>
  我是1

  <div>
    <router-link :to="{ path: '/demo1/demo11' }"> 跳转1.1 </router-link
    ><router-link :to="{ path: '/demo1/demo22' }"> 跳转1.2 </router-link
    ><router-link :to="{ path: '/demo1/demo33' }"> 跳转1.3 </router-link>
  </div>
  <router-view></router-view>
</template>
