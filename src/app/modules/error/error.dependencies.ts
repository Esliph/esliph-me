import { Provider } from '@nestjs/common'
import { ErrorCreateManyRepositoryAbstract, ErrorCreateManyRepository, ErrorCreateRepositoryAbstract, ErrorCreateRepository } from '@modules/error/repository/create.repository'
import { ErrorDeleteManyRepositoryAbstract, ErrorDeleteManyRepository, ErrorDeleteRepositoryAbstract, ErrorDeleteRepository } from '@modules/error/repository/delete.repository'
import { ErrorFindExistsRepositoryAbstract, ErrorFindExistsRepository, ErrorFindFirstOrThrowRepositoryAbstract, ErrorFindFirstOrThrowRepository, ErrorFindFirstRepositoryAbstract, ErrorFindFirstRepository, ErrorFindManyRepositoryAbstract, ErrorFindManyRepository, ErrorFindUniqueOrThrowRepositoryAbstract, ErrorFindUniqueOrThrowRepository, ErrorFindUniqueRepositoryAbstract, ErrorFindUniqueRepository } from '@modules/error/repository/find.repository'
import { ErrorModelTableRepositoryAbstract, ErrorModelTableRepository } from '@modules/error/repository/repository'
import { ErrorUpdateManyRepositoryAbstract, ErrorUpdateManyRepository, ErrorUpdateRepositoryAbstract, ErrorUpdateRepository } from '@modules/error/repository/update.repository'

export const ErrorDependencies: Provider[] = [
    {
        provide: ErrorModelTableRepositoryAbstract,
        useClass: ErrorModelTableRepository
    },
    {
        provide: ErrorCreateManyRepositoryAbstract,
        useClass: ErrorCreateManyRepository
    },
    {
        provide: ErrorCreateRepositoryAbstract,
        useClass: ErrorCreateRepository
    },
    {
        provide: ErrorUpdateManyRepositoryAbstract,
        useClass: ErrorUpdateManyRepository
    },
    {
        provide: ErrorUpdateRepositoryAbstract,
        useClass: ErrorUpdateRepository
    },
    {
        provide: ErrorDeleteManyRepositoryAbstract,
        useClass: ErrorDeleteManyRepository
    },
    {
        provide: ErrorDeleteRepositoryAbstract,
        useClass: ErrorDeleteRepository
    },
    {
        provide: ErrorFindExistsRepositoryAbstract,
        useClass: ErrorFindExistsRepository
    },
    {
        provide: ErrorFindFirstOrThrowRepositoryAbstract,
        useClass: ErrorFindFirstOrThrowRepository
    },
    {
        provide: ErrorFindFirstRepositoryAbstract,
        useClass: ErrorFindFirstRepository
    },
    {
        provide: ErrorFindManyRepositoryAbstract,
        useClass: ErrorFindManyRepository
    },
    {
        provide: ErrorFindUniqueOrThrowRepositoryAbstract,
        useClass: ErrorFindUniqueOrThrowRepository
    },
    {
        provide: ErrorFindUniqueRepositoryAbstract,
        useClass: ErrorFindUniqueRepository
    }
]
