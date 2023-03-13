import { defineStore } from "pinia"

import { Lang } from "@/constant"


export default defineStore("app", {
    state: () => ({
        sidebarOpened: true,
        language: localStorage.getItem(Lang) || "zh"
    }),
    actions: {
        triggerSidebarOpened() {
            this.sidebarOpened = !this.sidebarOpened
        },
        setLanguage(lang: string) {
            localStorage.setItem(Lang, lang)
            this.language = lang
        }
    },
    getters: {
        sidebarOpenedGet: (state) => state.sidebarOpened,
        languageGetters: (state) => state.language
    }
})