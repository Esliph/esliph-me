import { Result } from '@esliph/util-node'
import { HttpException as HttpExceptionModel } from '@nestjs/common'
import { ExceptionArgs } from '@util/exceptions/exception'

export class HttpException extends HttpExceptionModel {
    constructor(errorInfo: ExceptionArgs, status: number) {
        const errorResult = Result.failure(
            {
                message: errorInfo.message,
                title: errorInfo.title || 'Request Exception',
                causes: errorInfo.causes,
                description: errorInfo.description
            },
            status
        )

        super(errorResult, status)
    }
}
