import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UnauthorizedException } from '@util/exceptions/unauthorized.exception'
import { PrivilegeCore } from '@services/privilege'
import { ValidPrivileges } from '@util/privileges'
import { AuthService } from '@modules/auth/auth.service'

@Injectable()
export class AuthenticateGuard extends AuthGuard('jwt') {
    constructor(
        private readonly authService: AuthService
    ) {
        super()
    }

    async canActivate(context: ExecutionContext) {
        const privileges = PrivilegeCore.getPrivileges(context)

        const responsePrivilegeGlobal = ValidPrivileges(...privileges)

        if (responsePrivilegeGlobal) { return true }

        const responsePrivilegeUser = await this.authService.validatePrivilege({
            id: 0, privileges
        })

        if (!responsePrivilegeUser.isSuccess()) { throw new UnauthorizedException() }

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
