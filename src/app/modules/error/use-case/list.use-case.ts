import { Injectable } from '@nestjs/common'
import { HttpEsliph, Result } from '@esliph/util-node'
import { z } from 'zod'
import { ZodValidateService } from '@services/zod'
import { ErrorFindManyRepositoryAbstract } from '@modules/error/repository/find.repository'
import { ErrorPropSelect } from '@modules/error/repository/repository'
import { ResultException } from '@util/exceptions/result.exception'

export class ErrorListUseCaseDTO {
    /* Set the DTO properties to list "Error" */
}

export const ErrorListUseCaseArgsSchema = z.object({
    /* Set the filter properties to list "Error" */
})

const ErrorPropsSelected = {
    /* Define the properties that must be brought in the "Error" listing */
}

export type ErrorListUseCaseArgs = z.input<typeof ErrorListUseCaseArgsSchema>
export type ErrorListUseCaseResponse = z.output<typeof ErrorListUseCaseArgsSchema>
export type ErrorListCasePerformResponseValue = { errors: ErrorPropSelect<{ select: typeof ErrorPropsSelected }>[] }
export type ErrorListCasePerformResponse = Promise<Result<ErrorListCasePerformResponseValue>>

@Injectable()
export class ErrorListUseCase {
    constructor(private readonly listErrorRepository: ErrorFindManyRepositoryAbstract) { }

    async perform(listArgs: ErrorListUseCaseArgs): ErrorListCasePerformResponse {
        try {
            const responsePerform = await this.performList(listArgs)

            return responsePerform
        } catch (err: any) {
            if (err instanceof ResultException) {
                return err
            }
            return Result.failure({ title: 'Create Error', message: [{ message: 'Cannot create error' }] }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    private async performList(listArgs: ErrorListUseCaseArgs): ErrorListCasePerformResponse {
        const listArgsValidationResult = this.validateArgsProps(listArgs)

        const listArgsDTO = listArgsValidationResult.getValue()

        const performListRepositoryResult = await this.performListRepository(listArgsDTO)

        if (!performListRepositoryResult.isSuccess()) {
            return Result.failure(performListRepositoryResult.getError(), performListRepositoryResult.getStatus())
        }

        return Result.success<ErrorListCasePerformResponseValue>(performListRepositoryResult.getValue(), performListRepositoryResult.getStatus())
    }

    private validateArgsProps(listArgs: ErrorListUseCaseArgs) {
        const errorListDTO = ZodValidateService.performParse(listArgs, ErrorListUseCaseArgsSchema)

        return errorListDTO
    }

    private async performListRepository(listArgs: ErrorListUseCaseArgs) {
        const response = await this.listErrorRepository.perform({ where: listArgs, select: ErrorPropsSelected })

        return response
    }
}