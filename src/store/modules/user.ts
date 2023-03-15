import { defineStore } from "pinia"
import themeStore from "@/store/modules/theme"
import md5 from "md5"
import variables from "@/style/variables.module.scss"
import { generateColors } from "@/utils/theme"

export default defineStore("user", {
    state: () => {
        return {
            uu: 123,
        }
    },
    actions: {
        /**
         * 
         * 登陆请求注册
         * @param context 
         * @param userInfo 
         * @returns 
         */
        demo() {
            console.log(33);

        }
    },
    getters: {
        cssVar: (state) => ({
            ...variables,
            ...generateColors(themeStore().mainColorGet)
        })
    }
})