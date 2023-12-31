import { Global, Module, Provider } from '@nestjs/common'

const errorCauseServicesUseCase: Provider[] = []

@Global()
@Module({
    providers: [...errorCauseServicesUseCase],
    exports: [...errorCauseServicesUseCase]
})
export class ErrorCauseUseCaseModule { }
