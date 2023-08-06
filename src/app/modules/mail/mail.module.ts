import { Global, MiddlewareConsumer, Module, NestModule, Provider } from '@nestjs/common'
import { MailController } from '@modules/mail/mail.controller'
import { MailUseCaseModule } from '@modules/mail/use-case.module'
import { MailService } from '@modules/mail/mail.service'

const MailModuleServices: Provider[] = [MailService]

@Global()
@Module({
    imports: [
        MailUseCaseModule
    ],
    controllers: [
        MailController
    ],
    providers: [
        ...MailModuleServices,
    ],
    exports: [
        ...MailModuleServices
    ]
})
export class MailModule implements NestModule {
    configure(consumer: MiddlewareConsumer) { }
}
