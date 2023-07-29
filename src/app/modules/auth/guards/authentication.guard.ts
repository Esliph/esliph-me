import { RequestAuthenticate } from '@@types/http'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UnauthorizedException } from '@util/exceptions/unauthorized.exception'
import { PrivilegeCore } from '@services/privilege'
import { ValidPrivileges, removeGlobalPrivileges } from '@util/privileges'
import { AuthService } from '@modules/auth/auth.service'

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
    constructor(
        private readonly authService: AuthService
    ) {
        super()
    }

    async canActivate(context: ExecutionContext) {
        const privileges = PrivilegeCore.getPrivilegesFiltered(context)

        if (privileges.length == 0) { return true }

        const responsePrivilegeGlobal = ValidPrivileges(...privileges)

        if (!responsePrivilegeGlobal) { throw new UnauthorizedException() }

        const privilegesWithoutGlobalPrivileges = this.getPrivilegesWithoutGlobalPrivileges(privileges)

        if (privilegesWithoutGlobalPrivileges.length == 0) { return true }

        const responsePrivilegeUser = await this.authService.validatePrivilege({ id: 1, privileges: privilegesWithoutGlobalPrivileges })

        if (!responsePrivilegeUser.isSuccess()) { throw new UnauthorizedException(responsePrivilegeUser.getError()) }

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

    private getPrivilegesWithoutGlobalPrivileges(privileges: string[]) {
        return removeGlobalPrivileges(privileges)
    }
}
