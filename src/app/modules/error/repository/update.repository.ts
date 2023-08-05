import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import {
    ErrorModelTableRepositoryAbstract,
    ErrorUpdateResponse,
    ErrorUpdateArgs,
    ErrorUpdateManyResponse,
    ErrorUpdateManyArgs
} from '@modules/error/repository/repository'

export abstract class ErrorUpdateRepositoryAbstract {
    perform: (args: ErrorUpdateArgs) => Promise<Result<ErrorUpdateResponse>>
}

@Injectable()
export class ErrorUpdateRepository implements ErrorUpdateRepositoryAbstract {
    constructor(private readonly repository: ErrorModelTableRepositoryAbstract) {}

    async perform(args: ErrorUpdateArgs): Promise<Result<ErrorUpdateResponse>> {
        const response = await this.repository.update(args)

        return response
    }
}

export abstract class ErrorUpdateManyRepositoryAbstract {
    perform: (args: ErrorUpdateManyArgs) => Promise<Result<ErrorUpdateManyResponse>>
}

@Injectable()
export class ErrorUpdateManyRepository implements ErrorUpdateManyRepositoryAbstract {
    constructor(private readonly repository: ErrorModelTableRepositoryAbstract) {}

    async perform(args: ErrorUpdateManyArgs): Promise<Result<ErrorUpdateManyResponse>> {
        const response = await this.repository.updateMany(args)

        return response
    }
}