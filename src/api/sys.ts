import request from "../utils/requests"

export const login = (data: any) => {
    return request({
        url: '/sys/login',
        method: "POST",
        data
    })
}