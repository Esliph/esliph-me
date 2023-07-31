import { Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { DatabaseModel, DatabaseService } from '@services/database'
import { UserModelTable } from '@modules/user/schema'

type UserGetPayloadTypes = boolean | null | undefined | { select?: Prisma.UserSelect | null }
type UserGetPayload<T extends boolean | null | undefined | { select?: Prisma.UserSelect | null }> = Prisma.UserGetPayload<T>
export type UserArgs = Prisma.UserArgs
export type UserCreateArgs = Prisma.UserCreateArgs
export type UserPropSelect<ArgsSelect extends UserGetPayloadTypes> = UserGetPayload<ArgsSelect>
export type UserCreateResponse = { user: UserModelTable }
export type UserCreateManyArgs = Prisma.UserCreateManyArgs
export type UserCreateManyResponse = Prisma.BatchPayload
export type UserDeleteArgs = Prisma.UserDeleteArgs
export type UserDeleteResponse = boolean
export type UserDeleteManyArgs = Prisma.UserDeleteManyArgs
export type UserDeleteManyResponse = Prisma.BatchPayload
export type UserUpdateArgs = Prisma.UserUpdateArgs
export type UserUpdateResponse = { user: UserModelTable }
export type UserUpdateManyArgs = Prisma.UserUpdateManyArgs
export type UserUpdateManyResponse = Prisma.BatchPayload
export type UserFindFirstArgs = Prisma.UserFindFirstArgs
export type UserFindFirstResponse<ArgsSelect extends UserGetPayloadTypes> = { user: UserPropSelect<ArgsSelect> }
export type UserExistsArgs = Prisma.UserFindFirstArgs
export type UserExistsResponse = boolean
export type UserFindFirstOrThrowArgs = Prisma.UserFindFirstOrThrowArgs
export type UserFindFirstOrThrowResponse<ArgsSelect extends UserGetPayloadTypes> = { user: UserPropSelect<ArgsSelect> }
export type UserFindUniqueArgs = Prisma.UserFindUniqueArgs
export type UserFindUniqueResponse<ArgsSelect extends UserGetPayloadTypes> = { user: UserPropSelect<ArgsSelect> }
export type UserFindUniqueOrThrowArgs = Prisma.UserFindUniqueOrThrowArgs
export type UserFindUniqueOrThrowResponse<ArgsSelect extends UserGetPayloadTypes> = { user: UserPropSelect<ArgsSelect> }
export type UserFindManyArgs = Prisma.UserFindManyArgs
export type UserFindManyResponse<ArgsSelect extends UserGetPayloadTypes> = { users: UserPropSelect<ArgsSelect>[] }
export type UserUpsertArgs = Prisma.UserUpsertArgs
export type UserUpsertResponse = { user: UserModelTable }

export abstract class UserModelTableRepositoryAbstract {
    abstract create: <Args extends UserCreateArgs>(args: Args) => Promise<Result<UserCreateResponse>>
    abstract createMany: <Args extends UserCreateManyArgs>(args: Args) => Promise<Result<UserCreateManyResponse>>
    abstract update: <Args extends UserUpdateArgs>(args: Args) => Promise<Result<UserUpdateResponse>>
    abstract updateMany: <Args extends UserUpdateManyArgs>(args: Args) => Promise<Result<UserCreateManyResponse>>
    abstract findFirst: <Args extends UserFindFirstArgs>(args: Args) => Promise<Result<UserFindFirstResponse<Args>>>
    abstract findExists: <Args extends UserExistsArgs>(args: Args) => Promise<Result<UserExistsResponse>>
    abstract findUnique: <Args extends UserFindUniqueArgs>(args: Args) => Promise<Result<UserFindUniqueResponse<Args>>>
    abstract findFirstOrThrow: <Args extends UserFindFirstOrThrowArgs>(args: Args) => Promise<Result<UserFindFirstOrThrowResponse<Args>>>
    abstract findUniqueOrThrow: <Args extends UserFindUniqueOrThrowArgs>(args: Args) => Promise<Result<UserFindUniqueOrThrowResponse<Args>>>
    abstract findMany: <Args extends UserFindManyArgs>(args: Args) => Promise<Result<UserFindManyResponse<Args>>>
    abstract delete: <Args extends UserDeleteArgs>(args: Args) => Promise<Result<boolean>>
    abstract deleteMany: <Args extends UserDeleteManyArgs>(args: Args) => Promise<Result<UserCreateManyResponse>>
}

@Injectable()
export class UserModelTableRepository extends DatabaseModel implements UserModelTableRepositoryAbstract {
    constructor(private readonly repository: DatabaseService) { super() }

    async create<Args extends UserCreateArgs>(args: Args) {
        try {
            const response: Result<UserCreateResponse> = await this.repository.user
                .create(args).then(res => Result.success({ user: res }))

            return response
        } catch (err: any) {
            return this.extractError<UserCreateResponse>(err, { title: 'Register User', message: 'Cannot register user' })
        }
    }

    async createMany<Args extends UserCreateManyArgs>(args: Args) {
        try {
            const response: Result<UserCreateManyResponse> = await this.repository.user
                .createMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return this.extractError<UserCreateManyResponse>(err, { title: 'Register Users', message: 'Cannot register users' })
        }
    }

    async update<Args extends UserUpdateArgs>(args: Args) {
        try {
            const response: Result<UserUpdateResponse> = await this.repository.user
                .update(args).then(res => Result.success({ user: res }))

            return response
        } catch (err: any) {
            return this.extractError<UserUpdateResponse>(err, { title: 'Update User', message: 'Cannot update user' })
        }
    }

    async updateMany<Args extends UserUpdateManyArgs>(args: Args) {
        try {
            const response: Result<UserUpdateManyResponse> = await this.repository.user
                .updateMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return this.extractError<UserUpdateManyResponse>(err, { title: 'Update Users', message: 'Cannot update users' })
        }
    }

    async findFirst<Args extends UserFindFirstArgs>(args: Args) {
        try {
            const response: Result<UserFindFirstResponse<Args>> = await this.repository.user
                .findFirst(args)
                .then(res => {
                    if (!res) {
                        return this.extractError<UserFindFirstResponse<Args>>(res, { title: 'Find User', message: 'User not found' })
                    }
                    return Result.success({ user: res })
                }) as Result<UserFindFirstResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<UserFindFirstResponse<Args>>(err, { title: 'Find User', message: 'Cannot find user' })
        }
    }

    async findExists<Args extends UserExistsArgs>(args: Args) {
        try {
            const response: Result<UserExistsResponse> = await this.repository.user
                .findFirst(args)
                .then(res => {
                    if (!res) {
                        return this.extractError<UserExistsResponse>(res, { title: 'User Exists', message: 'User not found' })
                    }
                    return Result.success<UserExistsResponse>(true)
                })

            return response
        } catch (err: any) {
            return this.extractError<UserExistsResponse>(err, { title: 'Find User', message: 'Cannot find user' })
        }
    }

    async findUnique<Args extends UserFindUniqueArgs>(args: Args) {
        try {
            const response: Result<UserFindUniqueResponse<Args>> = await this.repository.user
                .findFirst(args)
                .then(res => {
                    if (!res) {
                        return this.extractError<UserFindUniqueResponse<Args>>(res, { title: 'User User', message: 'User not found' })
                    }
                    return Result.success({ user: res })
                }) as Result<UserFindUniqueResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<UserFindUniqueResponse<Args>>(err, { title: 'User User', message: 'User not found' })
        }
    }

    async findFirstOrThrow<Args extends UserFindFirstOrThrowArgs>(args: Args) {
        try {
            const response: Result<UserFindFirstOrThrowResponse<Args>> = await this.repository.user
                .findFirstOrThrow(args)
                .then(res => Result.success({ user: res })) as Result<UserFindFirstOrThrowResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<UserFindFirstOrThrowResponse<Args>>(err, { title: 'Find User', message: 'Cannot find user' })
        }
    }

    async findUniqueOrThrow<Args extends UserFindUniqueOrThrowArgs>(args: Args) {
        try {
            const response: Result<UserFindUniqueOrThrowResponse<Args>> = await this.repository.user
                .findFirstOrThrow(args)
                .then(res => Result.success({ user: res })) as Result<UserFindUniqueOrThrowResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<UserFindUniqueOrThrowResponse<Args>>(err, { title: 'Find User', message: 'Cannot find user' })
        }
    }

    async findMany<Args extends UserFindManyArgs>(args: Args) {
        try {
            const response: Result<UserFindManyResponse<Args>> = await this.repository.user
                .findMany(args).then(res => Result.success({ users: res })) as Result<UserFindManyResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<UserFindManyResponse<Args>>(err, { title: 'Find Users', message: 'Cannot find users' })
        }
    }

    async delete<Args extends UserDeleteArgs>(args: Args) {
        try {
            const response: Result<UserDeleteResponse> = await this.repository.user
                .delete(args).then(res => Result.success(true))

            return response
        } catch (err: any) {
            return this.extractError<UserDeleteResponse>(err, { title: 'Remove User', message: 'Cannot remove user' })
        }
    }

    async deleteMany<Args extends UserDeleteManyArgs>(args: Args) {
        try {
            const response: Result<UserDeleteManyResponse> = await this.repository.user
                .deleteMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return this.extractError<UserDeleteManyResponse>(err, { title: 'Remove Users', message: 'Cannot remove users' })
        }
    }
}
