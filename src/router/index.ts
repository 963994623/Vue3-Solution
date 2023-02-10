import { createRouter, createWebHashHistory } from "vue-router"
import home from "../views/home.vue"
import demo1 from "../views/1.vue"
import demo11 from "../views/1.1.vue"
import demo22 from "../views/1.2.vue"
import demo33 from "../views/1.3.vue"

import demo2Login from "../views/2.login.vue"

import demo3 from "../layout/index.vue"


const privateRoutes = [
    {
        path: '/user',
        component: demo3,
        meta: {
            title: "user",
            icon: "personnel"
        },
        children: [
            {
                path: "/user/manage",
                component: () => import("@/views/3.user-manage.vue"),
                meta: {
                    title: "user<amage",
                    icon: 'personnel-manage'
                }
            },
            {
                path: "/user/role",
                component: () => import("@/views/3.role-list.vue"),
                meta: {
                    title: "roleList",
                    icon: 'role'
                }
            },
            {
                path: "/user/permission",
                component: () => import("@/views/3.role-list.vue"),
                meta: {
                    title: "permissionList",
                    icon: 'permission'
                }
            },
            {
                path: "/user/info:id",
                name: 'userInfo',
                component: () => import("@/views/3.user-info.vue"),
            },
            {
                path: "/user/import",
                component: () => import("@/views/3.import.vue"),
                meta: {
                    title: "excelImport",
                    icon: 'excelImport'
                }
            }
        ]
    }, {
        path: "/artivle",
        component: demo3,
        redirect: "/article/ranking",
        meta: {
            title: "article",
            icon: 'article'
        },
        children: [
            {
                path: "/article/ranking",
                component: () => import("@/views/3.article-ranking.vue"),
                meta: {
                    title: "articleRnaking",
                    icon: 'article-ranking'
                }
            },
            {
                path: '/article/:id',
                component: () => import("@/views/3.article-detail.vue"),

            }, {
                path: "/article/create",
                component: () => import('@/views/3.aritcle-create.vue'),
                meta: {
                    title: "articleCreate",
                    icon: "article-create"
                }
            },
            {
                path: "article/editor/:id",
                component: () => import('@/views/3.aritcle-create.vue'),
            }
        ]
    }
]
const publicRoutes = [
    {
        path: '/demo3',
        component: demo3,
        redirect: "/demo3/profile",
        children: [
            {
                path: "/demo3/profile",
                component: () => import("@/views/3.profile.vue"),
                meta: {
                    title: "profile",
                    icon: "hide"
                }
            },
            {
                path: "/demo3/404",
                component: () => import("@/views/3.error-page.vue"),


            },
            {
                path: "/demo3/401",
                component: () => import("@/views/3.error-page.vue"),

            },

        ]
    },
]

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
    routes: [...routes, ...privateRoutes, ...publicRoutes]
})

export default router