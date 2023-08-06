import { Provider } from '@nestjs/common'
import { MailCreateManyRepositoryAbstract, MailCreateManyRepository, MailCreateRepositoryAbstract, MailCreateRepository } from '@modules/mail/repository/create.repository'
import { MailDeleteManyRepositoryAbstract, MailDeleteManyRepository, MailDeleteRepositoryAbstract, MailDeleteRepository } from '@modules/mail/repository/delete.repository'
import { MailFindExistsRepositoryAbstract, MailFindExistsRepository, MailFindFirstOrThrowRepositoryAbstract, MailFindFirstOrThrowRepository, MailFindFirstRepositoryAbstract, MailFindFirstRepository, MailFindManyRepositoryAbstract, MailFindManyRepository, MailFindUniqueOrThrowRepositoryAbstract, MailFindUniqueOrThrowRepository, MailFindUniqueRepositoryAbstract, MailFindUniqueRepository } from '@modules/mail/repository/find.repository'
import { MailModelTableRepositoryAbstract, MailModelTableRepository } from '@modules/mail/repository/repository'
import { MailUpdateManyRepositoryAbstract, MailUpdateManyRepository, MailUpdateRepositoryAbstract, MailUpdateRepository } from '@modules/mail/repository/update.repository'

export const MailDependencies: Provider[] = [
    {
        provide: MailModelTableRepositoryAbstract,
        useClass: MailModelTableRepository
    },
    {
        provide: MailCreateManyRepositoryAbstract,
        useClass: MailCreateManyRepository
    },
    {
        provide: MailCreateRepositoryAbstract,
        useClass: MailCreateRepository
    },
    {
        provide: MailUpdateManyRepositoryAbstract,
        useClass: MailUpdateManyRepository
    },
    {
        provide: MailUpdateRepositoryAbstract,
        useClass: MailUpdateRepository
    },
    {
        provide: MailDeleteManyRepositoryAbstract,
        useClass: MailDeleteManyRepository
    },
    {
        provide: MailDeleteRepositoryAbstract,
        useClass: MailDeleteRepository
    },
    {
        provide: MailFindExistsRepositoryAbstract,
        useClass: MailFindExistsRepository
    },
    {
        provide: MailFindFirstOrThrowRepositoryAbstract,
        useClass: MailFindFirstOrThrowRepository
    },
    {
        provide: MailFindFirstRepositoryAbstract,
        useClass: MailFindFirstRepository
    },
    {
        provide: MailFindManyRepositoryAbstract,
        useClass: MailFindManyRepository
    },
    {
        provide: MailFindUniqueOrThrowRepositoryAbstract,
        useClass: MailFindUniqueOrThrowRepository
    },
    {
        provide: MailFindUniqueRepositoryAbstract,
        useClass: MailFindUniqueRepository
    }
]
