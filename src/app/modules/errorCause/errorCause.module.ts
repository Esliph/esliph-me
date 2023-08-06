import { Global, MiddlewareConsumer, Module, NestModule, Provider } from '@nestjs/common'
import { ErrorCauseController } from '@modules/errorCause/errorCause.controller'
import { ErrorCauseUseCaseModule } from '@modules/errorCause/use-case.module'
import { ErrorCauseService } from '@modules/errorCause/errorCause.service'

const ErrorCauseModuleServices: Provider[] = [ErrorCauseService]

@Global()
@Module({
    imports: [
        ErrorCauseUseCaseModule
    ],
    controllers: [
        ErrorCauseController
    ],
    providers: [
        ...ErrorCauseModuleServices,
    ],
    exports: [
        ...ErrorCauseModuleServices
    ]
})
export class ErrorCauseModule implements NestModule {
    configure(consumer: MiddlewareConsumer) { }
}
