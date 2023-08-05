import { Injectable } from '@nestjs/common'
import { HttpEsliph, Result } from '@esliph/util-node'
import { ErrorCreateUseCase, ErrorCreateUseCaseArgs } from '@modules/error/use-case/create.use-case'
import { ErrorFindOneUseCase, ErrorFindOneUseCaseArgs } from '@modules/error/use-case/find-one.use-case'
import { ErrorListUseCase, ErrorListUseCaseArgs } from '@modules/error/use-case/list.use-case'
import { ErrorUpdateUseCase, ErrorUpdateUseCaseArgs } from '@modules/error/use-case/update.use-case'
import { ErrorDeleteUseCase, ErrorDeleteUseCaseArgs } from '@modules/error/use-case/delete.use-case'

@Injectable()
export class ErrorService {
    constructor(
        private readonly createUC: ErrorCreateUseCase,
        private readonly listUC: ErrorListUseCase,
        private readonly updateUC: ErrorUpdateUseCase,
        private readonly deleteUC: ErrorDeleteUseCase,
        private readonly findUC: ErrorFindOneUseCase
    ) { }

    async getErrors(body?: ErrorListUseCaseArgs) {
        try {
            const response = await this.listUC.perform({ ...body })

            return response
        } catch (err) {
            return Result.failure(
                { title: 'List Errors', message: [{ message: 'Cannot get list errors', origin: 'ServerAPI' }] },
                HttpEsliph.HttpStatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getError(body: ErrorFindOneUseCaseArgs) {
        try {
            const response = await this.findUC.perform({ ...body })

            return response
        } catch (err) {
            return Result.failure(
                { title: 'Find Error', message: [{ message: 'Cannot get error', origin: 'ServerAPI' }] },
                HttpEsliph.HttpStatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async create(body: ErrorCreateUseCaseArgs) {
        try {
            const response = await this.createUC.perform({ ...body })

            return response
        } catch (err: any) {
            return Result.failure(
                { title: 'Create Error', message: [{ message: 'Cannot create error', origin: 'ServerAPI' }] },
                HttpEsliph.HttpStatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async update(body: ErrorUpdateUseCaseArgs) {
        try {
            const response = await this.updateUC.perform({ ...body })

            return response
        } catch (err: any) {
            return Result.failure(
                { title: 'Update Error', message: [{ message: 'Cannot update error', origin: 'ServerAPI' }] },
                HttpEsliph.HttpStatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async delete(body: ErrorDeleteUseCaseArgs) {
        try {
            const response = await this.deleteUC.perform({ ...body })

            return response
        } catch (err: any) {
            return Result.failure(
                { title: 'Delete Error', message: [{ message: 'Cannot delete error', origin: 'ServerAPI' }] },
                HttpEsliph.HttpStatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}