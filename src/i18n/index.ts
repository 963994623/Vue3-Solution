import { createI18n } from "vue-i18n"
import pinia from "@/store/store"
import useStore from "@/store"
// import app from "@/store/modules/app"

import zhLocale from "./lang/zh"
import enLocale from "./lang/en"




// const Happ = app(pinia)
const { app } = useStore(pinia)



const message = {
    en: {
        msg: {
            ...enLocale
        }
    },
    zh: {
        msg: {
            ...zhLocale
        }
    }
}


function getLanguage() {
    return app && app.languageGetters
}

const locale = getLanguage() || "zh";

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale,
    messages: message
})
export default i18n