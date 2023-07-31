import { HttpException, HttpStatusCodes } from '@util/exceptions/http.exception'
import { ExceptionArgs } from '@util/exceptions/exception'

const ERROR_INFO_DEFAULT: ExceptionArgs = {
    title: 'Forbidden',
    message: 'Request denied',
    description: 'Access to this feature is restricted'
}

export class ForbiddenException extends HttpException {
    constructor({ causes = ERROR_INFO_DEFAULT.causes, description = ERROR_INFO_DEFAULT.description, message = ERROR_INFO_DEFAULT.message, title = ERROR_INFO_DEFAULT.title }: Omit<ExceptionArgs, 'message'> & Partial<{ message?: string }>) {
        super({ message, causes, description, title }, HttpStatusCodes.FORBIDDEN)
    }
}
