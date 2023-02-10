// import { } from "pinia"
import useUserStore from "./modules/user"
import useAppStore from "./modules/app"

export default function useStore() {
    return {
        user: useUserStore(),
        app: useAppStore()
    }
}