import { Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { HttpEsliph, Result } from '@esliph/util-node'
import { DatabaseService } from '@services/database'
import { ErrorModelTable } from '@modules/error/schema'

type ErrorGetPayloadTypes = boolean | null | undefined | { select?: Prisma.ErrorSelect | null }
type ErrorGetPayload<T extends boolean | null | undefined | { select?: Prisma.ErrorSelect | null }> = Prisma.ErrorGetPayload<T>
export type ErrorArgs = Prisma.ErrorArgs
export type ErrorCreateArgs = Prisma.ErrorCreateArgs
export type ErrorPropSelect<ArgsSelect extends ErrorGetPayloadTypes> = ErrorGetPayload<ArgsSelect>
export type ErrorCreateResponse = { error: ErrorModelTable }
export type ErrorCreateManyArgs = Prisma.ErrorCreateManyArgs
export type ErrorCreateManyResponse = Prisma.BatchPayload
export type ErrorDeleteArgs = Prisma.ErrorDeleteArgs
export type ErrorDeleteResponse = boolean
export type ErrorDeleteManyArgs = Prisma.ErrorDeleteManyArgs
export type ErrorDeleteManyResponse = Prisma.BatchPayload
export type ErrorUpdateArgs = Prisma.ErrorUpdateArgs
export type ErrorUpdateResponse = { error: ErrorModelTable }
export type ErrorUpdateManyArgs = Prisma.ErrorUpdateManyArgs
export type ErrorUpdateManyResponse = Prisma.BatchPayload
export type ErrorFindFirstArgs = Prisma.ErrorFindFirstArgs
export type ErrorFindFirstResponse<ArgsSelect extends ErrorGetPayloadTypes> = { error: ErrorPropSelect<ArgsSelect> }
export type ErrorExistsArgs = Prisma.ErrorFindFirstArgs
export type ErrorExistsResponse = boolean
export type ErrorFindFirstOrThrowArgs = Prisma.ErrorFindFirstOrThrowArgs
export type ErrorFindFirstOrThrowResponse<ArgsSelect extends ErrorGetPayloadTypes> = { error: ErrorPropSelect<ArgsSelect> }
export type ErrorFindUniqueArgs = Prisma.ErrorFindUniqueArgs
export type ErrorFindUniqueResponse<ArgsSelect extends ErrorGetPayloadTypes> = { error: ErrorPropSelect<ArgsSelect> }
export type ErrorFindUniqueOrThrowArgs = Prisma.ErrorFindUniqueOrThrowArgs
export type ErrorFindUniqueOrThrowResponse<ArgsSelect extends ErrorGetPayloadTypes> = { error: ErrorPropSelect<ArgsSelect> }
export type ErrorFindManyArgs = Prisma.ErrorFindManyArgs
export type ErrorFindManyResponse<ArgsSelect extends ErrorGetPayloadTypes> = { errors: ErrorPropSelect<ArgsSelect>[] }
export type ErrorUpsertArgs = Prisma.ErrorUpsertArgs
export type ErrorUpsertResponse = { error: ErrorModelTable }

export abstract class ErrorModelTableRepositoryAbstract {
    abstract create: <Args extends ErrorCreateArgs>(args: Args) => Promise<Result<ErrorCreateResponse>>
    abstract createMany: <Args extends ErrorCreateManyArgs>(args: Args) => Promise<Result<ErrorCreateManyResponse>>
    abstract update: <Args extends ErrorUpdateArgs>(args: Args) => Promise<Result<ErrorUpdateResponse>>
    abstract updateMany: <Args extends ErrorUpdateManyArgs>(args: Args) => Promise<Result<ErrorCreateManyResponse>>
    abstract findFirst: <Args extends ErrorFindFirstArgs>(args: Args) => Promise<Result<ErrorFindFirstResponse<Args>>>
    abstract findExists: <Args extends ErrorExistsArgs>(args: Args) => Promise<Result<ErrorExistsResponse>>
    abstract findUnique: <Args extends ErrorFindUniqueArgs>(args: Args) => Promise<Result<ErrorFindUniqueResponse<Args>>>
    abstract findFirstOrThrow: <Args extends ErrorFindFirstOrThrowArgs>(args: Args) => Promise<Result<ErrorFindFirstOrThrowResponse<Args>>>
    abstract findUniqueOrThrow: <Args extends ErrorFindUniqueOrThrowArgs>(args: Args) => Promise<Result<ErrorFindUniqueOrThrowResponse<Args>>>
    abstract findMany: <Args extends ErrorFindManyArgs>(args: Args) => Promise<Result<ErrorFindManyResponse<Args>>>
    abstract delete: <Args extends ErrorDeleteArgs>(args: Args) => Promise<Result<boolean>>
    abstract deleteMany: <Args extends ErrorDeleteManyArgs>(args: Args) => Promise<Result<ErrorCreateManyResponse>>
}

@Injectable()
export class ErrorModelTableRepository implements ErrorModelTableRepositoryAbstract {
    constructor(private readonly repository: DatabaseService) { }

    async create<Args extends ErrorCreateArgs>(args: Args) {
        try {
            const response: Result<ErrorCreateResponse> = await this.repository.error
                .create(args).then(res => Result.success({ error: res }))

            return response
        } catch (err: any) {
            return Result.failure<ErrorCreateResponse>({
                title: 'Register Error',
                message: [{ message: 'Cannot register error', origin: err.meta.target.join(';') }]
            }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    async createMany<Args extends ErrorCreateManyArgs>(args: Args) {
        try {
            const response: Result<ErrorCreateManyResponse> = await this.repository.error
                .createMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return Result.failure<ErrorCreateManyResponse>({
                title: 'Register Errors',
                message: [{ message: 'Cannot register errors', origin: err.meta.target.join(';') }]
            }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    async update<Args extends ErrorUpdateArgs>(args: Args) {
        try {
            const response: Result<ErrorUpdateResponse> = await this.repository.error
                .update(args).then(res => Result.success({ error: res }))

            return response
        } catch (err: any) {
            return Result.failure<ErrorUpdateResponse>({
                title: 'Update Error',
                message: [{ message: 'Cannot update error', origin: err.meta.target.join(';') }]
            }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    async updateMany<Args extends ErrorUpdateManyArgs>(args: Args) {
        try {
            const response: Result<ErrorUpdateManyResponse> = await this.repository.error
                .updateMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return Result.failure<ErrorUpdateManyResponse>({
                title: 'Update Errors',
                message: [{ message: 'Cannot update errors', origin: err.meta.target.join(';') }]
            }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    async findFirst<Args extends ErrorFindFirstArgs>(args: Args) {
        try {
            const response: Result<ErrorFindFirstResponse<Args>> = await this.repository.error
                .findFirst(args)
                .then(res => {
                    if (!res) {
                        return Result.failure<ErrorFindFirstResponse<Args>>({
                            title: 'Find Error',
                            message: [{ message: 'Error not found' }]
                        }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
                    }
                    return Result.success({ error: res })
                }) as Result<ErrorFindFirstResponse<Args>>

            return response
        } catch (err: any) {
            return Result.failure<ErrorFindFirstResponse<Args>>({
                title: 'Find Error',
                message: [{ message: 'Cannot find error', origin: err.meta.target.join(';') }]
            }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    async findExists<Args extends ErrorExistsArgs>(args: Args) {
        try {
            const response: Result<ErrorExistsResponse> = await this.repository.error
                .findFirst(args)
                .then(res => {
                    if (!res) {
                        return Result.failure<ErrorExistsResponse>({
                            title: 'Error Exists',
                            message: [{ message: 'Error not found' }]
                        }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
                    }
                    return Result.success<ErrorExistsResponse>(true)
                })

            return response
        } catch (err: any) {
            return Result.failure<ErrorExistsResponse>({
                title: 'Find Error',
                message: [{ message: 'Cannot find error', origin: err.meta.target.join(';') }]
            }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    async findUnique<Args extends ErrorFindUniqueArgs>(args: Args) {
        try {
            const response: Result<ErrorFindUniqueResponse<Args>> = await this.repository.error
                .findFirst(args)
                .then(res => {
                    if (!res) {
                        return Result.failure<ErrorFindUniqueResponse<Args>>({
                            title: 'Error Error',
                            message: [{ message: 'Error not found' }]
                        }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
                    }
                    return Result.success({ error: res })
                }) as Result<ErrorFindUniqueResponse<Args>>

            return response
        } catch (err: any) {
            return Result.failure<ErrorFindUniqueResponse<Args>>({
                title: 'Find Error',
                message: [{ message: 'Cannot find error', origin: err.meta.target.join(';') }]
            }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    async findFirstOrThrow<Args extends ErrorFindFirstOrThrowArgs>(args: Args) {
        try {
            const response: Result<ErrorFindFirstOrThrowResponse<Args>> = await this.repository.error
                .findFirstOrThrow(args)
                .then(res => Result.success({ error: res })) as Result<ErrorFindFirstOrThrowResponse<Args>>

            return response
        } catch (err: any) {
            return Result.failure<ErrorFindFirstOrThrowResponse<Args>>({
                title: 'Find Error',
                message: [{ message: 'Cannot find error', origin: err.meta.target.join(';') }]
            }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    async findUniqueOrThrow<Args extends ErrorFindUniqueOrThrowArgs>(args: Args) {
        try {
            const response: Result<ErrorFindUniqueOrThrowResponse<Args>> = await this.repository.error
                .findFirstOrThrow(args)
                .then(res => Result.success({ error: res })) as Result<ErrorFindUniqueOrThrowResponse<Args>>

            return response
        } catch (err: any) {
            return Result.failure<ErrorFindUniqueOrThrowResponse<Args>>({
                title: 'Find Error',
                message: [{ message: 'Cannot find error', origin: err.meta.target.join(';') }]
            }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    async findMany<Args extends ErrorFindManyArgs>(args: Args) {
        try {
            const response: Result<ErrorFindManyResponse<Args>> = await this.repository.error
                .findMany(args).then(res => Result.success({ errors: res })) as Result<ErrorFindManyResponse<Args>>

            return response
        } catch (err: any) {
            return Result.failure<ErrorFindManyResponse<Args>>({
                title: 'Find Errors',
                message: [{ message: 'Cannot find errors', origin: err.meta.target.join(';') }]
            }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    async delete<Args extends ErrorDeleteArgs>(args: Args) {
        try {
            const response: Result<ErrorDeleteResponse> = await this.repository.error
                .delete(args).then(res => Result.success(true))

            return response
        } catch (err: any) {
            return Result.failure<ErrorDeleteResponse>({
                title: 'Remove Error',
                message: [{ message: 'Cannot remove error', origin: err.meta.target.join(';') }]
            }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }

    async deleteMany<Args extends ErrorDeleteManyArgs>(args: Args) {
        try {
            const response: Result<ErrorDeleteManyResponse> = await this.repository.error
                .deleteMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return Result.failure<ErrorDeleteManyResponse>({
                title: 'Remove Errors',
                message: [{ message: 'Cannot remove errors', origin: err.meta.target.join(';') }]
            }, HttpEsliph.HttpStatusCodes.BAD_REQUEST)
        }
    }
}