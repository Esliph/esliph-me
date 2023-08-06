import { ErrorCause as ErrorCauseModelPrisma } from '@prisma/client'

export type ErrorCauseModelTable = ErrorCauseModelPrisma

export type ErrorCauseModelSimple = {
    message: string
    origin?: string
}

export class ErrorCauseEntityTable implements ErrorCauseModelTable {
    id: number
    message: string
    origin: string | null
    errorId: number
    createAt: Date
    updateAt: Date

    constructor({ createAt, errorId, id, message, origin, updateAt }: ErrorCauseModelTable) {
        this.createAt = createAt
        this.errorId = errorId
        this.id = id
        this.message = message
        this.origin = origin
        this.updateAt = updateAt
    }
}

export class ErrorCauseEntitySimple implements ErrorCauseModelSimple {
    message: string
    origin: string
    errorId: number

    constructor({ message, origin }: ErrorCauseModelSimple) {
        this.message = message
        this.origin = origin || ''
    }
}
