import { Injectable } from '@nestjs/common'
import { Service } from '@common/service'
import { UserCreateUseCase, UserCreateUseCaseArgs } from '@modules/user/use-case/create.use-case'
import { UserFindOneUseCase, UserFindOneUseCaseArgs } from '@modules/user/use-case/find-one.use-case'
import { UserListUseCase, UserListUseCaseArgs } from '@modules/user/use-case/list.use-case'
import { UserUpdateUseCase, UserUpdateUseCaseArgs } from '@modules/user/use-case/update.use-case'
import { UserDeleteUseCase, UserDeleteUseCaseArgs } from '@modules/user/use-case/delete.use-case'

@Injectable()
export class UserService extends Service {
    constructor(
        private readonly createUC: UserCreateUseCase,
        private readonly listUC: UserListUseCase,
        private readonly updateUC: UserUpdateUseCase,
        private readonly deleteUC: UserDeleteUseCase,
        private readonly findUC: UserFindOneUseCase
    ) {
        super()
    }

    async getUsers(body?: UserListUseCaseArgs) {
        const response = await this.listUC.perform({ ...body })

        return response
    }

    async getUser(body: UserFindOneUseCaseArgs) {
        const response = await this.findUC.perform({ ...body })

        return response
    }

    async create(body: UserCreateUseCaseArgs) {
        const response = await this.createUC.perform({ ...body })

        return response
    }

    async update(body: UserUpdateUseCaseArgs) {
        const response = await this.updateUC.perform({ ...body })

        return response
    }

    async delete(body: UserDeleteUseCaseArgs) {
        const response = await this.deleteUC.perform({ ...body })

        return response
    }
}
