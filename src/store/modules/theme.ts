import { defineStore } from "pinia"
import { MAIN_COLOR, DEFAULT_COLOR } from "@/constant"

export default defineStore("theme", {
    state() {
        return {
            mainColor: localStorage.getItem(MAIN_COLOR) || DEFAULT_COLOR
        }
    },
    actions: {
        setMainColor(newColor: string) {
            this.mainColor = newColor;
            localStorage.setItem(MAIN_COLOR, newColor)
        }
    },
    getters: {
        mainColorGet: (state) => {
            return state.mainColor
        }
    }
})