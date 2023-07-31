import { ExceptionArgs } from '@util/exceptions/exception'
import { HttpException } from '@util/exceptions/http.exception'
import { HttpStatusCodes } from '@util/http/status-code'

const ERROR_INFO_DEFAULT: ExceptionArgs = {
    title: 'Requisition',
    message: 'Bad Request'
}

export class BadRequestException extends HttpException {
    constructor(errorInfo?: Partial<Omit<ExceptionArgs, 'message'>> & Partial<{ message?: string }>) {
        super(
            {
                message: errorInfo?.message || ERROR_INFO_DEFAULT.message,
                causes: errorInfo?.causes || ERROR_INFO_DEFAULT.causes,
                description: errorInfo?.description || ERROR_INFO_DEFAULT.description,
                title: errorInfo?.title || ERROR_INFO_DEFAULT.title
            },
            HttpStatusCodes.BAD_REQUEST
        )
    }
}
