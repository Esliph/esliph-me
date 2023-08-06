import { ErrorDependencies } from '@modules/error/error.dependencies'
import { Global, Module, Provider } from '@nestjs/common'
import { ErrorListUseCase } from '@modules/error/use-case/list.use-case'
import { ErrorFindOneUseCase } from '@modules/error/use-case/find-one.use-case'
import { ErrorCreateUseCase } from '@modules/error/use-case/create.use-case'

const errorServicesUseCase: Provider[] = [
    ...ErrorDependencies,
    ErrorCreateUseCase,
    ErrorListUseCase,
    ErrorFindOneUseCase
]

@Global()
@Module({
    providers: [...errorServicesUseCase],
    exports: [...errorServicesUseCase]
})
export class ErrorUseCaseModule { }
