import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { z } from 'zod'
import { ZodValidateService } from '@services/zod'
import { UseCase } from '@common/use-case'
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
export class PrivilegeFindOneUseCase extends UseCase {
    constructor(private readonly findPrivilegeRepository: PrivilegeFindUniqueRepositoryAbstract) {
        super()
    }

    async perform(findArgs: PrivilegeFindOneUseCaseArgs): PrivilegeFindOneUseCasePerformResponse {
        try {
            const responsePerform = await this.performFindOne(findArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'Find Privilege', message: 'Cannot find privilege' })
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
