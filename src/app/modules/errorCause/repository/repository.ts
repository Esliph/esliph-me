import { Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { DatabaseModel, DatabaseService } from '@services/database'
import { ErrorCauseModelTable } from '@modules/errorCause/schema'

type ErrorCauseGetPayloadTypes = boolean | null | undefined | { select?: Prisma.ErrorCauseSelect | null }
type ErrorCauseGetPayload<T extends boolean | null | undefined | { select?: Prisma.ErrorCauseSelect | null }> = Prisma.ErrorCauseGetPayload<T>
export type ErrorCauseDefaultArgs = Prisma.ErrorCauseArgs
export type ErrorCauseCreateArgs = Prisma.ErrorCauseCreateArgs
export type ErrorCausePropSelect<ArgsSelect extends ErrorCauseGetPayloadTypes> = ErrorCauseGetPayload<ArgsSelect>
export type ErrorCauseCreateResponse = { errorCause: ErrorCauseModelTable }
export type ErrorCauseCreateManyArgs = Prisma.ErrorCauseCreateManyArgs
export type ErrorCauseCreateManyResponse = Prisma.BatchPayload
export type ErrorCauseDeleteArgs = Prisma.ErrorCauseDeleteArgs
export type ErrorCauseDeleteResponse = boolean
export type ErrorCauseDeleteManyArgs = Prisma.ErrorCauseDeleteManyArgs
export type ErrorCauseDeleteManyResponse = Prisma.BatchPayload
export type ErrorCauseUpdateArgs = Prisma.ErrorCauseUpdateArgs
export type ErrorCauseUpdateResponse = { errorCause: ErrorCauseModelTable }
export type ErrorCauseUpdateManyArgs = Prisma.ErrorCauseUpdateManyArgs
export type ErrorCauseUpdateManyResponse = Prisma.BatchPayload
export type ErrorCauseFindFirstArgs = Prisma.ErrorCauseFindFirstArgs
export type ErrorCauseFindFirstResponse<ArgsSelect extends ErrorCauseGetPayloadTypes> = { errorCause: ErrorCausePropSelect<ArgsSelect> }
export type ErrorCauseExistsArgs = Prisma.ErrorCauseFindFirstArgs
export type ErrorCauseExistsResponse = boolean
export type ErrorCauseFindFirstOrThrowArgs = Prisma.ErrorCauseFindFirstOrThrowArgs
export type ErrorCauseFindFirstOrThrowResponse<ArgsSelect extends ErrorCauseGetPayloadTypes> = { errorCause: ErrorCausePropSelect<ArgsSelect> }
export type ErrorCauseFindUniqueArgs = Prisma.ErrorCauseFindUniqueArgs
export type ErrorCauseFindUniqueResponse<ArgsSelect extends ErrorCauseGetPayloadTypes> = { errorCause: ErrorCausePropSelect<ArgsSelect> }
export type ErrorCauseFindUniqueOrThrowArgs = Prisma.ErrorCauseFindUniqueOrThrowArgs
export type ErrorCauseFindUniqueOrThrowResponse<ArgsSelect extends ErrorCauseGetPayloadTypes> = { errorCause: ErrorCausePropSelect<ArgsSelect> }
export type ErrorCauseFindManyArgs = Prisma.ErrorCauseFindManyArgs
export type ErrorCauseFindManyResponse<ArgsSelect extends ErrorCauseGetPayloadTypes> = { errorCauses: ErrorCausePropSelect<ArgsSelect>[] }
export type ErrorCauseUpsertArgs = Prisma.ErrorCauseUpsertArgs
export type ErrorCauseUpsertResponse = { errorCause: ErrorCauseModelTable }

export abstract class ErrorCauseModelTableRepositoryAbstract {
    abstract create: <Args extends ErrorCauseCreateArgs>(args: Args) => Promise<Result<ErrorCauseCreateResponse>>
    abstract createMany: <Args extends ErrorCauseCreateManyArgs>(args: Args) => Promise<Result<ErrorCauseCreateManyResponse>>
    abstract update: <Args extends ErrorCauseUpdateArgs>(args: Args) => Promise<Result<ErrorCauseUpdateResponse>>
    abstract updateMany: <Args extends ErrorCauseUpdateManyArgs>(args: Args) => Promise<Result<ErrorCauseCreateManyResponse>>
    abstract findFirst: <Args extends ErrorCauseFindFirstArgs>(args: Args) => Promise<Result<ErrorCauseFindFirstResponse<Args>>>
    abstract findExists: <Args extends ErrorCauseExistsArgs>(args: Args) => Promise<Result<ErrorCauseExistsResponse>>
    abstract findUnique: <Args extends ErrorCauseFindUniqueArgs>(args: Args) => Promise<Result<ErrorCauseFindUniqueResponse<Args>>>
    abstract findFirstOrThrow: <Args extends ErrorCauseFindFirstOrThrowArgs>(args: Args) => Promise<Result<ErrorCauseFindFirstOrThrowResponse<Args>>>
    abstract findUniqueOrThrow: <Args extends ErrorCauseFindUniqueOrThrowArgs>(args: Args) => Promise<Result<ErrorCauseFindUniqueOrThrowResponse<Args>>>
    abstract findMany: <Args extends ErrorCauseFindManyArgs>(args: Args) => Promise<Result<ErrorCauseFindManyResponse<Args>>>
    abstract delete: <Args extends ErrorCauseDeleteArgs>(args: Args) => Promise<Result<boolean>>
    abstract deleteMany: <Args extends ErrorCauseDeleteManyArgs>(args: Args) => Promise<Result<ErrorCauseCreateManyResponse>>
}

@Injectable()
export class ErrorCauseModelTableRepository extends DatabaseModel implements ErrorCauseModelTableRepositoryAbstract {
    constructor(private readonly repository: DatabaseService) { super() }

    async create<Args extends ErrorCauseCreateArgs>(args: Args) {
        try {
            const response: Result<ErrorCauseCreateResponse> = await this.repository.errorCause
                .create(args).then(res => Result.success({ errorCause: res }))

            return response
        } catch (err: any) {
            return this.extractError<ErrorCauseCreateResponse>(err, { title: 'Register ErrorCause', message: 'Cannot register errorCause' })
        }
    }

    async createMany<Args extends ErrorCauseCreateManyArgs>(args: Args) {
        try {
            const response: Result<ErrorCauseCreateManyResponse> = await this.repository.errorCause
                .createMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return this.extractError<ErrorCauseCreateManyResponse>(err, { title: 'Register ErrorCauses', message: 'Cannot register errorCauses' })
        }
    }

    async update<Args extends ErrorCauseUpdateArgs>(args: Args) {
        try {
            const response: Result<ErrorCauseUpdateResponse> = await this.repository.errorCause
                .update(args).then(res => Result.success({ errorCause: res }))

            return response
        } catch (err: any) {
            return this.extractError<ErrorCauseUpdateResponse>(err, { title: 'Update ErrorCause', message: 'Cannot update errorCause' })
        }
    }

    async updateMany<Args extends ErrorCauseUpdateManyArgs>(args: Args) {
        try {
            const response: Result<ErrorCauseUpdateManyResponse> = await this.repository.errorCause
                .updateMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return this.extractError<ErrorCauseUpdateManyResponse>(err, { title: 'Update ErrorCauses', message: 'Cannot update errorCauses' })
        }
    }

    async findFirst<Args extends ErrorCauseFindFirstArgs>(args: Args) {
        try {
            const response: Result<ErrorCauseFindFirstResponse<Args>> = await this.repository.errorCause
                .findFirst(args)
                .then(res => {
                    if (!res) {
                        return this.extractError<ErrorCauseFindFirstResponse<Args>>(res, { title: 'Find ErrorCause', message: 'ErrorCause not found' })
                    }
                    return Result.success({ errorCause: res })
                }) as Result<ErrorCauseFindFirstResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<ErrorCauseFindFirstResponse<Args>>(err, { title: 'Find ErrorCause', message: 'Cannot find errorCause' })
        }
    }

    async findExists<Args extends ErrorCauseExistsArgs>(args: Args) {
        try {
            const response: Result<ErrorCauseExistsResponse> = await this.repository.errorCause
                .findFirst(args)
                .then(res => {
                    if (!res) {
                        return this.extractError<ErrorCauseExistsResponse>(res, { title: 'ErrorCause Exists', message: 'ErrorCause not found' })
                    }
                    return Result.success<ErrorCauseExistsResponse>(true)
                })

            return response
        } catch (err: any) {
            return this.extractError<ErrorCauseExistsResponse>(err, { title: 'Find ErrorCause', message: 'Cannot find errorCause' })
        }
    }

    async findUnique<Args extends ErrorCauseFindUniqueArgs>(args: Args) {
        try {
            const response: Result<ErrorCauseFindUniqueResponse<Args>> = await this.repository.errorCause
                .findFirst(args)
                .then(res => {
                    if (!res) {
                        return this.extractError<ErrorCauseFindUniqueResponse<Args>>(res, { title: 'ErrorCause ErrorCause', message: 'ErrorCause not found' })
                    }
                    return Result.success({ errorCause: res })
                }) as Result<ErrorCauseFindUniqueResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<ErrorCauseFindUniqueResponse<Args>>(err, { title: 'ErrorCause ErrorCause', message: 'ErrorCause not found' })
        }
    }

    async findFirstOrThrow<Args extends ErrorCauseFindFirstOrThrowArgs>(args: Args) {
        try {
            const response: Result<ErrorCauseFindFirstOrThrowResponse<Args>> = await this.repository.errorCause
                .findFirstOrThrow(args)
                .then(res => Result.success({ errorCause: res })) as Result<ErrorCauseFindFirstOrThrowResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<ErrorCauseFindFirstOrThrowResponse<Args>>(err, { title: 'Find ErrorCause', message: 'Cannot find errorCause' })
        }
    }

    async findUniqueOrThrow<Args extends ErrorCauseFindUniqueOrThrowArgs>(args: Args) {
        try {
            const response: Result<ErrorCauseFindUniqueOrThrowResponse<Args>> = await this.repository.errorCause
                .findFirstOrThrow(args)
                .then(res => Result.success({ errorCause: res })) as Result<ErrorCauseFindUniqueOrThrowResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<ErrorCauseFindUniqueOrThrowResponse<Args>>(err, { title: 'Find ErrorCause', message: 'Cannot find errorCause' })
        }
    }

    async findMany<Args extends ErrorCauseFindManyArgs>(args: Args) {
        try {
            const response: Result<ErrorCauseFindManyResponse<Args>> = await this.repository.errorCause
                .findMany(args).then(res => Result.success({ errorCauses: res })) as Result<ErrorCauseFindManyResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<ErrorCauseFindManyResponse<Args>>(err, { title: 'Find ErrorCauses', message: 'Cannot find errorCauses' })
        }
    }

    async delete<Args extends ErrorCauseDeleteArgs>(args: Args) {
        try {
            const response: Result<ErrorCauseDeleteResponse> = await this.repository.errorCause
                .delete(args).then(res => Result.success(true))

            return response
        } catch (err: any) {
            return this.extractError<ErrorCauseDeleteResponse>(err, { title: 'Remove ErrorCause', message: 'Cannot remove errorCause' })
        }
    }

    async deleteMany<Args extends ErrorCauseDeleteManyArgs>(args: Args) {
        try {
            const response: Result<ErrorCauseDeleteManyResponse> = await this.repository.errorCause
                .deleteMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return this.extractError<ErrorCauseDeleteManyResponse>(err, { title: 'Remove ErrorCauses', message: 'Cannot remove errorCauses' })
        }
    }
}
