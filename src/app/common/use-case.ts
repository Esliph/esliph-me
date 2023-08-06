import { ErrorType } from '@modules/error/schema'
import { Application } from '@core'
import { HttpStatusCodes } from '@util/http/status-code'
import { Result } from '@esliph/util-node'
import { Exception } from '@util/exceptions/exception'
import { ErrorEsliph } from '@esliph/util-node'

export class UseCase {
    extractError<T>(err: any, methodErrorInfo: { title: string; message: string }) {
        let errorInfo: ErrorEsliph.ErrorResultInfo

        if (err instanceof Exception) {
            errorInfo = this.extractErrorIfException(err)
        } else {
            errorInfo = this.extractErrorIfUnknown(err, methodErrorInfo)

            Application.emit('error', {
                title: errorInfo.title,
                message: errorInfo.message,
                causes: errorInfo.causes,
                description: errorInfo.description,
                type: ErrorType.InternalServer
            })
        }

        return Result.failure<T>(errorInfo, HttpStatusCodes.BAD_REQUEST)
    }

    private extractErrorIfException(err: Exception): ErrorEsliph.ErrorResultInfo {
        return {
            message: err.getError().message,
            title: err.getError().title,
            causes: err.getError().causes,
            description: err.getError().description
        }
    }

    private extractErrorIfUnknown(err: any, { message, title }: { title: string; message: string }): ErrorEsliph.ErrorResultInfo {
        return { title, message }
    }
}
