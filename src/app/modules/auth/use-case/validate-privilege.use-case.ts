import { PrivilegeModel } from '@@types/privileges'
import { Result } from '@esliph/util-node'
import { Injectable } from '@nestjs/common'

export type AuthValidatePrivilegeUseCaseArgs = {
    id: number, privileges: PrivilegeModel[]
}

const privilegesInUser: { [x: number]: string[] } = {
    1: ['$root']
}

@Injectable()
export class AuthValidatePrivilegeUseCase {
    constructor() { }

    async perform(args: AuthValidatePrivilegeUseCaseArgs) {
        const allPrivilegies = privilegesInUser[args.id]

        const validPrivileges = args.privileges.some(privilegeRequest => !allPrivilegies.find(privilege => privilegeRequest.name == privilege))

        if (validPrivileges) {
            return Result.failure({ title: 'Validate Privileges', message: [] })
        }

        return Result.success(false)
    }
}
