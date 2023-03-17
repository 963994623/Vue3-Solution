import path from "path-browserify"
import i18n from "@/i18n"

export const generateRoutes = (routes: any, basePath = '/', prefixTitle: string[] = []) => {
    let res: any[] = []

    for (const route of routes) {
        const data = {
            path: path.resolve(basePath, route.path),
            title: [...prefixTitle]
        }

        const re = /.*\:.*/
        if (route.meta && route.meta.title && !re.exec(route.path)) {
            const i18Title = i18n.global.t(`msg.route.${route.meta.title}`)
            data.title = [...data.title, i18Title]
            res.push(data)
        }
        if (route.children) {
            const tempRoutes = generateRoutes(route.children, data.path, data.title)
            if (tempRoutes.length > 0) {
                res = [...res, ...tempRoutes]
            }
        }

    }

    return res
}