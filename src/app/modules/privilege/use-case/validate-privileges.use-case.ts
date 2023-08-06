import { UnauthorizedException } from '@util/exceptions/unauthorized.exception'
import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { z } from 'zod'
import { ZodValidateService } from '@services/zod'
import { HttpStatusCodes } from '@util/http/status-code'
import { UseCase } from '@common/use-case'
import { PrivilegeAccess, PrivilegeOperational } from '@modules/privilege/operational/controller'
import { PrivilegeModel } from '@modules/privilege/schema'
import { ForbiddenException } from '@util/exceptions/forbidden.exception'

export const PrivilegeValidateUseCaseArgsSchema = ZodValidateService.defaultSchemaModelTable().extend({
    privileges: z.array(z.string()).default([])
})

export type PrivilegeValidateUseCaseArgs = z.input<typeof PrivilegeValidateUseCaseArgsSchema>
export type PrivilegeValidateUseCaseResponse = z.output<typeof PrivilegeValidateUseCaseArgsSchema>
export type PrivilegeValidateUseCasePerformResponseValue = { success: string }
export type PrivilegeValidateUseCasePerformResponse = Promise<Result<PrivilegeValidateUseCasePerformResponseValue>>

@Injectable()
export class PrivilegeValidateUseCase extends UseCase {
    constructor() {
        super()
    }

    async perform(validateArgs: PrivilegeValidateUseCaseArgs): PrivilegeValidateUseCasePerformResponse {
        try {
            const responsePerform = await this.performValidate(validateArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'Validate Privileges', message: 'Cannot validate privileges' })
        }
    }

    private async performValidate(validateArgs: PrivilegeValidateUseCaseArgs): PrivilegeValidateUseCasePerformResponse {
        const validateArgsValidationResult = this.validateArgsProps(validateArgs)

        const validatePrivilegeData = validateArgsValidationResult.getValue()

        const allPrivilegesForValid = PrivilegeOperational.getPrivilegesByName(validatePrivilegeData.privileges)

        if (allPrivilegesForValid.length == 0) {
            return Result.success({ success: 'Privilege validate successfully' }, HttpStatusCodes.OK)
        }

        this.validPrivilegesGlobal(PrivilegeOperational.filterByTypeInPrivileges(allPrivilegesForValid, PrivilegeAccess.Global))
        this.validPrivilegesUser(validatePrivilegeData.id, PrivilegeOperational.filterByTypeInPrivileges(allPrivilegesForValid, PrivilegeAccess.User))
        this.validPrivilegesRoot(validatePrivilegeData.id, PrivilegeOperational.filterByTypeInPrivileges(allPrivilegesForValid, PrivilegeAccess.Root))

        return Result.success({ success: 'Privilege validate successfully' }, HttpStatusCodes.OK)
    }

    private validateArgsProps(validateArgs: PrivilegeValidateUseCaseArgs) {
        const privilegeValidateDTO = ZodValidateService.performParse(validateArgs, PrivilegeValidateUseCaseArgsSchema)

        return privilegeValidateDTO
    }

    private validPrivilegesGlobal(privileges: PrivilegeModel[]) {
        for (const privilege of privileges) {
            if (!VALID_GLOBAL_PRIVILEGES[privilege.name]) {
                continue
            }

            if (!VALID_GLOBAL_PRIVILEGES[privilege.name]()) {
                throw new ForbiddenException()
            }
        }
    }

    private validPrivilegesUser(id: number, privileges: PrivilegeModel[]) {
        throw new UnauthorizedException()
    }

    private validPrivilegesRoot(id: number, privileges: PrivilegeModel[]) { }
}

const VALID_GLOBAL_PRIVILEGES = {
    'public': () => true,
    'ignore': () => false,
    'private': () => false
}
