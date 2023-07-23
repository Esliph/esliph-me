import { UnauthorizedException } from '@util/exceptions/unauthorized.exception'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from '@@types/http'

@Injectable()
export class AuthenticationGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const { headers } = context.switchToHttp().getRequest<Request>()

        const { Authentication } = headers

        if (!Authentication) { throw new UnauthorizedException() }

        const [bearer, token] = `${Authentication}`.split(' ')

        if (bearer !== 'Bearer') { throw new UnauthorizedException() }

        return true
    }
}
