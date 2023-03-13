// import { } from "pinia"
import useUserStore from "./modules/user"
import useAppStore from "./modules/app"

export default function useStore(pinia: null | any = null) {
    return {
        user: useUserStore(pinia),
        app: useAppStore(pinia)
    }
}