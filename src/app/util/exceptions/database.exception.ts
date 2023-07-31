import { ExceptionArgs } from '@util/exceptions/exception'
import { HttpStatusCodes } from '@util/exceptions/http.exception'
import { ResultException } from '@util/exceptions/result.exception'

export class DatabaseException extends ResultException {
    constructor(errorInfo: ExceptionArgs, status: HttpStatusCodes.BAD_REQUEST) {
        super(errorInfo, status)
    }
}
