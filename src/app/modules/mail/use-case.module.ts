import { MailDependencies } from '@modules/mail/mail.dependencies'
import { Global, Module, Provider } from '@nestjs/common'
import { MailDeleteUseCase } from '@modules/mail/use-case/delete.use-case'
import { MailListUseCase } from '@modules/mail/use-case/list.use-case'
import { MailUpdateUseCase } from '@modules/mail/use-case/update.use-case'
import { MailFindOneUseCase } from '@modules/mail/use-case/find-one.use-case'
import { MailCreateUseCase } from '@modules/mail/use-case/create.use-case'

const mailServicesUseCase: Provider[] = [
    ...MailDependencies,
    MailCreateUseCase,
    MailListUseCase,
    MailUpdateUseCase,
    MailDeleteUseCase,
    MailFindOneUseCase
]

@Global()
@Module({
    providers: [...mailServicesUseCase],
    exports: [...mailServicesUseCase]
})
export class MailUseCaseModule { }
