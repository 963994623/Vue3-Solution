import { createRouter, createWebHashHistory } from "vue-router"
import home from "../views/home.vue"
import demo1 from "../views/1.vue"
import demo11 from "../views/1.1.vue"
import demo22 from "../views/1.2.vue"
import demo33 from "../views/1.3.vue"

import demo2Login from "../views/2.login.vue"



const routes = [
    { path: '/', component: home },
    {
        path: '/demo1', component: demo1, name: "demo1",
        children: [
            {
                path: "demo11",
                component: demo11
            },
            {
                path: "demo22",
                component: demo22
            },
            {
                path: "demo33",
                component: demo33
            },
        ]
    },
    { path: '/demo2Login', component: demo2Login },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router