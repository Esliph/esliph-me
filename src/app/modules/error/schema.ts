import { Error as ErrorModelPrisma, ErrorType } from '@prisma/client'
import { ErrorCauseModelSimple } from '@modules/errorCause/schema'

export type ErrorModelTable = ErrorModelPrisma

export { ErrorType }

export type ErrorModelSimple = {
    type: ErrorType;
    title: string;
    message: string;
    description?: string
    stack?: string
    dateTime: Date
}

export class ErrorEntityTable implements ErrorModelTable {
    id: number
    type: ErrorType
    title: string
    message: string
    description: string | null
    stack: string | null
    dateTime: Date
    createAt: Date
    updateAt: Date
    causes: ErrorCauseModelSimple[]

    constructor({ createAt, description, id, message, stack, title, type, updateAt }: ErrorModelTable) {
        this.createAt = createAt
        this.id = id
        this.message = message
        this.description = description
        this.stack = stack
        this.title = title
        this.type = type
        this.updateAt = updateAt
    }
}

export class ErrorEntitySimple implements ErrorModelSimple {
    type: ErrorType
    title: string
    message: string
    description?: string
    stack?: string
    dateTime: Date

    constructor({ description, message, stack, title, type, dateTime }: ErrorModelSimple) {
        this.description = description
        this.message = message
        this.stack = stack
        this.title = title
        this.type = type
        this.dateTime = dateTime
    }
}
