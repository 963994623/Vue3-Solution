import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹  ./src/icons/svg 代表你svg图标所在的文件夹
      iconDirs: [resolve(process.cwd(), './src/icons/svg/')],
    })],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://api.imooc-admin.lgdsunday.club/",
        changeOrigin: true,
      }
    },
    https: false,
    open: true,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  }
})
