import { EnvConfigI, EnvConfigKey } from "./indexTs"
const env: string = import.meta.env.MODE || "prod"

const EnvConfig: EnvConfigI = {
    development: {
        baseApi: "/api",
        mockApi: ""
    },
    production: {
        baseApi: "/api",
        mockApi: ""
    }
}

const EnvConfigItem: Partial<{ [P in keyof EnvConfigI]: EnvConfigI[P] }> = EnvConfig[env]
export default {
    ...EnvConfigItem as { [P in EnvConfigKey]: string }
}


