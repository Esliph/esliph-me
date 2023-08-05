import { ErrorDependencies } from '@modules/error/error.dependencies'
import { Global, Module, Provider } from '@nestjs/common'
import { ErrorDeleteUseCase } from '@modules/error/use-case/delete.use-case'
import { ErrorListUseCase } from '@modules/error/use-case/list.use-case'
import { ErrorUpdateUseCase } from '@modules/error/use-case/update.use-case'
import { ErrorFindOneUseCase } from '@modules/error/use-case/find-one.use-case'
import { ErrorCreateUseCase } from '@modules/error/use-case/create.use-case'

const errorServicesUseCase: Provider[] = [
    ...ErrorDependencies,
        ErrorCreateUseCase,
        ErrorListUseCase,
        ErrorUpdateUseCase,
        ErrorDeleteUseCase,
        ErrorFindOneUseCase
]

@Global()
@Module({
    providers: [...errorServicesUseCase],
    exports: [...errorServicesUseCase]
})
export class ErrorUseCaseModule { }