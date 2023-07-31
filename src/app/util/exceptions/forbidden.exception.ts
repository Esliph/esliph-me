import { HttpException } from '@util/exceptions/http.exception'
import { HttpStatusCodes } from '@util/http/status-code'
import { ExceptionArgs } from '@util/exceptions/exception'

const ERROR_INFO_DEFAULT: ExceptionArgs = {
    title: 'Forbidden',
    message: 'Request denied',
    description: 'Access to this feature is restricted'
}

export class ForbiddenException extends HttpException {
    constructor(errorInfo?: Partial<Omit<ExceptionArgs, 'message'>> & Partial<{ message?: string }>) {
        super(
            {
                message: errorInfo?.message || ERROR_INFO_DEFAULT.message,
                causes: errorInfo?.causes || ERROR_INFO_DEFAULT.causes,
                description: errorInfo?.description || ERROR_INFO_DEFAULT.description,
                title: errorInfo?.title || ERROR_INFO_DEFAULT.title
            },
            HttpStatusCodes.FORBIDDEN
        )
    }
}
