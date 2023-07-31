import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { z } from 'zod'
import { UseCase } from '@common/use-case'
import { ZodValidateService } from '@services/zod'
import { UserDeleteRepositoryAbstract } from '@modules/user/repository/delete.repository'

export class UserDeleteUseCaseDTO {}

export const UserDeleteUseCaseArgsSchema = ZodValidateService.defaultSchemaModelTable()

export type UserDeleteUseCaseArgs = z.input<typeof UserDeleteUseCaseArgsSchema>
export type UserDeleteUseCaseResponse = z.output<typeof UserDeleteUseCaseArgsSchema>
export type UserDeleteUseCasePerformResponseValue = boolean
export type UserDeleteUseCasePerformResponse = Promise<Result<UserDeleteUseCasePerformResponseValue>>

@Injectable()
export class UserDeleteUseCase extends UseCase {
    constructor(private readonly deleteUserRepository: UserDeleteRepositoryAbstract) {
        super()
    }

    async perform(deleteArgs: UserDeleteUseCaseArgs): UserDeleteUseCasePerformResponse {
        try {
            const responsePerform = await this.performDelete(deleteArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'Delete User', message: 'Cannot delete user' })
        }
    }

    private async performDelete(deleteArgs: UserDeleteUseCaseArgs): UserDeleteUseCasePerformResponse {
        const deleteArgsValidationResult = this.validateArgsProps(deleteArgs)

        const deleteArgsDTO = deleteArgsValidationResult.getValue()

        const performDeleteUserRepositoryResult = await this.performDeleteUserRepository(deleteArgsDTO)

        if (!performDeleteUserRepositoryResult.isSuccess()) {
            return Result.failure(performDeleteUserRepositoryResult.getError(), performDeleteUserRepositoryResult.getStatus())
        }

        return performDeleteUserRepositoryResult
    }

    private validateArgsProps(deleteArgs: UserDeleteUseCaseArgs) {
        const userListDTO = ZodValidateService.performParse(deleteArgs, UserDeleteUseCaseArgsSchema)

        return userListDTO
    }

    private async performDeleteUserRepository(deleteArgs: UserDeleteUseCaseResponse) {
        const response = await this.deleteUserRepository.perform({ where: { id: deleteArgs.id } })

        return response
    }
}
