import { resolve } from "path-browserify"

/**
 * 获取所有的子集路由
 */
const getChildrenRoutes = (routes: any) => {
    const result: any[] = [];
    routes.forEach((element: any) => {
        if (element.children && element.children.length > 0) {
            result.push(...element.children)
        }
    });

    return result

}
/**
 * 判断对象是否为空
 */
function isNull(data: any) {
    if (!data) return true
    if (JSON.stringify(data) === '{}') return true
    if (JSON.stringify(data) === '[]') return true
    return false
}

/**
 * 处理脱离层级的路由
 */
export const filterRoutes = (routes: any) => {

    const childrenRouts = getChildrenRoutes(routes); //所有的二级路由
    return routes.filter((route: any) => {
        return !childrenRouts.find(element => {
            return route.path == element.path
        })
    })

}

export const generateMenus = (routes: any, basePath: string = '') => {
    const result: any[] = []

    routes.forEach((item: any) => {


        if (isNull(item.children) && isNull(item.meta)) return //排除没有children和meta的路由 也就是排除u项目歪的路由
        if (!isNull(item.children) && isNull(item.meta)) {  //没有meta元数据 但是有children的 进行递归处理
            console.log(item);

            result.push(...generateMenus(item.children))
            return
        }

        const routePath = resolve(basePath, item.path)
        let route = result.find(item => item.path === routePath)


        if (!route) {
            route = {
                ...item,
                path: routePath,
                children: []
            }

            if (route.meta.icon && route.meta.title) {
                result.push(route)

            }
        }


        if (!isNull(item.children)) {
            route.children.push(...generateMenus(item.children, routePath))
            return
        }
    })

    return result;
}