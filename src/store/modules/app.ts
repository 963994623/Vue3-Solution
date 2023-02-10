import { defineStore } from "pinia"
export default defineStore("app", {
    state: () => ({
        sidebarOpened: true,
    }),
    actions: {
        triggerSidebarOpened() {
            this.sidebarOpened = !this.sidebarOpened


        }
    },
    getters: {
        sidebarOpenedGet: (state) => state.sidebarOpened
    }
})