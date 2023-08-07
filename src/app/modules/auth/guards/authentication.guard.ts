import { ErrorType } from '@modules/error/schema'
import { Application } from '@core'
import { PrivilegeManage } from '@modules/privilege/privilege.manage'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UnauthorizedException } from '@util/exceptions/unauthorized.exception'
import { AuthenticationJWT } from '@@types/auth'
import { PrivilegeService } from '@modules/privilege/privilege.service'
import { AuthService } from '@modules/auth/auth.service'
import { Result } from '@esliph/util-node'

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
    constructor(private readonly authService: AuthService, private readonly privilegeService: PrivilegeService) {
        super()
    }

    async canActivate(context: ExecutionContext) {
        try {
            const request = context.switchToHttp().getRequest()

            const user = await this.authService.extractPayload(request.headers?.authorization)

            await this.canActivePrivilege(context, user)
            await this.canActiveSuper(context)

            return true
        } catch (err) {
            if (err instanceof UnauthorizedException) {
                const result = err.getResponse()

                if (result instanceof Result) {
                    Application.emit('error', {
                        message: result.getError().message,
                        title: result.getError().title,
                        type: ErrorType.HttpRequest,
                        causes: result.getError().causes,
                        description: result.getError().description,
                        stack: err.stack
                    })
                }
            }

            throw err
        }
    }

    private async canActivePrivilege(context: ExecutionContext, user: AuthenticationJWT | null) {
        const privileges = PrivilegeManage.extractPrivilegesOfContext(context)

        const responseValidatePrivilege = await this.privilegeService.validatePrivilege({
            id: user?.sub || '',
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
