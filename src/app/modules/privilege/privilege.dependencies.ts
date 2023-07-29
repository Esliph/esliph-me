import { Provider } from '@nestjs/common'
import { PrivilegeModelTableRepositoryAbstract, PrivilegeModelTableRepository } from '@modules/privilege/repository/repository'
import { PrivilegeCreateManyRepositoryAbstract, PrivilegeCreateManyRepository, PrivilegeCreateRepositoryAbstract, PrivilegeCreateRepository } from '@modules/privilege/repository/create.repository'
import { PrivilegeUpdateManyRepositoryAbstract, PrivilegeUpdateManyRepository, PrivilegeUpdateRepositoryAbstract, PrivilegeUpdateRepository } from '@modules/privilege/repository/update.repository'
import { PrivilegeDeleteManyRepositoryAbstract, PrivilegeDeleteManyRepository, PrivilegeDeleteRepositoryAbstract, PrivilegeDeleteRepository } from '@modules/privilege/repository/delete.repository'
import {
    PrivilegeFindExistsRepositoryAbstract,
    PrivilegeFindExistsRepository,
    PrivilegeFindFirstOrThrowRepositoryAbstract,
    PrivilegeFindFirstOrThrowRepository,
    PrivilegeFindFirstRepositoryAbstract,
    PrivilegeFindFirstRepository,
    PrivilegeFindManyRepositoryAbstract,
    PrivilegeFindManyRepository,
    PrivilegeFindUniqueOrThrowRepositoryAbstract,
    PrivilegeFindUniqueOrThrowRepository,
    PrivilegeFindUniqueRepositoryAbstract,
    PrivilegeFindUniqueRepository
} from '@modules/privilege/repository/find.repository'

export const PrivilegeDependencies: Provider[] = [
    {
        provide: PrivilegeModelTableRepositoryAbstract,
        useClass: PrivilegeModelTableRepository
    },
    {
        provide: PrivilegeCreateManyRepositoryAbstract,
        useClass: PrivilegeCreateManyRepository
    },
    {
        provide: PrivilegeCreateRepositoryAbstract,
        useClass: PrivilegeCreateRepository
    },
    {
        provide: PrivilegeUpdateManyRepositoryAbstract,
        useClass: PrivilegeUpdateManyRepository
    },
    {
        provide: PrivilegeUpdateRepositoryAbstract,
        useClass: PrivilegeUpdateRepository
    },
    {
        provide: PrivilegeDeleteManyRepositoryAbstract,
        useClass: PrivilegeDeleteManyRepository
    },
    {
        provide: PrivilegeDeleteRepositoryAbstract,
        useClass: PrivilegeDeleteRepository
    },
    {
        provide: PrivilegeFindExistsRepositoryAbstract,
        useClass: PrivilegeFindExistsRepository
    },
    {
        provide: PrivilegeFindFirstOrThrowRepositoryAbstract,
        useClass: PrivilegeFindFirstOrThrowRepository
    },
    {
        provide: PrivilegeFindFirstRepositoryAbstract,
        useClass: PrivilegeFindFirstRepository
    },
    {
        provide: PrivilegeFindManyRepositoryAbstract,
        useClass: PrivilegeFindManyRepository
    },
    {
        provide: PrivilegeFindUniqueOrThrowRepositoryAbstract,
        useClass: PrivilegeFindUniqueOrThrowRepository
    },
    {
        provide: PrivilegeFindUniqueRepositoryAbstract,
        useClass: PrivilegeFindUniqueRepository
    }
]