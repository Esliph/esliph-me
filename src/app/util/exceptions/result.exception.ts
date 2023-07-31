import { Exception, ExceptionArgs } from '@util/exceptions/exception'
import { HttpStatusCodes } from '@util/http/status-code'

export class ResultException extends Exception {
    constructor(errorInfo: ExceptionArgs, status = HttpStatusCodes.BAD_REQUEST) {
        super(errorInfo, status)
    }
}
