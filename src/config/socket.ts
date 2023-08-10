import { getEnv } from '@services/env'

export const CONFIG_SOCKET = {
    origin: getEnv({ name: 'ORIGIN_SOCKET_CLIENT', defaultValue: '*' })
}
