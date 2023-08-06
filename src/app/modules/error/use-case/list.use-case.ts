import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { z } from 'zod'
import { UseCase } from '@common/use-case'
import { ZodValidateService } from '@services/zod'
import { ErrorPropSelect } from '@modules/error/repository/repository'
import { ErrorFindManyRepositoryAbstract } from '@modules/error/repository/find.repository'

export class ErrorListUseCaseDTO { }

export const ErrorListUseCaseArgsSchema = z.object({})

const ErrorPropsSelected = {
    id: true,
    title: true,
    message: true,
    description: true,
    stack: true,
    type: true,
    causes: true,
    createAt: true,
    updateAt: true,
}

export type ErrorListUseCaseArgs = z.input<typeof ErrorListUseCaseArgsSchema>
export type ErrorListUseCaseResponse = z.output<typeof ErrorListUseCaseArgsSchema>
export type ErrorListCasePerformResponseValue = { errors: ErrorPropSelect<{ select: typeof ErrorPropsSelected }>[] }
export type ErrorListCasePerformResponse = Promise<Result<ErrorListCasePerformResponseValue>>

@Injectable()
export class ErrorListUseCase extends UseCase {
    constructor(private readonly listErrorRepository: ErrorFindManyRepositoryAbstract) {
        super()
    }

    async perform(listArgs: ErrorListUseCaseArgs): ErrorListCasePerformResponse {
        try {
            const responsePerform = await this.performList(listArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'List Errors', message: 'Cannot list errors' })
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
        const response = await this.listErrorRepository.perform({
            where: listArgs,
            select: ErrorPropsSelected
        })

        return response
    }
}
