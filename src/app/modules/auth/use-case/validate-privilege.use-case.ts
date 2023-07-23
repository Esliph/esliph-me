import { Result } from '@esliph/util-node'
import { Injectable } from '@nestjs/common'

export type AuthValidatePrivilegeUseCaseArgs = {
    id: number, privileges: string[]
}

@Injectable()
export class AuthValidatePrivilegeUseCase {
    constructor() { }

    async perform(args: AuthValidatePrivilegeUseCaseArgs) {
        return Result.success(false)
    }
}
