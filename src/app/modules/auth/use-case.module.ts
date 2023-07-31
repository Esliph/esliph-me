import { Module, Provider } from '@nestjs/common'
import { AuthSignInUseCase } from '@modules/auth/use-case/sign-in.use-case'
import { AuthSignUpUseCase } from '@modules/auth/use-case/sign-up.use-case'

const authServicesUseCase: Provider[] = [AuthSignUpUseCase, AuthSignInUseCase]

@Module({
    providers: [...authServicesUseCase],
    exports: [...authServicesUseCase]
})
export class AuthUseCaseModule {}
