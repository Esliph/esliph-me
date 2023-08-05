import { Injectable } from '@nestjs/common'
import { HttpEsliph, Result } from '@esliph/util-node'
import { z } from 'zod'
import { IsNotEmpty } from 'class-validator'
import { ZodValidateService } from '@services/zod'
import { ResultException } from '@util/exceptions/result.exception'
import { ErrorEntitySimple } from '@modules/error/schema'
import { ErrorCreateRepositoryAbstract } from '@modules/error/repository/create.repository'

export class ErrorCreateUseCaseDTO {
    /* Set the DTO properties to delete "Error" */
}

export const ErrorCreateUseCaseArgsSchema = z.object({
    /* Define the properties and their validations to create the "Error" */
})

export type ErrorCreateUseCaseArgs = z.input<typeof ErrorCreateUseCaseArgsSchema>
export type ErrorCreateUseCaseResponse = z.output<typeof ErrorCreateUseCaseArgsSchema>
export type ErrorCreateUseCasePerformResponseValue = { success: string }
export type ErrorCreateUseCasePerformResponse = Promise<Result<ErrorCreateUseCasePerformResponseValue>>

@Injectable()
export class ErrorCreateUseCase {
    constructor(private readonly createErrorRepository: ErrorCreateRepositoryAbstract) { }

    async perform(createArgs: ErrorCreateUseCaseArgs): ErrorCreateUseCasePerformResponse {
        try {
            const responsePerform = await this.performCreate(createArgs)

            return responsePerform
        } catch (err: any) {
            if (err instanceof ResultException) {
                return err
            }

            return Result.failure({ title: 'Create Error', message: [{ message: 'Cannot create error' }] }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    private async performCreate(createArgs: ErrorCreateUseCaseArgs): ErrorCreateUseCasePerformResponse {
        const createArgsValidationResult = this.validateArgsProps(createArgs)

        const createErrorArgsValidated = createArgsValidationResult.getValue()

        const errorEntityTable = new ErrorEntitySimple(createErrorArgsValidated)

        const performCreateErrorRepositoryResult = await this.performCreateErrorRepository(errorEntityTable)

        if (!performCreateErrorRepositoryResult.isSuccess()) {
            return Result.failure(performCreateErrorRepositoryResult.getError(), performCreateErrorRepositoryResult.getStatus())
        }

        return Result.success({ success: 'Error create successfully' }, HttpEsliph.HttpStatusCodes.CREATED)
    }

    private validateArgsProps(createArgs: ErrorCreateUseCaseArgs) {
        const ErrorCreateDTO = ZodValidateService.performParse(createArgs, ErrorCreateUseCaseArgsSchema)

        return ErrorCreateDTO
    }

    private async performCreateErrorRepository(errorData: ErrorEntitySimple) {
        const response = await this.createErrorRepository.perform({ data: errorData })

        return response
    }
}