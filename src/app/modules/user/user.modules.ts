import { Global, MiddlewareConsumer, Module, NestModule, Provider } from '@nestjs/common'
import { UserController } from '@modules/user/user.controller'
import { UserUseCaseModule } from '@modules/user/use-case.module'
import { UserService } from '@modules/user/user.service'
import { UserGateway } from '@modules/user/user.gateway'

const UserModuleServices: Provider[] = [UserGateway, UserService]

@Global()
@Module({
    imports: [UserUseCaseModule],
    controllers: [UserController],
    providers: [...UserModuleServices],
    exports: [...UserModuleServices]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
}
