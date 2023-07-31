import { ErrorType } from './error'

export type AppEvents = {
    error: {
        title: string
        message: string
        causes?: {
            message: string
            origin?: string
        }[]
        description?: string
        stack?: string
        type: ErrorType
    }
    teste: any
}
