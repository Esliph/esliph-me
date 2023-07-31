import { PrivilegeOperational } from '@modules/privilege/operational/controller'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UnauthorizedException } from '@util/exceptions/unauthorized.exception'
import { PrivilegeService } from '@modules/privilege/privilege.service'

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
    constructor(private readonly privilegeService: PrivilegeService) {
        super()
    }

    async canActivate(context: ExecutionContext) {
        const privileges = PrivilegeOperational.extractPrivilegesOfContext(context)

        const responseValidatePrivilege = await this.privilegeService.validatePrivilege({
            id: 0,
            privileges: privileges.map(privilege => privilege.name)
        })

        if (!responseValidatePrivilege.isSuccess()) {
            throw new UnauthorizedException(responseValidatePrivilege.getError())
        }

        const canActivate = super.canActivate(context)

        if (typeof canActivate === 'boolean') {
            return canActivate
        }

        const canActivatePromise = canActivate as Promise<boolean>

        return canActivatePromise.catch(err => {
            console.log(err)
            throw new UnauthorizedException()
        })
    }
}
