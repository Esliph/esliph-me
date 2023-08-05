import { Injectable } from '@nestjs/common'
import { HttpEsliph, Result } from '@esliph/util-node'
import { z } from 'zod'
import { IsOptional } from 'class-validator'
import { ZodValidateService } from '@services/zod'
import { ResultException } from '@util/exceptions/result.exception'
import { ErrorEntityTable } from '@modules/error/schema'
import { ErrorPropSelect } from '@modules/error/repository/repository'
import { ErrorUpdateRepositoryAbstract } from '@modules/error/repository/update.repository'
import { ErrorFindUniqueRepositoryAbstract } from '@modules/error/repository/find.repository'

export class ErrorUpdateUseCaseDTO {
    /* Set the DTO properties to update the "Error" */
}

export const ErrorUpdateUseCaseArgsSchema = ZodValidateService.defaultSchemaModelTable().extend({
    /* Define the properties and their validations to update the "Error" */
})

export type ErrorUpdateUseCaseArgs = z.input<typeof ErrorUpdateUseCaseArgsSchema>
export type ErrorUpdateUseCaseResponse = z.output<typeof ErrorUpdateUseCaseArgsSchema>
export type ErrorUpdateUseCasePerformResponseValue = { success: string }
export type ErrorUpdateUseCasePerformResponse = Promise<Result<ErrorUpdateUseCasePerformResponseValue>>

@Injectable()
export class ErrorUpdateUseCase {
    constructor(private readonly updateErrorRepository: ErrorUpdateRepositoryAbstract, private readonly findErrorRepository: ErrorFindUniqueRepositoryAbstract) { }

    async perform(updateArgs: ErrorUpdateUseCaseArgs): ErrorUpdateUseCasePerformResponse {
        try {
            const responsePerform = await this.performUpdate(updateArgs)

            return responsePerform
        } catch (err: any) {
            if (err instanceof ResultException) {
                return err
            }
            return Result.failure({ title: 'Update Error', message: [{ message: 'Cannot update error' }] }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    private async performUpdate(updateArgs: ErrorUpdateUseCaseArgs): ErrorUpdateUseCasePerformResponse {
        const updateArgsValidationResult = this.validateArgsProps(updateArgs)

        const updateErrorData = updateArgsValidationResult.getValue()

        const findErrorToBeUpdatedResult = await this.findErrorToBeUpdated({ id: updateErrorData.id })

        const errorToBeUpdated = findErrorToBeUpdatedResult.getValue().error

        const errorEntityTable = new ErrorEntityTable(errorToBeUpdated)

        errorEntityTable.update(updateErrorData)

        const performUpdateRepositoryResult = await this.performUpdateRepository(errorEntityTable)

        if (!performUpdateRepositoryResult.isSuccess()) {
            return Result.failure(performUpdateRepositoryResult.getError(), performUpdateRepositoryResult.getStatus())
        }

        return Result.success({ success: 'Error update successfully' }, HttpEsliph.HttpStatusCodes.OK)
    }

    private async findErrorToBeUpdated(args: { id: number }) {
        const response = await this.findErrorRepository.perform({ where: { id: args.id } })

        return response
    }

    private validateArgsProps(updateArgs: ErrorUpdateUseCaseArgs) {
        const errorUpdateDTO = ZodValidateService.performParse(updateArgs, ErrorUpdateUseCaseArgsSchema)

        return errorUpdateDTO
    }

    private async performUpdateRepository(errorData: ErrorEntityTable) {
        const response = await this.updateErrorRepository.perform({
            where: { id: errorData.id },
            data: { ...errorData }
        })

        return response
    }
}