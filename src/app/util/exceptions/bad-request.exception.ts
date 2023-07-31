import { ExceptionArgs } from '@util/exceptions/exception'
import { HttpException, HttpStatusCodes } from '@util/exceptions/http.exception'

const ERROR_INFO_DEFAULT: ExceptionArgs = {
    title: 'Requisition',
    message: 'Bad Request'
}

export class BadRequestException extends HttpException {
    constructor({ message = ERROR_INFO_DEFAULT.message, title = ERROR_INFO_DEFAULT.title, causes = ERROR_INFO_DEFAULT.causes, description = ERROR_INFO_DEFAULT.description }: Omit<ExceptionArgs, 'message'> & Partial<{ message?: string }>) {
        super({ message, causes, description, title }, HttpStatusCodes.BAD_REQUEST)
    }
}
