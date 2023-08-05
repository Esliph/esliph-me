import { MiddlewareConsumer, Module, NestModule, Provider } from '@nestjs/common'
import { ErrorController } from '@modules/error/error.controller'
import { ErrorUseCaseModule } from '@modules/error/use-case.module'
import { ErrorService } from '@modules/error/error.service'

const ErrorModuleServices: Provider[] = [ErrorService]

@Module({
    imports: [
        ErrorUseCaseModule
    ],
    controllers: [
        ErrorController
    ],
    providers: [
        ...ErrorModuleServices,
    ],
    exports: [
        ...ErrorModuleServices
    ]
})
export class ErrorModule implements NestModule {
    configure(consumer: MiddlewareConsumer) { }
}