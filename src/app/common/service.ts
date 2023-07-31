import { HttpStatusCodes } from '@util/http/status-code'
import { Result } from '@esliph/util-node'
import { Exception } from '@util/exceptions/exception'
import { ErrorResultInfo } from '@esliph/util-node/dist/lib/error'

export class Service {
    extractError<T>(err: any, methodErrorInfo: { title: string; message: string }) {
        let errorInfo: ErrorResultInfo

        if (err instanceof Exception) {
            errorInfo = this.extractErrorIfException(err)
        } else {
            errorInfo = this.extractErrorIfUnknown(err, methodErrorInfo)
        }

        return Result.failure<T>(errorInfo, HttpStatusCodes.INTERNAL_SERVER_ERROR)
    }

    private extractErrorIfException(err: Exception): ErrorResultInfo {
        return {
            message: err.getError().message,
            title: err.getError().title,
            causes: err.getError().causes,
            description: err.getError().description
        }
    }

    private extractErrorIfUnknown(err: any, { message, title }: { title: string; message: string }): ErrorResultInfo {
        return { title, message }
    }
}
