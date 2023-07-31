import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { z } from 'zod'
import { ZodValidateService } from '@services/zod'
import { UseCase } from '@common/use-case'
import { PrivilegeEntitySimple } from '@modules/privilege/schema'
import { HttpStatusCodes } from '@util/http/status-code'
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
export class PrivilegeCreateUseCase extends UseCase {
    constructor(private readonly createPrivilegeRepository: PrivilegeCreateRepositoryAbstract) {
        super()
    }

    async perform(createArgs: PrivilegeCreateUseCaseArgs): PrivilegeCreateUseCasePerformResponse {
        try {
            const responsePerform = await this.performCreate(createArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'Create Privilege', message: 'Cannot create privilege' })
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

        return Result.success({ success: 'Privilege create successfully' }, HttpStatusCodes.CREATED)
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
