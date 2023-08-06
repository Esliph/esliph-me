import { Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { DatabaseModel, DatabaseService } from '@services/database'
import { MailModelTable } from '@modules/mail/schema'

type MailGetPayloadTypes = boolean | null | undefined | { select?: Prisma.MailSelect | null }
type MailGetPayload<T extends boolean | null | undefined | { select?: Prisma.MailSelect | null }> = Prisma.MailGetPayload<T>
export type MailDefaultArgs = Prisma.MailArgs
export type MailCreateArgs = Prisma.MailCreateArgs
export type MailPropSelect<ArgsSelect extends MailGetPayloadTypes> = MailGetPayload<ArgsSelect>
export type MailCreateResponse = { mail: MailModelTable }
export type MailCreateManyArgs = Prisma.MailCreateManyArgs
export type MailCreateManyResponse = Prisma.BatchPayload
export type MailDeleteArgs = Prisma.MailDeleteArgs
export type MailDeleteResponse = boolean
export type MailDeleteManyArgs = Prisma.MailDeleteManyArgs
export type MailDeleteManyResponse = Prisma.BatchPayload
export type MailUpdateArgs = Prisma.MailUpdateArgs
export type MailUpdateResponse = { mail: MailModelTable }
export type MailUpdateManyArgs = Prisma.MailUpdateManyArgs
export type MailUpdateManyResponse = Prisma.BatchPayload
export type MailFindFirstArgs = Prisma.MailFindFirstArgs
export type MailFindFirstResponse<ArgsSelect extends MailGetPayloadTypes> = { mail: MailPropSelect<ArgsSelect> }
export type MailExistsArgs = Prisma.MailFindFirstArgs
export type MailExistsResponse = boolean
export type MailFindFirstOrThrowArgs = Prisma.MailFindFirstOrThrowArgs
export type MailFindFirstOrThrowResponse<ArgsSelect extends MailGetPayloadTypes> = { mail: MailPropSelect<ArgsSelect> }
export type MailFindUniqueArgs = Prisma.MailFindUniqueArgs
export type MailFindUniqueResponse<ArgsSelect extends MailGetPayloadTypes> = { mail: MailPropSelect<ArgsSelect> }
export type MailFindUniqueOrThrowArgs = Prisma.MailFindUniqueOrThrowArgs
export type MailFindUniqueOrThrowResponse<ArgsSelect extends MailGetPayloadTypes> = { mail: MailPropSelect<ArgsSelect> }
export type MailFindManyArgs = Prisma.MailFindManyArgs
export type MailFindManyResponse<ArgsSelect extends MailGetPayloadTypes> = { mails: MailPropSelect<ArgsSelect>[] }
export type MailUpsertArgs = Prisma.MailUpsertArgs
export type MailUpsertResponse = { mail: MailModelTable }

export abstract class MailModelTableRepositoryAbstract {
    abstract create: <Args extends MailCreateArgs>(args: Args) => Promise<Result<MailCreateResponse>>
    abstract createMany: <Args extends MailCreateManyArgs>(args: Args) => Promise<Result<MailCreateManyResponse>>
    abstract update: <Args extends MailUpdateArgs>(args: Args) => Promise<Result<MailUpdateResponse>>
    abstract updateMany: <Args extends MailUpdateManyArgs>(args: Args) => Promise<Result<MailCreateManyResponse>>
    abstract findFirst: <Args extends MailFindFirstArgs>(args: Args) => Promise<Result<MailFindFirstResponse<Args>>>
    abstract findExists: <Args extends MailExistsArgs>(args: Args) => Promise<Result<MailExistsResponse>>
    abstract findUnique: <Args extends MailFindUniqueArgs>(args: Args) => Promise<Result<MailFindUniqueResponse<Args>>>
    abstract findFirstOrThrow: <Args extends MailFindFirstOrThrowArgs>(args: Args) => Promise<Result<MailFindFirstOrThrowResponse<Args>>>
    abstract findUniqueOrThrow: <Args extends MailFindUniqueOrThrowArgs>(args: Args) => Promise<Result<MailFindUniqueOrThrowResponse<Args>>>
    abstract findMany: <Args extends MailFindManyArgs>(args: Args) => Promise<Result<MailFindManyResponse<Args>>>
    abstract delete: <Args extends MailDeleteArgs>(args: Args) => Promise<Result<boolean>>
    abstract deleteMany: <Args extends MailDeleteManyArgs>(args: Args) => Promise<Result<MailCreateManyResponse>>
}

@Injectable()
export class MailModelTableRepository extends DatabaseModel implements MailModelTableRepositoryAbstract {
    constructor(private readonly repository: DatabaseService) { super() }

    async create<Args extends MailCreateArgs>(args: Args) {
        try {
            const response: Result<MailCreateResponse> = await this.repository.mail
                .create(args).then(res => Result.success({ mail: res }))

            return response
        } catch (err: any) {
            return this.extractError<MailCreateResponse>(err, { title: 'Register Mail', message: 'Cannot register mail' })
        }
    }

    async createMany<Args extends MailCreateManyArgs>(args: Args) {
        try {
            const response: Result<MailCreateManyResponse> = await this.repository.mail
                .createMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return this.extractError<MailCreateManyResponse>(err, { title: 'Register Mails', message: 'Cannot register mails' })
        }
    }

    async update<Args extends MailUpdateArgs>(args: Args) {
        try {
            const response: Result<MailUpdateResponse> = await this.repository.mail
                .update(args).then(res => Result.success({ mail: res }))

            return response
        } catch (err: any) {
            return this.extractError<MailUpdateResponse>(err, { title: 'Update Mail', message: 'Cannot update mail' })
        }
    }

    async updateMany<Args extends MailUpdateManyArgs>(args: Args) {
        try {
            const response: Result<MailUpdateManyResponse> = await this.repository.mail
                .updateMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return this.extractError<MailUpdateManyResponse>(err, { title: 'Update Mails', message: 'Cannot update mails' })
        }
    }

    async findFirst<Args extends MailFindFirstArgs>(args: Args) {
        try {
            const response: Result<MailFindFirstResponse<Args>> = await this.repository.mail
                .findFirst(args)
                .then(res => {
                    if (!res) {
                        return this.extractError<MailFindFirstResponse<Args>>(res, { title: 'Find Mail', message: 'Mail not found' })
                    }
                    return Result.success({ mail: res })
                }) as Result<MailFindFirstResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<MailFindFirstResponse<Args>>(err, { title: 'Find Mail', message: 'Cannot find mail' })
        }
    }

    async findExists<Args extends MailExistsArgs>(args: Args) {
        try {
            const response: Result<MailExistsResponse> = await this.repository.mail
                .findFirst(args)
                .then(res => {
                    if (!res) {
                        return this.extractError<MailExistsResponse>(res, { title: 'Mail Exists', message: 'Mail not found' })
                    }
                    return Result.success<MailExistsResponse>(true)
                })

            return response
        } catch (err: any) {
            return this.extractError<MailExistsResponse>(err, { title: 'Find Mail', message: 'Cannot find mail' })
        }
    }

    async findUnique<Args extends MailFindUniqueArgs>(args: Args) {
        try {
            const response: Result<MailFindUniqueResponse<Args>> = await this.repository.mail
                .findUnique(args)
                .then(res => {
                    if (!res) {
                        return this.extractError<MailFindUniqueResponse<Args>>(res, { title: 'Mail Mail', message: 'Mail not found' })
                    }
                    return Result.success({ mail: res })
                }) as Result<MailFindUniqueResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<MailFindUniqueResponse<Args>>(err, { title: 'Mail Mail', message: 'Mail not found' })
        }
    }

    async findFirstOrThrow<Args extends MailFindFirstOrThrowArgs>(args: Args) {
        try {
            const response: Result<MailFindFirstOrThrowResponse<Args>> = await this.repository.mail
                .findFirstOrThrow(args)
                .then(res => Result.success({ mail: res })) as Result<MailFindFirstOrThrowResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<MailFindFirstOrThrowResponse<Args>>(err, { title: 'Find Mail', message: 'Cannot find mail' })
        }
    }

    async findUniqueOrThrow<Args extends MailFindUniqueOrThrowArgs>(args: Args) {
        try {
            const response: Result<MailFindUniqueOrThrowResponse<Args>> = await this.repository.mail
                .findUniqueOrThrow(args)
                .then(res => Result.success({ mail: res })) as Result<MailFindUniqueOrThrowResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<MailFindUniqueOrThrowResponse<Args>>(err, { title: 'Find Mail', message: 'Cannot find mail' })
        }
    }

    async findMany<Args extends MailFindManyArgs>(args: Args) {
        try {
            const response: Result<MailFindManyResponse<Args>> = await this.repository.mail
                .findMany(args).then(res => Result.success({ mails: res })) as Result<MailFindManyResponse<Args>>

            return response
        } catch (err: any) {
            return this.extractError<MailFindManyResponse<Args>>(err, { title: 'Find Mails', message: 'Cannot find mails' })
        }
    }

    async delete<Args extends MailDeleteArgs>(args: Args) {
        try {
            const response: Result<MailDeleteResponse> = await this.repository.mail
                .delete(args).then(res => Result.success(true))

            return response
        } catch (err: any) {
            return this.extractError<MailDeleteResponse>(err, { title: 'Remove Mail', message: 'Cannot remove mail' })
        }
    }

    async deleteMany<Args extends MailDeleteManyArgs>(args: Args) {
        try {
            const response: Result<MailDeleteManyResponse> = await this.repository.mail
                .deleteMany(args).then(res => Result.success(res))

            return response
        } catch (err: any) {
            return this.extractError<MailDeleteManyResponse>(err, { title: 'Remove Mails', message: 'Cannot remove mails' })
        }
    }
}
