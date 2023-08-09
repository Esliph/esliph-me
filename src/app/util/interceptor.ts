import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Application } from '@core'

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
    constructor() {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(res => this.performAfterHandlerRouter(context, res)))
    }

    private performAfterHandlerRouter(context: ExecutionContext, res: any) {
        const { url, method } = context.getArgs()[0]

        Application.log(`${method.toUpperCase()} ${url}`, 'HTTPRquest')

        return res
    }
}
