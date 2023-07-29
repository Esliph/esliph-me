import { Global, MiddlewareConsumer, Module, NestModule, Provider } from '@nestjs/common'
import { PrivilegeController } from '@modules/privilege/privilege.controller'
import { PrivilegeUseCaseModule } from '@modules/privilege/use-case.module'
import { PrivilegeService } from '@modules/privilege/privilege.service'

const PrivilegeModuleServices: Provider[] = [PrivilegeService]

@Global()
@Module({
    imports: [
        PrivilegeUseCaseModule
    ],
    controllers: [
        PrivilegeController
    ],
    providers: [
        ...PrivilegeModuleServices,
    ],
    exports: [
        ...PrivilegeModuleServices
    ]
})
export class PrivilegeModule implements NestModule {
    configure(consumer: MiddlewareConsumer) { }
}
