<template>
  <div class="navbar">
    <Hamburger class="hamburger-container"></Hamburger>
    <Breadcrumb class="breadcrumb-container"></Breadcrumb>

    <div class="right-menu">
      <HandSearch class="right-menu-item hover-effect"></HandSearch>
      <screenFull class="right-menu-item hover-effect"></screenFull>
      <themePicker class="right-menu-item hover-effect"></themePicker>
      <LangSelect class="right-menu-item hover-effect"></LangSelect>
      <el-dropdown class="avatar-container">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="userPng"></el-avatar>
          <el-icon size="15">
            <Setting />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>主页</el-dropdown-item>
            </router-link>

            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import userPng from "@/assets/icon.png";
import { Setting } from "@element-plus/icons-vue";
import Hamburger from "@/components/hamburger/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import LangSelect from "@/components/LangSelect/index.vue";
import themePicker from "@/components/ThemeSelect/index.vue";
import screenFull from "@/components/Screenfull/index.vue";
import HandSearch from "@/components/HeaderSearch/index.vue";
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
      }
    }
    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
.breadcrumb-container {
  float: left;
}
</style>
