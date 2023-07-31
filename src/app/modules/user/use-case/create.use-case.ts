import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { IsNotEmpty } from 'class-validator'
import { z } from 'zod'
import { ZodValidateService } from '@services/zod'
import { UseCase } from '@util/common/use-case'
import { HttpStatusCodes } from '@util/exceptions/http.exception'
import { UserEntitySimple } from '@modules/user/schema'
import { UserCreateRepositoryAbstract } from '@modules/user/repository/create.repository'
import { ENUM_AUTH_MESSAGES } from '@util/messages/auth.messages'
import { USER_REGEX } from '@util/regex'

export class UserCreateUseCaseDTO {
    @IsNotEmpty({ message: ENUM_AUTH_MESSAGES.USERNAME_IS_EMPTY })
    username: string
    @IsNotEmpty({ message: ENUM_AUTH_MESSAGES.NAME_IS_EMPTY })
    name: string
    @IsNotEmpty({ message: ENUM_AUTH_MESSAGES.EMAIL_IS_EMPTY })
    email: string
    @IsNotEmpty({ message: ENUM_AUTH_MESSAGES.PASSWORD_IS_EMPTY })
    password: string
}

export const UserCreateUseCaseArgsSchema = z.object({
    username: z
        .string()
        .trim()
        .nonempty({ message: ENUM_AUTH_MESSAGES.USERNAME_IS_EMPTY })
        .regex(USER_REGEX.USERNAME_REGEX, { message: ENUM_AUTH_MESSAGES.FORMAT_USERNAME_INVALID }),
    name: z
        .string()
        .trim()
        .nonempty({ message: ENUM_AUTH_MESSAGES.NAME_IS_EMPTY })
        .regex(USER_REGEX.NAME_REGEX, { message: ENUM_AUTH_MESSAGES.FORMAT_NAME_INVALID }),
    email: z.string().email({ message: ENUM_AUTH_MESSAGES.FORMAT_EMAIL_INVALID }).trim().nonempty({ message: ENUM_AUTH_MESSAGES.EMAIL_IS_EMPTY }),
    password: z
        .string()
        .trim()
        .nonempty({ message: ENUM_AUTH_MESSAGES.PASSWORD_IS_EMPTY })
        .regex(USER_REGEX.PASSWORD_REGEX, { message: ENUM_AUTH_MESSAGES.FORMAT_PASSWORD_INVALID })
})

export type UserCreateUseCaseArgs = z.input<typeof UserCreateUseCaseArgsSchema>
export type UserCreateUseCaseResponse = z.output<typeof UserCreateUseCaseArgsSchema>
export type UserCreateUseCasePerformResponseValue = { success: string }
export type UserCreateUseCasePerformResponse = Promise<Result<UserCreateUseCasePerformResponseValue>>

@Injectable()
export class UserCreateUseCase extends UseCase {
    constructor(private readonly createUserRepository: UserCreateRepositoryAbstract) { super() }

    async perform(createArgs: UserCreateUseCaseArgs): UserCreateUseCasePerformResponse {
        try {
            const responsePerform = await this.performCreate(createArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'Create User', message: 'Cannot create user' })
        }
    }

    private async performCreate(createArgs: UserCreateUseCaseArgs): UserCreateUseCasePerformResponse {
        const createArgsValidationResult = this.validateArgsProps(createArgs)

        const { email, password, username, name } = createArgsValidationResult.getValue()

        const userEntityTable = new UserEntitySimple({ email, password, username, name, online: false })

        await userEntityTable.cryptPassword()

        const performCreateUserRepositoryResult = await this.performCreateUserRepository(userEntityTable)

        if (!performCreateUserRepositoryResult.isSuccess()) {
            return Result.failure(performCreateUserRepositoryResult.getError(), performCreateUserRepositoryResult.getStatus())
        }

        return Result.success({ success: 'User create successfully' }, HttpStatusCodes.CREATED)
    }

    private validateArgsProps(createArgs: UserCreateUseCaseArgs) {
        const UserCreateDTO = ZodValidateService.performParse(createArgs, UserCreateUseCaseArgsSchema)

        return UserCreateDTO
    }

    private async performCreateUserRepository(userData: UserEntitySimple) {
        const response = await this.createUserRepository.perform({ data: userData })

        return response
    }
}
