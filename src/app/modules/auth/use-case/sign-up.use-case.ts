import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { z } from 'zod'
import { ZodValidateService } from '@services/zod'
import { UserEntitySimple } from '@modules/user/schema'
import { IsNotEmpty } from 'class-validator'
import { UserCreateRepositoryAbstract } from '@modules/user/repository/create.repository'
import { ENUM_USER_MESSAGES } from '@modules/user/user.messages'
import { USER_REGEX } from '@modules/user/user.regex'
import { HttpStatusCodes } from '@util/http/status-code'
import { UseCase } from '@common/use-case'

export class AuthSignUpUseCaseDTO {
    @IsNotEmpty({ message: ENUM_USER_MESSAGES.USERNAME_IS_EMPTY })
    username: string
    @IsNotEmpty({ message: ENUM_USER_MESSAGES.NAME_IS_EMPTY })
    name: string
    @IsNotEmpty({ message: ENUM_USER_MESSAGES.EMAIL_IS_EMPTY })
    email: string
    @IsNotEmpty({ message: ENUM_USER_MESSAGES.PASSWORD_IS_EMPTY })
    password: string
}

export const AuthSignUpUseCaseArgsSchema = z.object({
    username: z
        .string()
        .trim()
        .nonempty({ message: ENUM_USER_MESSAGES.USERNAME_IS_EMPTY })
        .regex(USER_REGEX.USERNAME, { message: ENUM_USER_MESSAGES.FORMAT_USERNAME_INVALID }),
    name: z.string().trim().nonempty({ message: ENUM_USER_MESSAGES.NAME_IS_EMPTY }).regex(USER_REGEX.NAME, { message: ENUM_USER_MESSAGES.FORMAT_NAME_INVALID }),
    email: z.string().email({ message: ENUM_USER_MESSAGES.FORMAT_EMAIL_INVALID }).trim().nonempty({ message: ENUM_USER_MESSAGES.EMAIL_IS_EMPTY }),
    password: z
        .string()
        .trim()
        .nonempty({ message: ENUM_USER_MESSAGES.PASSWORD_IS_EMPTY })
        .regex(USER_REGEX.PASSWORD, { message: ENUM_USER_MESSAGES.FORMAT_PASSWORD_INVALID })
})

export type AuthSignUpUseCaseArgs = z.input<typeof AuthSignUpUseCaseArgsSchema>
export type AuthSignUpUseCaseResponse = z.output<typeof AuthSignUpUseCaseArgsSchema>
export type AuthSignUpUseCasePerformResponseValue = { success: string }
export type AuthSignUpUseCasePerformResponse = Promise<Result<AuthSignUpUseCasePerformResponseValue>>

@Injectable()
export class AuthSignUpUseCase extends UseCase {
    constructor(private readonly createUserRepository: UserCreateRepositoryAbstract) {
        super()
    }

    async perform(createArgs: AuthSignUpUseCaseArgs): AuthSignUpUseCasePerformResponse {
        try {
            const responsePerform = await this.performSignUp(createArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'Auth Sign Up', message: 'Cannot sign up' })
        }
    }

    private async performSignUp(createArgs: AuthSignUpUseCaseArgs): AuthSignUpUseCasePerformResponse {
        const createArgsValidationResult = this.validateArgsProps(createArgs)

        const { email, password, username, name } = createArgsValidationResult.getValue()

        const userEntityTable = new UserEntitySimple({ email, password, username, name, online: false })

        await userEntityTable.cryptPassword()

        const performCreateUserRepositoryResult = await this.performCreateUserRepository(userEntityTable)

        if (!performCreateUserRepositoryResult.isSuccess()) {
            return Result.failure<AuthSignUpUseCasePerformResponseValue>(
                performCreateUserRepositoryResult.getError(),
                performCreateUserRepositoryResult.getStatus()
            )
        }

        return Result.success<AuthSignUpUseCasePerformResponseValue>({ success: 'User sign up successfully' }, HttpStatusCodes.CREATED)
    }

    private validateArgsProps(createArgs: AuthSignUpUseCaseArgs) {
        const authSignUpDTO = ZodValidateService.performParse(createArgs, AuthSignUpUseCaseArgsSchema)

        return authSignUpDTO
    }

    private async performCreateUserRepository(userData: UserEntitySimple) {
        const response = await this.createUserRepository.perform({ data: userData })

        return response
    }
}
