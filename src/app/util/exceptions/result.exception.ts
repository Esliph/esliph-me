import { Exception, ExceptionArgs } from '@util/exceptions/exception'
import { HttpStatusCodes } from '@util/exceptions/http.exception'

export class ResultException extends Exception {
    constructor(errorInfo: ExceptionArgs, status = HttpStatusCodes.BAD_REQUEST) {
        super(errorInfo, status)
    }
}
