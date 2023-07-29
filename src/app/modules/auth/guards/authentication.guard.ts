import { PrivilegeModel } from '@@types/privileges'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UnauthorizedException } from '@util/exceptions/unauthorized.exception'
import { PrivilegeCore, PrivilegeType } from '@services/privilege'
import { ValidPrivileges } from '@util/privileges'
import { AuthService } from '@modules/auth/auth.service'

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
    constructor(
        private readonly authService: AuthService
    ) {
        super()
    }

    async canActivate(context: ExecutionContext) {
        const privileges = PrivilegeCore.extractPrivilegesOfContext(context)

        console.log(context.switchToHttp().getRequest())

        if (privileges.length == 0) { return true }

        const privilegesGlobal = PrivilegeCore.filterByTypeInPrivileges(privileges, PrivilegeType.Global)

        const responsePrivilegeGlobal = ValidPrivileges(...privilegesGlobal)

        if (!responsePrivilegeGlobal) { throw new UnauthorizedException() }

        const privilegesWithoutGlobalPrivileges = PrivilegeCore.filterByNotTypeInPrivileges(privileges, PrivilegeType.Global)

        if (privilegesWithoutGlobalPrivileges.length == 0) { return true }

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

    private validPrivilegesGlobal(privilegesGlobal: PrivilegeModel[]) {

    }
}
