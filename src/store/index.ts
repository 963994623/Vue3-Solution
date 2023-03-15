// import { } from "pinia"
import useUserStore from "./modules/user"
import useAppStore from "./modules/app"
import useThemeStore from "./modules/theme"

export default function useStore(pinia: null | any = null) {
    return {
        user: useUserStore(pinia),
        app: useAppStore(pinia),
        theme: useThemeStore(pinia)
    }
}