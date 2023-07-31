import { Injectable } from '@nestjs/common'
import { AuthSignInUseCase, AuthSignInUseCaseArgs, AuthSignInUseCasePerformResponseValue } from '@modules/auth/use-case/sign-in.use-case'
import { AuthSignUpUseCase, AuthSignUpUseCaseArgs, AuthSignUpUseCasePerformResponseValue } from '@modules/auth/use-case/sign-up.use-case'
import { Service } from '@common/service'

@Injectable()
export class AuthService extends Service {
    constructor(private readonly signUpUC: AuthSignUpUseCase, private readonly signInUC: AuthSignInUseCase) {
        super()
    }

    async signUp(body: AuthSignUpUseCaseArgs) {
        const response = await this.signUpUC.perform({ ...body })

        return response
    }

    async signIn(body: AuthSignInUseCaseArgs) {
        const response = await this.signInUC.perform({ ...body })

        return response
    }
}
