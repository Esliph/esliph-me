import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Service } from '@common/service'
import { AuthenticationJWT } from '@@types/auth'
import { AuthSignInUseCase, AuthSignInUseCaseArgs } from '@modules/auth/use-case/sign-in.use-case'
import { AuthSignUpUseCase, AuthSignUpUseCaseArgs } from '@modules/auth/use-case/sign-up.use-case'

@Injectable()
export class AuthService extends Service {
    constructor(private readonly jwtService: JwtService, private readonly signUpUC: AuthSignUpUseCase, private readonly signInUC: AuthSignInUseCase) {
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

    extractToken(bearerToken = '') {
        const [, token] = bearerToken.split(' ')

        return token || ''
    }

    async extractPayload(token: string) {
        const payload = this.jwtService.decode(this.extractToken(token)) as AuthenticationJWT | null

        return payload || null
    }
}
