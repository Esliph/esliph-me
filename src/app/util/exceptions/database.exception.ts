import { ExceptionArgs } from '@util/exceptions/exception'
import { HttpStatusCodes } from '@util/http/status-code'
import { ResultException } from '@util/exceptions/result.exception'

export class DatabaseException extends ResultException {
    constructor(errorInfo: ExceptionArgs, status: HttpStatusCodes.BAD_REQUEST) {
        super(errorInfo, status)
    }
}
