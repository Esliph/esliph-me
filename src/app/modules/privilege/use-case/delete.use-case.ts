import { Injectable } from '@nestjs/common'
import { HttpEsliph, Result } from '@esliph/util-node'
import { z } from 'zod'
import { ZodValidateService } from '@services/zod'
import { ResultException } from '@util/exceptions/result.exception'
import { PrivilegeDeleteRepositoryAbstract } from '@modules/privilege/repository/delete.repository'

export class PrivilegeDeleteUseCaseDTO {
    /* Set the DTO properties to delete "Privilege" */
}

export const PrivilegeDeleteUseCaseArgsSchema = ZodValidateService.defaultSchemaModelTable()

export type PrivilegeDeleteUseCaseArgs = z.input<typeof PrivilegeDeleteUseCaseArgsSchema>
export type PrivilegeDeleteUseCaseResponse = z.output<typeof PrivilegeDeleteUseCaseArgsSchema>
export type PrivilegeDeleteUseCasePerformResponseValue = boolean
export type PrivilegeDeleteUseCasePerformResponse = Promise<Result<PrivilegeDeleteUseCasePerformResponseValue>>

@Injectable()
export class PrivilegeDeleteUseCase {
    constructor(private readonly deletePrivilegeRepository: PrivilegeDeleteRepositoryAbstract) { }

    async perform(deleteArgs: PrivilegeDeleteUseCaseArgs): PrivilegeDeleteUseCasePerformResponse {
        try {
            const responsePerform = await this.performDelete(deleteArgs)

            return responsePerform
        } catch (err: any) {
            if (err instanceof ResultException) {
                return err
            }
            return Result.failure({ title: 'Delete Privilege', message: [{ message: 'Cannot delete privilege' }] }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    private async performDelete(deleteArgs: PrivilegeDeleteUseCaseArgs): PrivilegeDeleteUseCasePerformResponse {
        const deleteArgsValidationResult = this.validateArgsProps(deleteArgs)

        const deleteArgsDTO = deleteArgsValidationResult.getValue()

        const performDeletePrivilegeRepositoryResult = await this.performDeletePrivilegeRepository(deleteArgsDTO)

        if (!performDeletePrivilegeRepositoryResult.isSuccess()) {
            return Result.failure(performDeletePrivilegeRepositoryResult.getError(), performDeletePrivilegeRepositoryResult.getStatus())
        }

        return performDeletePrivilegeRepositoryResult
    }

    private validateArgsProps(deleteArgs: PrivilegeDeleteUseCaseArgs) {
        const privilegeListDTO = ZodValidateService.performParse(deleteArgs, PrivilegeDeleteUseCaseArgsSchema)

        return privilegeListDTO
    }

    private async performDeletePrivilegeRepository(deleteArgs: PrivilegeDeleteUseCaseResponse) {
        const response = await this.deletePrivilegeRepository.perform({ where: { id: deleteArgs.id } })

        return response
    }
}