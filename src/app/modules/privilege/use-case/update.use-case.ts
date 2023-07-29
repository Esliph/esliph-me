import { Injectable } from '@nestjs/common'
import { HttpEsliph, Result } from '@esliph/util-node'
import { z } from 'zod'
import { IsOptional } from 'class-validator'
import { ZodValidateService } from '@services/zod'
import { ResultException } from '@util/exceptions/result.exception'
import { PrivilegeEntityTable } from '@modules/privilege/schema'
import { PrivilegePropSelect } from '@modules/privilege/repository/repository'
import { PrivilegeUpdateRepositoryAbstract } from '@modules/privilege/repository/update.repository'
import { PrivilegeFindUniqueRepositoryAbstract } from '@modules/privilege/repository/find.repository'

export class PrivilegeUpdateUseCaseDTO {
    /* Set the DTO properties to update the "Privilege" */
}

export const PrivilegeUpdateUseCaseArgsSchema = ZodValidateService.defaultSchemaModelTable().extend({
    /* Define the properties and their validations to update the "Privilege" */
})

export type PrivilegeUpdateUseCaseArgs = z.input<typeof PrivilegeUpdateUseCaseArgsSchema>
export type PrivilegeUpdateUseCaseResponse = z.output<typeof PrivilegeUpdateUseCaseArgsSchema>
export type PrivilegeUpdateUseCasePerformResponseValue = { success: string }
export type PrivilegeUpdateUseCasePerformResponse = Promise<Result<PrivilegeUpdateUseCasePerformResponseValue>>

@Injectable()
export class PrivilegeUpdateUseCase {
    constructor(private readonly updatePrivilegeRepository: PrivilegeUpdateRepositoryAbstract, private readonly findPrivilegeRepository: PrivilegeFindUniqueRepositoryAbstract) { }

    async perform(updateArgs: PrivilegeUpdateUseCaseArgs): PrivilegeUpdateUseCasePerformResponse {
        try {
            const responsePerform = await this.performUpdate(updateArgs)

            return responsePerform
        } catch (err: any) {
            if (err instanceof ResultException) {
                return err
            }
            return Result.failure({ title: 'Update Privilege', message: [{ message: 'Cannot update privilege' }] }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    private async performUpdate(updateArgs: PrivilegeUpdateUseCaseArgs): PrivilegeUpdateUseCasePerformResponse {
        const updateArgsValidationResult = this.validateArgsProps(updateArgs)

        const updatePrivilegeData = updateArgsValidationResult.getValue()

        const findPrivilegeToBeUpdatedResult = await this.findPrivilegeToBeUpdated({ id: updatePrivilegeData.id })

        const privilegeToBeUpdated = findPrivilegeToBeUpdatedResult.getValue().privilege

        const privilegeEntityTable = new PrivilegeEntityTable(privilegeToBeUpdated)

        const performUpdateRepositoryResult = await this.performUpdateRepository(privilegeEntityTable)

        if (!performUpdateRepositoryResult.isSuccess()) {
            return Result.failure(performUpdateRepositoryResult.getError(), performUpdateRepositoryResult.getStatus())
        }

        return Result.success({ success: 'Privilege update successfully' }, HttpEsliph.HttpStatusCodes.OK)
    }

    private async findPrivilegeToBeUpdated(args: { id: number }) {
        const response = await this.findPrivilegeRepository.perform({ where: { id: args.id } })

        return response
    }

    private validateArgsProps(updateArgs: PrivilegeUpdateUseCaseArgs) {
        const privilegeUpdateDTO = ZodValidateService.performParse(updateArgs, PrivilegeUpdateUseCaseArgsSchema)

        return privilegeUpdateDTO
    }

    private async performUpdateRepository(privilegeData: PrivilegeEntityTable) {
        const response = await this.updatePrivilegeRepository.perform({
            where: { id: privilegeData.id },
            data: { ...privilegeData }
        })

        return response
    }
}
