import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { z } from 'zod'
import { ZodValidateService } from '@services/zod'
import { UseCase } from '@common/use-case'
import { PrivilegeFindManyRepositoryAbstract } from '@modules/privilege/repository/find.repository'
import { PrivilegePropSelect } from '@modules/privilege/repository/repository'

export class PrivilegeListUseCaseDTO {
    /* Set the DTO properties to list "Privilege" */
}

export const PrivilegeListUseCaseArgsSchema = z.object({
    /* Set the filter properties to list "Privilege" */
})

const PrivilegePropsSelected = {
    /* Define the properties that must be brought in the "Privilege" listing */
}

export type PrivilegeListUseCaseArgs = z.input<typeof PrivilegeListUseCaseArgsSchema>
export type PrivilegeListUseCaseResponse = z.output<typeof PrivilegeListUseCaseArgsSchema>
export type PrivilegeListCasePerformResponseValue = { privileges: PrivilegePropSelect<{ select: typeof PrivilegePropsSelected }>[] }
export type PrivilegeListCasePerformResponse = Promise<Result<PrivilegeListCasePerformResponseValue>>

@Injectable()
export class PrivilegeListUseCase extends UseCase {
    constructor(private readonly listPrivilegeRepository: PrivilegeFindManyRepositoryAbstract) {
        super()
    }

    async perform(listArgs: PrivilegeListUseCaseArgs): PrivilegeListCasePerformResponse {
        try {
            const responsePerform = await this.performList(listArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'List Privileges', message: 'Cannot list privileges' })
        }
    }

    private async performList(listArgs: PrivilegeListUseCaseArgs): PrivilegeListCasePerformResponse {
        const listArgsValidationResult = this.validateArgsProps(listArgs)

        const listArgsDTO = listArgsValidationResult.getValue()

        const performListRepositoryResult = await this.performListRepository(listArgsDTO)

        if (!performListRepositoryResult.isSuccess()) {
            return Result.failure(performListRepositoryResult.getError(), performListRepositoryResult.getStatus())
        }

        return Result.success<PrivilegeListCasePerformResponseValue>(performListRepositoryResult.getValue(), performListRepositoryResult.getStatus())
    }

    private validateArgsProps(listArgs: PrivilegeListUseCaseArgs) {
        const privilegeListDTO = ZodValidateService.performParse(listArgs, PrivilegeListUseCaseArgsSchema)

        return privilegeListDTO
    }

    private async performListRepository(listArgs: PrivilegeListUseCaseArgs) {
        const response = await this.listPrivilegeRepository.perform({ where: listArgs, select: PrivilegePropsSelected })

        return response
    }
}
