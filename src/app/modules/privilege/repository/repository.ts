import { Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { DatabaseModel, DatabaseService } from '@services/database'
import { PrivilegeModelTable } from '@modules/privilege/schema'

type PrivilegeGetPayloadTypes = boolean | null | undefined | { select?: Prisma.PrivilegeSelect | null }
type PrivilegeGetPayload<T extends boolean | null | undefined | { select?: Prisma.PrivilegeSelect | null }> = Prisma.PrivilegeGetPayload<T>
export type PrivilegeArgs = Prisma.PrivilegeDefaultArgs
export type PrivilegeCreateArgs = Prisma.PrivilegeCreateArgs
export type PrivilegePropSelect<ArgsSelect extends PrivilegeGetPayloadTypes> = PrivilegeGetPayload<ArgsSelect>
export type PrivilegeCreateResponse = { privilege: PrivilegeModelTable }
export type PrivilegeCreateManyArgs = Prisma.PrivilegeCreateManyArgs
export type PrivilegeCreateManyResponse = Prisma.BatchPayload
export type PrivilegeDeleteArgs = Prisma.PrivilegeDeleteArgs
export type PrivilegeDeleteResponse = boolean
export type PrivilegeDeleteManyArgs = Prisma.PrivilegeDeleteManyArgs
export type PrivilegeDeleteManyResponse = Prisma.BatchPayload
export type PrivilegeUpdateArgs = Prisma.PrivilegeUpdateArgs
export type PrivilegeUpdateResponse = { privilege: PrivilegeModelTable }
export type PrivilegeUpdateManyArgs = Prisma.PrivilegeUpdateManyArgs
export type PrivilegeUpdateManyResponse = Prisma.BatchPayload
export type PrivilegeFindFirstArgs = Prisma.PrivilegeFindFirstArgs
export type PrivilegeFindFirstResponse<ArgsSelect extends PrivilegeGetPayloadTypes> = { privilege: PrivilegePropSelect<ArgsSelect> }
export type PrivilegeExistsArgs = Prisma.PrivilegeFindFirstArgs
export type PrivilegeExistsResponse = boolean
export type PrivilegeFindFirstOrThrowArgs = Prisma.PrivilegeFindFirstOrThrowArgs
export type PrivilegeFindFirstOrThrowResponse<ArgsSelect extends PrivilegeGetPayloadTypes> = { privilege: PrivilegePropSelect<ArgsSelect> }
export type PrivilegeFindUniqueArgs = Prisma.PrivilegeFindUniqueArgs
export type PrivilegeFindUniqueResponse<ArgsSelect extends PrivilegeGetPayloadTypes> = { privilege: PrivilegePropSelect<ArgsSelect> }
export type PrivilegeFindUniqueOrThrowArgs = Prisma.PrivilegeFindUniqueOrThrowArgs
export type PrivilegeFindUniqueOrThrowResponse<ArgsSelect extends PrivilegeGetPayloadTypes> = { privilege: PrivilegePropSelect<ArgsSelect> }
export type PrivilegeFindManyArgs = Prisma.PrivilegeFindManyArgs
export type PrivilegeFindManyResponse<ArgsSelect extends PrivilegeGetPayloadTypes> = { privileges: PrivilegePropSelect<ArgsSelect>[] }
export type PrivilegeUpsertArgs = Prisma.PrivilegeUpsertArgs
export type PrivilegeUpsertResponse = { privilege: PrivilegeModelTable }

export abstract class PrivilegeModelTableRepositoryAbstract {
    abstract create: <Args extends PrivilegeCreateArgs>(args: Args) => Promise<Result<PrivilegeCreateResponse>>
    abstract createMany: <Args extends PrivilegeCreateManyArgs>(args: Args) => Promise<Result<PrivilegeCreateManyResponse>>
    abstract update: <Args extends PrivilegeUpdateArgs>(args: Args) => Promise<Result<PrivilegeUpdateResponse>>
    abstract updateMany: <Args extends PrivilegeUpdateManyArgs>(args: Args) => Promise<Result<PrivilegeCreateManyResponse>>
    abstract findFirst: <Args extends PrivilegeFindFirstArgs>(args: Args) => Promise<Result<PrivilegeFindFirstResponse<Args>>>
    abstract findExists: <Args extends PrivilegeExistsArgs>(args: Args) => Promise<Result<PrivilegeExistsResponse>>
    abstract findUnique: <Args extends PrivilegeFindUniqueArgs>(args: Args) => Promise<Result<PrivilegeFindUniqueResponse<Args>>>
    abstract findFirstOrThrow: <Args extends PrivilegeFindFirstOrThrowArgs>(args: Args) => Promise<Result<PrivilegeFindFirstOrThrowResponse<Args>>>
    abstract findUniqueOrThrow: <Args extends PrivilegeFindUniqueOrThrowArgs>(args: Args) => Promise<Result<PrivilegeFindUniqueOrThrowResponse<Args>>>
    abstract findMany: <Args extends PrivilegeFindManyArgs>(args: Args) => Promise<Result<PrivilegeFindManyResponse<Args>>>
    abstract delete: <Args extends PrivilegeDeleteArgs>(args: Args) => Promise<Result<boolean>>
    abstract deleteMany: <Args extends PrivilegeDeleteManyArgs>(args: Args) => Promise<Result<PrivilegeCreateManyResponse>>
}

@Injectable()
export class PrivilegeModelTableRepository extends DatabaseModel implements PrivilegeModelTableRepositoryAbstract {
    constructor(private readonly repository: DatabaseService) { super() }

    async create<Args extends PrivilegeCreateArgs>(args: Args) {
        try {
            const response: Result<PrivilegeCreateResponse> = await this.repository.privilege
                .create(args).then(res => Result.success({ privilege: res }))

            return response
        } catch (err: any) {
            return this.extractError<PrivilegeCreateResponse>(err, { title: 'Register Privilege', message: 'Cannot register privilege' })
        }
    }

    async createMany<Args extends PrivilegeCreateManyArgs>(args: Args) {
        try {
            const response: Result<PrivilegeCreateManyResponse> = await this.repository.privilege
                .createMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return this.extractError<PrivilegeCreateManyResponse>(err, { title: 'Register Privileges', message: 'Cannot register privileges' })
        }
    }

    async update<Args extends PrivilegeUpdateArgs>(args: Args) {
        try {
            const response: Result<PrivilegeUpdateResponse> = await this.repository.privilege
                .update(args).then(res => Result.success({ privilege: res }))

            return response
        } catch (err: any) {
            return this.extractError<PrivilegeUpdateResponse>(err, { title: 'Update Privilege', message: 'Cannot update privilege' })
        }
    }

    async updateMany<Args extends PrivilegeUpdateManyArgs>(args: Args) {
        try {
            const response: Result<PrivilegeUpdateManyResponse> = await this.repository.privilege
                .updateMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return this.extractError<PrivilegeUpdateManyResponse>(err, { title: 'Update Privileges', message: 'Cannot update privileges' })
        }
    }

    async findFirst<Args extends PrivilegeFindFirstArgs>(args: Args) {
        try {
            const response: Result<PrivilegeFindFirstResponse<Args>> = await this.repository.privilege
                .findFirst(args)
                .then(res => {
                    if (!res) {
                        return this.extractError<PrivilegeFindFirstResponse<Args>>(res, { title: 'Find Privilege', message: 'Privilege not found' })
                    }
                    return Result.success({ privilege: res })
                }) as Result<PrivilegeFindFirstResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<PrivilegeFindFirstResponse<Args>>(err, { title: 'Find Privilege', message: 'Cannot find privilege' })
        }
    }

    async findExists<Args extends PrivilegeExistsArgs>(args: Args) {
        try {
            const response: Result<PrivilegeExistsResponse> = await this.repository.privilege
                .findFirst(args)
                .then(res => {
                    if (!res) {
                        return this.extractError<PrivilegeExistsResponse>(res, { title: 'Privilege Exists', message: 'Privilege not found' })
                    }
                    return Result.success<PrivilegeExistsResponse>(true)
                })

            return response
        } catch (err: any) {
            return this.extractError<PrivilegeExistsResponse>(err, { title: 'Find Privilege', message: 'Cannot find privilege' })
        }
    }

    async findUnique<Args extends PrivilegeFindUniqueArgs>(args: Args) {
        try {
            const response: Result<PrivilegeFindUniqueResponse<Args>> = await this.repository.privilege
                .findFirst(args)
                .then(res => {
                    if (!res) {
                        return this.extractError<PrivilegeFindUniqueResponse<Args>>(res, { title: 'Privilege Privilege', message: 'Privilege not found' })
                    }
                    return Result.success({ privilege: res })
                }) as Result<PrivilegeFindUniqueResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<PrivilegeFindUniqueResponse<Args>>(err, { title: 'Privilege Privilege', message: 'Privilege not found' })
        }
    }

    async findFirstOrThrow<Args extends PrivilegeFindFirstOrThrowArgs>(args: Args) {
        try {
            const response: Result<PrivilegeFindFirstOrThrowResponse<Args>> = await this.repository.privilege
                .findFirstOrThrow(args)
                .then(res => Result.success({ privilege: res })) as Result<PrivilegeFindFirstOrThrowResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<PrivilegeFindFirstOrThrowResponse<Args>>(err, { title: 'Find Privilege', message: 'Cannot find privilege' })
        }
    }

    async findUniqueOrThrow<Args extends PrivilegeFindUniqueOrThrowArgs>(args: Args) {
        try {
            const response: Result<PrivilegeFindUniqueOrThrowResponse<Args>> = await this.repository.privilege
                .findFirstOrThrow(args)
                .then(res => Result.success({ privilege: res })) as Result<PrivilegeFindUniqueOrThrowResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<PrivilegeFindUniqueOrThrowResponse<Args>>(err, { title: 'Find Privilege', message: 'Cannot find privilege' })
        }
    }

    async findMany<Args extends PrivilegeFindManyArgs>(args: Args) {
        try {
            const response: Result<PrivilegeFindManyResponse<Args>> = await this.repository.privilege
                .findMany(args).then(res => Result.success({ privileges: res })) as Result<PrivilegeFindManyResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<PrivilegeFindManyResponse<Args>>(err, { title: 'Find Privileges', message: 'Cannot find privileges' })
        }
    }

    async delete<Args extends PrivilegeDeleteArgs>(args: Args) {
        try {
            const response: Result<PrivilegeDeleteResponse> = await this.repository.privilege
                .delete(args).then(res => Result.success(true))

            return response
        } catch (err: any) {
            return this.extractError<PrivilegeDeleteResponse>(err, { title: 'Remove Privilege', message: 'Cannot remove privilege' })
        }
    }

    async deleteMany<Args extends PrivilegeDeleteManyArgs>(args: Args) {
        try {
            const response: Result<PrivilegeDeleteManyResponse> = await this.repository.privilege
                .deleteMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return this.extractError<PrivilegeDeleteManyResponse>(err, { title: 'Remove Privileges', message: 'Cannot remove privileges' })
        }
    }
}
