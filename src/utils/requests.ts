import axios from "axios"
import config from "../config"
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 5000
})
export default service
