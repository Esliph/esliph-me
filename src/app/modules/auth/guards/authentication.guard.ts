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
        await this.canActivePrivilege(context)
        // await this.canActiveSuper(context)

        return true
    }

    private async canActivePrivilege(context: ExecutionContext) {
        const privileges = PrivilegeOperational.extractPrivilegesOfContext(context)

        const responseValidatePrivilege = await this.privilegeService.validatePrivilege({
            id: 0,
            privileges: privileges.map(privilege => privilege.name)
        })

        if (!responseValidatePrivilege.isSuccess()) {
            throw new UnauthorizedException(responseValidatePrivilege.getError())
        }
    }

    private async canActiveSuper(context: ExecutionContext) {
        const canActivate = super.canActivate(context)

        if (typeof canActivate === 'boolean' && canActivate) {
            return
        }

        const canActivatePromise = canActivate as Promise<boolean>

        await canActivatePromise.catch(err => {
            throw new UnauthorizedException()
        })
    }
}
