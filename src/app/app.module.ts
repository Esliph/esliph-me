import { MiddlewareConsumer, Module, NestModule, Provider, ValidationPipe } from '@nestjs/common'
import { APP_PIPE, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core'
import { GlobalHttpInterceptor } from '@util/http/interceptor'
import { AppController } from '@app.controller'
import { AppService } from '@app.service'
import { ErrorModule } from '@modules/error/error.module'
import { AuthModule } from '@modules/auth/auth.module'
import { UserModule } from '@modules/user/user.modules'
import { AuthenticationGuard } from '@modules/auth/guards/authentication.guard'
import { PrivilegeModule } from '@modules/privilege/privilege.module'
import { MailModule } from '@modules/mail/mail.module'
import { GlobalIoInterceptor } from '@util/io/interceptor'

const AppModuleServices: Provider[] = []

const AppModuleDependencies: Provider[] = [
    {
        provide: APP_PIPE,
        useClass: ValidationPipe
    },
    {
        provide: APP_INTERCEPTOR,
        useClass: GlobalHttpInterceptor,
    },
    {
        provide: APP_INTERCEPTOR,
        useClass: GlobalIoInterceptor
    },
    {
        provide: APP_GUARD,
        useClass: AuthenticationGuard
    }
]

@Module({
    imports: [UserModule, AuthModule, PrivilegeModule, ErrorModule, MailModule],
    controllers: [AppController],
    providers: [AppService, ...AppModuleDependencies, ...AppModuleServices],
    exports: [...AppModuleServices]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {}
}
