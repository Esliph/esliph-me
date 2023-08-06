import { Injectable } from '@nestjs/common'
import { Service } from '@common/service'
import { ErrorCreateUseCase, ErrorCreateUseCaseArgs } from '@modules/error/use-case/create.use-case'
import { ErrorFindOneUseCase, ErrorFindOneUseCaseArgs } from '@modules/error/use-case/find-one.use-case'
import { ErrorListUseCase, ErrorListUseCaseArgs } from '@modules/error/use-case/list.use-case'

@Injectable()
export class ErrorService extends Service {
    constructor(
        private readonly createUC: ErrorCreateUseCase,
        private readonly listUC: ErrorListUseCase,
        private readonly findUC: ErrorFindOneUseCase
    ) {
        super()
    }

    async getErrors(body?: ErrorListUseCaseArgs) {
        const response = await this.listUC.perform({ ...body })

        return response
    }

    async getError(body: ErrorFindOneUseCaseArgs) {
        const response = await this.findUC.perform({ ...body })

        return response
    }

    async create(body: ErrorCreateUseCaseArgs) {
        const response = await this.createUC.perform({ ...body })

        return response
    }
}
