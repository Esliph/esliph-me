import { HttpStatusCodes } from '@util/http/status-code'
import { ErrorType } from '@modules/error/schema'
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import { Result, getEnv } from '@esliph/util-node'
import { Application } from '@core'
import { ErrorResultInfo } from '@esliph/util-node/dist/lib/error'

export abstract class DatabaseService extends PrismaClient { }

export class DatabaseModel {
    extractError<T>(err: any, methodErrorInfo: { title: string; message: string }) {
        let errorResultInfo: ErrorResultInfo

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            errorResultInfo = this.extractErrorIfPrismaClientKnownRequestError(err, methodErrorInfo)
        } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
            errorResultInfo = this.extractErrorIfPrismaClientUnknownRequestError(err, methodErrorInfo)
        } else {
            errorResultInfo = this.extractErrorUnknown(methodErrorInfo)
        }

        return Result.failure<T>(errorResultInfo, HttpStatusCodes.BAD_REQUEST)
    }

    private extractErrorIfPrismaClientKnownRequestError(
        err: Prisma.PrismaClientKnownRequestError,
        { title, message }: { title: string; message: string }
    ): ErrorResultInfo {
        const errorResultInfo: ErrorResultInfo = {
            title,
            message,
            causes: [{ message: err.message, origin: (err.meta as any).target.join(';') }]
        }

        return errorResultInfo
    }

    private extractErrorIfPrismaClientUnknownRequestError(
        err: Prisma.PrismaClientUnknownRequestError,
        { title, message }: { title: string; message: string }
    ): ErrorResultInfo {
        const errorResultInfo: ErrorResultInfo = {
            title,
            message,
            causes: [{ message: err.message }]
        }

        return errorResultInfo
    }

    private extractErrorUnknown({ title, message }: { title: string; message: string }): ErrorResultInfo {
        const errorResultInfo: ErrorResultInfo = {
            title,
            message
        }

        return errorResultInfo
    }
}

@Injectable()
export class PrismaService extends DatabaseService implements OnModuleInit, DatabaseService {
    constructor() {
        super({
            log: [
                { emit: 'event', level: 'error' },
                { emit: 'event', level: 'info' },
                { emit: 'event', level: 'query' },
                { emit: 'event', level: 'warn' }
            ]
        })

        this.initComponent()
    }

    async onModuleInit() {
        try {
            await this.$connect()

            Application.log('Database connected successfully', 'Database')
        } catch (err: Prisma.PrismaClientInitializationError | any) {
            const errorEvent = {
                title: 'Connection Database',
                message: 'Database connection failed',
                causes: [{ message: err.message, origin: err.errorCode }],
                stack: err.stack,
                type: ErrorType.Database
            }

            Application.emit('error', errorEvent)

            if (getEnv({ name: 'NODE_ENV' }) == 'production') {
                await this.$disconnect()
            }

            Application.error('Database connection failed', 'Database')
        }
    }

    async enableShutdownHooks(app: INestApplication) {
        // @ts-expect-error
        this.$on('beforeExit', async () => {
            await Application.closeApp()
        })
    }

    private initComponent() {
        // @ts-expect-error
        this.$on('error', (err: any) => {
            const erroEvent = {
                title: 'PrismaService',
                message: err.message,
                stack: err.stack,
                causes: [{ message: err.message, origin: `${err.errorCode}${err.meta?.target ? `: [${err.meta.target.join(';')}]` : ''}` }],
                type: ErrorType.Database
            }

            Application.emit('error', erroEvent)
        })
        // @ts-expect-error
        this.$on('info', (err: any) => {
            // Application.log(err, 'DatabaseEvent')
        })
        // @ts-expect-error
        this.$on('query', err => {
            // Application.log(err, 'DatabaseEvent')
        })
        // @ts-expect-error
        this.$on('warn', (err: any) => {
            // Application.warn(err, 'DatabaseEvent')
        })
    }
}
