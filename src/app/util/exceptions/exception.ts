import { ExceptionEsliph, ResultException } from '@esliph/util-node'

export type ExceptionArgs = Omit<ExceptionEsliph.ResultExceptionArgs, 'status'>

export abstract class Exception extends ResultException {
    constructor(errorInfo: ExceptionArgs, status?: number) {
        super({ ...errorInfo, status })
    }
}
