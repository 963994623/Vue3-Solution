import i18n from "@/i18n"
import { watch } from "vue"
import pinia from "@/store"
const { app } = pinia()

export function generateTitle(title: string) {
    return i18n.global.t("msg.route." + title)
}

export function watchSwitchLang(...cbs) {
    watch(() => app.languageGetters, () => {
        cbs.forEach(cb => {
            return cb(app.languageGetters)
        })
    })

}