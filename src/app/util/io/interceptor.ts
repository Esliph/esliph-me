import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Application } from '@core'
import { Request } from '@@types/http'

@Injectable()
export class GlobalIoInterceptor implements NestInterceptor {
    constructor() {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(res => this.performAfterHandlerRouter(context, res)))
    }

    private performAfterHandlerRouter(context: ExecutionContext, res: any) {
        const { url, method } = context.switchToHttp().getRequest<Request>()

        Application.log(`${method.toUpperCase()} ${url}`, 'IO')

        return res
    }
}
