import { PrivilegeValidateUseCase } from '@modules/privilege/use-case/validate-privileges.use-case'
import { PrivilegeDependencies } from '@modules/privilege/privilege.dependencies'
import { Module, Provider } from '@nestjs/common'
import { PrivilegeDeleteUseCase } from '@modules/privilege/use-case/delete.use-case'
import { PrivilegeListUseCase } from '@modules/privilege/use-case/list.use-case'
import { PrivilegeUpdateUseCase } from '@modules/privilege/use-case/update.use-case'
import { PrivilegeFindOneUseCase } from '@modules/privilege/use-case/find-one.use-case'
import { PrivilegeCreateUseCase } from '@modules/privilege/use-case/create.use-case'

const privilegeServicesUseCase: Provider[] = [
    ...PrivilegeDependencies,
    PrivilegeCreateUseCase,
    PrivilegeListUseCase,
    PrivilegeUpdateUseCase,
    PrivilegeDeleteUseCase,
    PrivilegeFindOneUseCase,
    PrivilegeValidateUseCase
]

@Module({
    providers: [...privilegeServicesUseCase],
    exports: [...privilegeServicesUseCase]
})
export class PrivilegeUseCaseModule { }
