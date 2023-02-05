<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- username -->
      <el-form-item>
        <span class="svg-container">
          <SvgIcon icon="https://res.lgdsunday.club/user.svg"></SvgIcon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          value="1223456"
        ></el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item>
        <span class="svg-container">
          <SvgIcon icon="password"></SvgIcon>
        </span>
        <el-input placeholder="password" name="password"></el-input>
        <span class="show-pwd">
          <SvgIcon icon="show"></SvgIcon>
        </span>
      </el-form-item>
      <el-button type="primary" style="width: 100%; margin-bottom: 30px"
        >登录</el-button
      >
    </el-form>
  </div>
  <div style="background-color: pink">
    <svg class="svg-icon" aria-hidden="true">
      <use href="#icon-password"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { Avatar } from "@element-plus/icons-vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background-color: transparent;
        border: 0;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        caret-color: $cursor;
      }
    }
    :deep(.el-input__wrapper) {
      width: 100%;
      height: 100%;
      background: transparent;
      border: none;
      box-shadow: none;
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
