import { Injectable } from '@nestjs/common'
import { HttpEsliph, Result } from '@esliph/util-node'
import { z } from 'zod'
import { IsNotEmpty } from 'class-validator'
import { ZodValidateService } from '@services/zod'
import { ResultException } from '@util/exceptions/result.exception'
import { PrivilegeEntitySimple } from '@modules/privilege/schema'
import { PrivilegeCreateRepositoryAbstract } from '@modules/privilege/repository/create.repository'

export class PrivilegeCreateUseCaseDTO {
    /* Set the DTO properties to delete "Privilege" */
}

export const PrivilegeCreateUseCaseArgsSchema = z.object({
    /* Define the properties and their validations to create the "Privilege" */
})

export type PrivilegeCreateUseCaseArgs = z.input<typeof PrivilegeCreateUseCaseArgsSchema>
export type PrivilegeCreateUseCaseResponse = z.output<typeof PrivilegeCreateUseCaseArgsSchema>
export type PrivilegeCreateUseCasePerformResponseValue = { success: string }
export type PrivilegeCreateUseCasePerformResponse = Promise<Result<PrivilegeCreateUseCasePerformResponseValue>>

@Injectable()
export class PrivilegeCreateUseCase {
    constructor(private readonly createPrivilegeRepository: PrivilegeCreateRepositoryAbstract) { }

    async perform(createArgs: PrivilegeCreateUseCaseArgs): PrivilegeCreateUseCasePerformResponse {
        try {
            const responsePerform = await this.performCreate(createArgs)

            return responsePerform
        } catch (err: any) {
            if (err instanceof ResultException) {
                return err
            }

            return Result.failure({ title: 'Create Privilege', message: [{ message: 'Cannot create privilege' }] }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    private async performCreate(createArgs: PrivilegeCreateUseCaseArgs): PrivilegeCreateUseCasePerformResponse {
        const createArgsValidationResult = this.validateArgsProps(createArgs)

        const createPrivilegeArgsValidated = createArgsValidationResult.getValue()

        const privilegeEntityTable = new PrivilegeEntitySimple(createPrivilegeArgsValidated)

        const performCreatePrivilegeRepositoryResult = await this.performCreatePrivilegeRepository(privilegeEntityTable)

        if (!performCreatePrivilegeRepositoryResult.isSuccess()) {
            return Result.failure(performCreatePrivilegeRepositoryResult.getError(), performCreatePrivilegeRepositoryResult.getStatus())
        }

        return Result.success({ success: 'Privilege create successfully' }, HttpEsliph.HttpStatusCodes.CREATED)
    }

    private validateArgsProps(createArgs: PrivilegeCreateUseCaseArgs) {
        const PrivilegeCreateDTO = ZodValidateService.performParse(createArgs, PrivilegeCreateUseCaseArgsSchema)

        return PrivilegeCreateDTO
    }

    private async performCreatePrivilegeRepository(privilegeData: PrivilegeEntitySimple) {
        const response = await this.createPrivilegeRepository.perform({ data: privilegeData })

        return response
    }
}