import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import {
    ErrorModelTableRepositoryAbstract,
    ErrorDeleteArgs,
    ErrorDeleteResponse,
    ErrorDeleteManyArgs,
    ErrorDeleteManyResponse
} from '@modules/error/repository/repository'

export abstract class ErrorDeleteRepositoryAbstract {
    perform: (args: ErrorDeleteArgs) => Promise<Result<ErrorDeleteResponse>>
}

@Injectable()
export class ErrorDeleteRepository implements ErrorDeleteRepositoryAbstract {
    constructor(private readonly repository: ErrorModelTableRepositoryAbstract) {}

    async perform(args: ErrorDeleteArgs): Promise<Result<ErrorDeleteResponse>> {
        const response = await this.repository.delete(args)

        return response
    }
}

export abstract class ErrorDeleteManyRepositoryAbstract {
    perform: (args: ErrorDeleteManyArgs) => Promise<Result<ErrorDeleteManyResponse>>
}

@Injectable()
export class ErrorDeleteManyRepository implements ErrorDeleteManyRepositoryAbstract {
    constructor(private readonly repository: ErrorModelTableRepositoryAbstract) {}

    async perform(args: ErrorDeleteManyArgs): Promise<Result<ErrorDeleteManyResponse>> {
        const response = await this.repository.deleteMany(args)

        return response
    }
}