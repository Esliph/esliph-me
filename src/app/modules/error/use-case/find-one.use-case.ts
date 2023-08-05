import { Injectable } from '@nestjs/common'
import { HttpEsliph, Result } from '@esliph/util-node'
import { z } from 'zod'
import { ZodValidateService } from '@services/zod'
import { ResultException } from '@util/exceptions/result.exception'
import { ErrorPropSelect } from '@modules/error/repository/repository'
import { ErrorFindUniqueRepositoryAbstract } from '@modules/error/repository/find.repository'

export class ErrorFindOneUseCaseDTO {
    /* Set the DTO properties to list "Error" */
}

export const ErrorFindOneUseCaseArgsSchema = ZodValidateService.defaultSchemaModelTable()

const ErrorPropsSelected = {
    /* Defines the properties that must be retrieved when searching for "Error" */
}

export type ErrorFindOneUseCaseArgs = z.input<typeof ErrorFindOneUseCaseArgsSchema>
export type ErrorFindOneUseCaseResponse = z.output<typeof ErrorFindOneUseCaseArgsSchema>
export type ErrorFindOneUseCasePerformResponseValue = { error: ErrorPropSelect<{ select: typeof ErrorPropsSelected }> }
export type ErrorFindOneUseCasePerformResponse = Promise<Result<ErrorFindOneUseCasePerformResponseValue>>

@Injectable()
export class ErrorFindOneUseCase {
    constructor(private readonly findErrorRepository: ErrorFindUniqueRepositoryAbstract) { }

    async perform(findArgs: ErrorFindOneUseCaseArgs): ErrorFindOneUseCasePerformResponse {
        try {
            const responsePerform = await this.performFindOne(findArgs)

            return responsePerform
        } catch (err: any) {
            if (err instanceof ResultException) {
                return err
            }
            return Result.failure({ title: 'Find Error', message: [{ message: 'Cannot find error' }] }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    private async performFindOne(findArgs: ErrorFindOneUseCaseArgs): ErrorFindOneUseCasePerformResponse {
        const findArgsValidationResult = this.validateArgsProps(findArgs)

        const findArgsDTO = findArgsValidationResult.getValue()

        const performFindRepositoryResult = await this.performFindRepository(findArgsDTO)

        if (!performFindRepositoryResult.isSuccess()) {
            return Result.failure(performFindRepositoryResult.getError(), performFindRepositoryResult.getStatus())
        }

        return Result.success<ErrorFindOneUseCasePerformResponseValue>(performFindRepositoryResult.getValue(), performFindRepositoryResult.getStatus())
    }

    private validateArgsProps(findArgs: ErrorFindOneUseCaseArgs) {
        const errorFindDTO = ZodValidateService.performParse(findArgs, ErrorFindOneUseCaseArgsSchema)

        return errorFindDTO
    }

    private async performFindRepository(findArgs: ErrorFindOneUseCaseResponse) {
        const response = await this.findErrorRepository.perform({ where: { id: findArgs.id }, select: ErrorPropsSelected })

        return response
    }
}