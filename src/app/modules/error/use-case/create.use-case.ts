import { ErrorCauseModelSimple } from '@modules/errorCause/schema'
import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { z } from 'zod'
import { UseCase } from '@common/use-case'
import { HttpStatusCodes } from '@util/http/status-code'
import { ErrorEntitySimple, ErrorModelSimple } from '@modules/error/schema'
import { ErrorCreateRepositoryAbstract } from '@modules/error/repository/create.repository'

export const ErrorCreateUseCaseArgsSchema = z.object({})

export type ErrorCreateUseCaseArgs = ErrorModelSimple & {
    causes?: ErrorCauseModelSimple[]
}
export type ErrorCreateUseCasePerformResponseValue = { success: string }
export type ErrorCreateUseCasePerformResponse = Promise<Result<ErrorCreateUseCasePerformResponseValue>>

@Injectable()
export class ErrorCreateUseCase extends UseCase {
    constructor(private readonly createErrorRepository: ErrorCreateRepositoryAbstract) {
        super()
    }

    async perform(createArgs: ErrorCreateUseCaseArgs): ErrorCreateUseCasePerformResponse {
        try {
            const responsePerform = await this.performCreate(createArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'Create Error', message: 'Cannot create error' })
        }
    }

    private async performCreate(createArgs: ErrorCreateUseCaseArgs): ErrorCreateUseCasePerformResponse {
        const errorEntityTable = new ErrorEntitySimple(createArgs)

        const performCreateErrorRepositoryResult = await this.performCreateErrorRepository(errorEntityTable)

        if (!performCreateErrorRepositoryResult.isSuccess()) {
            return Result.failure(performCreateErrorRepositoryResult.getError(), performCreateErrorRepositoryResult.getStatus())
        }

        return Result.success({ success: 'Error create successfully' }, HttpStatusCodes.CREATED)
    }

    private async performCreateErrorRepository(errorData: ErrorCreateUseCaseArgs) {
        const response = await this.createErrorRepository.perform({
            data: {
                message: errorData.message,
                description: errorData.description,
                title: errorData.title,
                type: errorData.type,
                stack: errorData.stack,
                dateTime: errorData.dateTime,
                causes: {
                    create: (errorData.causes || []).map(cause => ({
                        message: cause.message,
                        origin: cause.origin
                    }))
                }
            }
        })

        return response
    }
}
