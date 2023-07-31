import { HttpStatusCodes } from '@util/exceptions/http.exception'
import { ErrorType } from '@@types/error'
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import { Result, getEnv } from '@esliph/util-node'
import { AppCore } from '@core'
import { ErrorResultInfo } from '@esliph/util-node/dist/lib/error'

export abstract class DatabaseService extends PrismaClient { }

export class DatabaseModel {
    extractError<T>(err: any, methodErrorInfo: { title: string, message: string }) {
        let errorResultInfo: ErrorResultInfo

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            errorResultInfo = this.extractErrorIfPrismaClientKnownRequestError<T>(err, methodErrorInfo)
        } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
            errorResultInfo = this.extractErrorIfPrismaClientUnknownRequestError<T>(err, methodErrorInfo)
        } else {
            errorResultInfo = this.extractErrorUnknown<T>(methodErrorInfo)
        }

        return Result.failure<T>(errorResultInfo, HttpStatusCodes.BAD_REQUEST)
    }

    private extractErrorIfPrismaClientKnownRequestError<T>(err: Prisma.PrismaClientKnownRequestError, { title, message }: { title: string, message: string }): ErrorResultInfo {
        const errorResultInfo: ErrorResultInfo = {
            title,
            message,
            causes: [{ message: err.message, origin: (err.meta as any).target.join(';') }]
        }

        return errorResultInfo
    }

    private extractErrorIfPrismaClientUnknownRequestError<T>(err: Prisma.PrismaClientUnknownRequestError, { title, message }: { title: string, message: string }): ErrorResultInfo {
        const errorResultInfo: ErrorResultInfo = {
            title,
            message,
            causes: [{ message: err.message }]
        }

        return errorResultInfo
    }

    private extractErrorUnknown<T>({ title, message }: { title: string, message: string }): ErrorResultInfo {
        const errorResultInfo: ErrorResultInfo = {
            title,
            message,
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

            AppCore.log('Database connected successfully', 'Database')
        } catch (err: Prisma.PrismaClientInitializationError | any) {
            AppCore.emit('error', {
                title: 'Connection Database',
                message: 'Database connection failed',
                causes: [{ message: err.message, origin: err.errorCode }],
                stack: err.stack,
                type: ErrorType.Database
            })

            if (getEnv({ name: 'NODE_ENV' }) == 'production') {
                await this.$disconnect()
            }
        }
    }

    async enableShutdownHooks(app: INestApplication) {
        // @ts-expect-error
        this.$on('beforeExit', async () => {
            await AppCore.closeApp()
        })
    }

    private initComponent() {
        // @ts-expect-error
        this.$on('error', (ev: any) => {
            AppCore.emit('error', {
                title: 'PrismaService',
                message: ev.message,
                stack: ev.stack,
                causes: [{ message: ev.message, origin: `${ev.errorCode}${ev.meta?.target ? `: [${ev.meta.target.join(';')}]` : ''}` }],
                type: ErrorType.Database
            })
        })
        // @ts-expect-error
        this.$on('info', (ev: any) => {
            // AppCore.console.log(ev, null, { context: '[DatabaseEvent]' })
        })
        // @ts-expect-error
        this.$on('query', ev => {
            // AppCore.console.log(ev.message, null, { context: '[DatabaseEvent]' })
        })
        // @ts-expect-error
        this.$on('warn', (ev: any) => {
            // AppCore.console.warn(ev.message, null, { context: '[DatabaseEvent]' })
        })
    }
}
