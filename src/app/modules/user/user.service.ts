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
        try {
            const response = await this.listUC.perform({ ...body })

            return response
        } catch (err) {
            return this.extractError(err, { title: 'List Users', message: 'Cannot get list users' })
        }
    }

    async getUser(body: UserFindOneUseCaseArgs) {
        try {
            const response = await this.findUC.perform({ ...body })

            return response
        } catch (err) {
            return this.extractError(err, { title: 'Find User', message: 'Cannot get user' })
        }
    }

    async create(body: UserCreateUseCaseArgs) {
        try {
            const response = await this.createUC.perform({ ...body })

            return response
        } catch (err: any) {
            return this.extractError(err, { title: 'Create User', message: 'Cannot create user' })
        }
    }

    async update(body: UserUpdateUseCaseArgs) {
        try {
            const response = await this.updateUC.perform({ ...body })

            return response
        } catch (err: any) {
            return this.extractError(err, { title: 'Update User', message: 'Cannot update user' })
        }
    }

    async delete(body: UserDeleteUseCaseArgs) {
        try {
            const response = await this.deleteUC.perform({ ...body })

            return response
        } catch (err: any) {
            return this.extractError(err, { title: 'Delete User', message: 'Cannot delete user' })
        }
    }
}
