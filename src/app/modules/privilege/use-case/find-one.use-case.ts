import { Injectable } from '@nestjs/common'
import { HttpEsliph, Result } from '@esliph/util-node'
import { z } from 'zod'
import { ZodValidateService } from '@services/zod'
import ResultException from '@util/exceptions/result.exception'
import { PrivilegePropSelect } from '@modules/privilege/repository/repository'
import { PrivilegeFindUniqueRepositoryAbstract } from '@modules/privilege/repository/find.repository'

export class PrivilegeFindOneUseCaseDTO {
    /* Set the DTO properties to list "Privilege" */
}

export const PrivilegeFindOneUseCaseArgsSchema = ZodValidateService.defaultSchemaModelTable()

const PrivilegePropsSelected = {
    /* Defines the properties that must be retrieved when searching for "Privilege" */
}

export type PrivilegeFindOneUseCaseArgs = z.input<typeof PrivilegeFindOneUseCaseArgsSchema>
export type PrivilegeFindOneUseCaseResponse = z.output<typeof PrivilegeFindOneUseCaseArgsSchema>
export type PrivilegeFindOneUseCasePerformResponseValue = { privilege: PrivilegePropSelect<{ select: typeof PrivilegePropsSelected }> }
export type PrivilegeFindOneUseCasePerformResponse = Promise<Result<PrivilegeFindOneUseCasePerformResponseValue>>

@Injectable()
export class PrivilegeFindOneUseCase {
    constructor(private readonly findPrivilegeRepository: PrivilegeFindUniqueRepositoryAbstract) { }

    async perform(findArgs: PrivilegeFindOneUseCaseArgs): PrivilegeFindOneUseCasePerformResponse {
        try {
            const responsePerform = await this.performFindOne(findArgs)

            return responsePerform
        } catch (err: any) {
            if (err instanceof ResultException) {
                return err
            }
            return Result.failure({ title: 'Find Privilege', message: [{ message: 'Cannot find privilege' }] }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    private async performFindOne(findArgs: PrivilegeFindOneUseCaseArgs): PrivilegeFindOneUseCasePerformResponse {
        const findArgsValidationResult = this.validateArgsProps(findArgs)

        const findArgsDTO = findArgsValidationResult.getValue()

        const performFindRepositoryResult = await this.performFindRepository(findArgsDTO)

        if (!performFindRepositoryResult.isSuccess()) {
            return Result.failure(performFindRepositoryResult.getError(), performFindRepositoryResult.getStatus())
        }

        return Result.success<PrivilegeFindOneUseCasePerformResponseValue>(performFindRepositoryResult.getValue(), performFindRepositoryResult.getStatus())
    }

    private validateArgsProps(findArgs: PrivilegeFindOneUseCaseArgs) {
        const privilegeFindDTO = ZodValidateService.performParse(findArgs, PrivilegeFindOneUseCaseArgsSchema)

        return privilegeFindDTO
    }

    private async performFindRepository(findArgs: PrivilegeFindOneUseCaseResponse) {
        const response = await this.findPrivilegeRepository.perform({ where: { id: findArgs.id }, select: PrivilegePropsSelected })

        return response
    }
}
