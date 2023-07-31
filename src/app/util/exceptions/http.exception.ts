import { HttpStatusCodes } from '@esliph/util-node'
import { Exception, ExceptionArgs } from '@util/exceptions/exception'

export { HttpStatusCodes }

export class HttpException extends Exception {
    constructor(errorInfo: ExceptionArgs, status: number) {
        super(errorInfo, status)
    }
}
