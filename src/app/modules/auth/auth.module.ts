import { CONFIG_JWT_MODULE } from '@config/jwt'
import { Module, Provider } from '@nestjs/common'
import { AuthDependencies } from '@modules/auth/auth.dependencies'
import { AuthUseCaseModule } from '@modules/auth/use-case.module'
import { AuthController } from '@modules/auth/auth.controller'
import { AuthService } from '@modules/auth/auth.service'
import { JwtStrategy } from '@modules/auth/strategies/jwt-auth.strategy'
import { JwtModule } from '@nestjs/jwt'

const authModuleServices: Provider[] = [AuthService]

@Module({
    imports: [
        AuthUseCaseModule,
        JwtModule.register({
            secret: CONFIG_JWT_MODULE.secret,
            signOptions: { expiresIn: '5d' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        JwtStrategy,
        ...AuthDependencies,
        ...authModuleServices
    ],
    exports: [
        ...AuthDependencies,
        ...authModuleServices
    ]
})
export class AuthModule { }
