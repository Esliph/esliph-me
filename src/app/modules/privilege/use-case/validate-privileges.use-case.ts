import { Injectable } from '@nestjs/common'
import { HttpEsliph, Result } from '@esliph/util-node'
import { z } from 'zod'
import { ZodValidateService } from '@services/zod'
import { PrivilegeAccess, PrivilegeOperational } from '@modules/privilege/operational/controller'
import { ResultException } from '@util/exceptions/result.exception'
import { PrivilegeModel } from '@@types/privileges'
import { ForbiddenException } from '@util/exceptions/forbidden.exception'

export const PrivilegeValidateUseCaseArgsSchema = ZodValidateService.defaultSchemaModelTable().extend({
    privileges: z.array(z.string()).default([])
})

export type PrivilegeValidateUseCaseArgs = z.input<typeof PrivilegeValidateUseCaseArgsSchema>
export type PrivilegeValidateUseCaseResponse = z.output<typeof PrivilegeValidateUseCaseArgsSchema>
export type PrivilegeValidateUseCasePerformResponseValue = { success: string }
export type PrivilegeValidateUseCasePerformResponse = Promise<Result<PrivilegeValidateUseCasePerformResponseValue>>

@Injectable()
export class PrivilegeValidateUseCase {
    constructor() { }

    async perform(validateArgs: PrivilegeValidateUseCaseArgs): PrivilegeValidateUseCasePerformResponse {
        try {
            const responsePerform = await this.performValidate(validateArgs)

            return responsePerform
        } catch (err: any) {
            if (err instanceof ResultException) {
                return err
            }

            return Result.failure({ title: 'Validate Privileges', message: [{ message: 'Cannot validate privileges' }] }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    private async performValidate(validateArgs: PrivilegeValidateUseCaseArgs): PrivilegeValidateUseCasePerformResponse {
        const validateArgsValidationResult = this.validateArgsProps(validateArgs)

        const validatePrivilegeData = validateArgsValidationResult.getValue()

        const allPrivilegesForValid = PrivilegeOperational.getPrivilegesByName(validatePrivilegeData.privileges)

        if (allPrivilegesForValid.length == 0) {
            return Result.success({ success: 'Privilege validate successfully' }, HttpEsliph.HttpStatusCodes.OK)
        }

        this.validPrivilegesGlobal(PrivilegeOperational.filterByTypeInPrivileges(allPrivilegesForValid, PrivilegeAccess.Global))
        this.validPrivilegesUser(validatePrivilegeData.id, PrivilegeOperational.filterByTypeInPrivileges(allPrivilegesForValid, PrivilegeAccess.User))
        this.validPrivilegesRoot(validatePrivilegeData.id, PrivilegeOperational.filterByTypeInPrivileges(allPrivilegesForValid, PrivilegeAccess.Root))

        return Result.success({ success: 'Privilege validate successfully' }, HttpEsliph.HttpStatusCodes.OK)
    }

    private validateArgsProps(validateArgs: PrivilegeValidateUseCaseArgs) {
        const privilegeValidateDTO = ZodValidateService.performParse(validateArgs, PrivilegeValidateUseCaseArgsSchema)

        return privilegeValidateDTO
    }

    private validPrivilegesGlobal(privileges: PrivilegeModel[]) {
        for (const privilege of privileges) {
            if (!VALID_GLOBAL_PRIVILEGES[privilege.name]) { continue }

            if (!VALID_GLOBAL_PRIVILEGES[privilege.name]()) {
                throw new ForbiddenException()
            }
        }
    }

    private validPrivilegesUser(id: number, privileges: PrivilegeModel[]) {
        throw new ForbiddenException()
    }

    private validPrivilegesRoot(id: number, privileges: PrivilegeModel[]) {

    }
}

const VALID_GLOBAL_PRIVILEGES = {
    'public': () => true,
    'ignore': () => false,
    'private': () => false,
}
