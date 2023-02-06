export type EnvConfigKey = "baseApi" | "mockApi"


type EnvConfigItemI<K extends string | number> = {
    [P in K]: string
}



export interface EnvConfigI {
    development: EnvConfigItemI<EnvConfigKey>,
    production: EnvConfigItemI<EnvConfigKey>,
}
