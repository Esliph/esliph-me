import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { z } from 'zod'
import { UseCase } from '@common/use-case'
import { ZodValidateService } from '@services/zod'
import { UserFindManyRepositoryAbstract } from '@modules/user/repository/find.repository'
import { UserPropSelect } from '@modules/user/repository/repository'
import { GlobalParamFilterSChema } from '@util/param.filter'

export class UserListUseCaseDTO {}

const UserListFilterArgsSchema = GlobalParamFilterSChema.extend({})

export const UserListUseCaseArgsSchema = z.object({})

const UserPropsSelected = {
    id: true,
    username: true,
    name: true,
    online: true,
    createAt: true,
    updateAt: true
}

export type UserListUseCaseArgs = z.input<typeof UserListUseCaseArgsSchema>
export type UserListUseCaseResponse = z.output<typeof UserListUseCaseArgsSchema>
export type UserListCasePerformResponseValue = { users: UserPropSelect<{ select: typeof UserPropsSelected }>[] }
export type UserListCasePerformResponse = Promise<Result<UserListCasePerformResponseValue>>

@Injectable()
export class UserListUseCase extends UseCase {
    constructor(private readonly listUserRepository: UserFindManyRepositoryAbstract) {
        super()
    }

    async perform(listArgs: UserListUseCaseArgs): UserListCasePerformResponse {
        try {
            const responsePerform = await this.performList(listArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'List Users', message: 'Cannot list users' })
        }
    }

    private async performList(listArgs: UserListUseCaseArgs): UserListCasePerformResponse {
        const listArgsValidationResult = this.validateArgsProps(listArgs)

        const listArgsDTO = listArgsValidationResult.getValue()

        const performListRepositoryResult = await this.performListRepository(listArgsDTO)

        if (!performListRepositoryResult.isSuccess()) {
            return Result.failure(performListRepositoryResult.getError(), performListRepositoryResult.getStatus())
        }

        return Result.success<UserListCasePerformResponseValue>(performListRepositoryResult.getValue(), performListRepositoryResult.getStatus())
    }

    private validateArgsProps(listArgs: UserListUseCaseArgs) {
        const userListDTO = ZodValidateService.performParse(listArgs, UserListUseCaseArgsSchema)

        return userListDTO
    }

    private async performListRepository(listArgs: UserListUseCaseArgs) {
        const response = await this.listUserRepository.perform({ where: listArgs, select: { ...UserPropsSelected } })

        return response
    }
}
