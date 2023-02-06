import { defineStore } from "pinia"
import { login } from "@/api/sys"
import md5 from "md5"

export default defineStore("user", {
    state: () => {
        return {
            uu: 123
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
        login(userInfo: any) {

            const { username, password } = userInfo
            return new Promise((res, rej) => {
                login({
                    username,
                    password: md5(password)
                }).then(data => {
                    res(data)
                }).catch(err => {
                    rej(err)
                })
            })
        },
        demo() {
            console.log(33);

        }
    },
})