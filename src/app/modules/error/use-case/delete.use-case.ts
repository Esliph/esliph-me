import { Injectable } from '@nestjs/common'
import { HttpEsliph, Result } from '@esliph/util-node'
import { z } from 'zod'
import { ZodValidateService } from '@services/zod'
import { ResultException } from '@util/exceptions/result.exception'
import { ErrorDeleteRepositoryAbstract } from '@modules/error/repository/delete.repository'

export class ErrorDeleteUseCaseDTO {
    /* Set the DTO properties to delete "Error" */
}

export const ErrorDeleteUseCaseArgsSchema = ZodValidateService.defaultSchemaModelTable()

export type ErrorDeleteUseCaseArgs = z.input<typeof ErrorDeleteUseCaseArgsSchema>
export type ErrorDeleteUseCaseResponse = z.output<typeof ErrorDeleteUseCaseArgsSchema>
export type ErrorDeleteUseCasePerformResponseValue = boolean
export type ErrorDeleteUseCasePerformResponse = Promise<Result<ErrorDeleteUseCasePerformResponseValue>>

@Injectable()
export class ErrorDeleteUseCase {
    constructor(private readonly deleteErrorRepository: ErrorDeleteRepositoryAbstract) { }

    async perform(deleteArgs: ErrorDeleteUseCaseArgs): ErrorDeleteUseCasePerformResponse {
        try {
            const responsePerform = await this.performDelete(deleteArgs)

            return responsePerform
        } catch (err: any) {
            if (err instanceof ResultException) {
                return err
            }
            return Result.failure({ title: 'Delete Error', message: [{ message: 'Cannot delete error' }] }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    private async performDelete(deleteArgs: ErrorDeleteUseCaseArgs): ErrorDeleteUseCasePerformResponse {
        const deleteArgsValidationResult = this.validateArgsProps(deleteArgs)

        const deleteArgsDTO = deleteArgsValidationResult.getValue()

        const performDeleteErrorRepositoryResult = await this.performDeleteErrorRepository(deleteArgsDTO)

        if (!performDeleteErrorRepositoryResult.isSuccess()) {
            return Result.failure(performDeleteErrorRepositoryResult.getError(), performDeleteErrorRepositoryResult.getStatus())
        }

        return performDeleteErrorRepositoryResult
    }

    private validateArgsProps(deleteArgs: ErrorDeleteUseCaseArgs) {
        const errorListDTO = ZodValidateService.performParse(deleteArgs, ErrorDeleteUseCaseArgsSchema)

        return errorListDTO
    }

    private async performDeleteErrorRepository(deleteArgs: ErrorDeleteUseCaseResponse) {
        const response = await this.deleteErrorRepository.perform({ where: { id: deleteArgs.id } })

        return response
    }
}