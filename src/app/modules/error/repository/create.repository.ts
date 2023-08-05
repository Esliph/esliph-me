import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import {
    ErrorModelTableRepositoryAbstract,
    ErrorCreateArgs,
    ErrorCreateManyArgs,
    ErrorCreateResponse,
    ErrorCreateManyResponse
} from '@modules/error/repository/repository'

export abstract class ErrorCreateRepositoryAbstract {
    perform: (args: ErrorCreateArgs) => Promise<Result<ErrorCreateResponse>>
}

@Injectable()
export class ErrorCreateRepository implements ErrorCreateRepositoryAbstract {
    constructor(private readonly repository: ErrorModelTableRepositoryAbstract) {}

    async perform(args: ErrorCreateArgs): Promise<Result<ErrorCreateResponse>> {
        const response = await this.repository.create(args)

        return response
    }
}

export abstract class ErrorCreateManyRepositoryAbstract {
    perform: (args: ErrorCreateManyArgs) => Promise<Result<ErrorCreateManyResponse>>
}

@Injectable()
export class ErrorCreateManyRepository implements ErrorCreateManyRepositoryAbstract {
    constructor(private readonly repository: ErrorModelTableRepositoryAbstract) {}

    async perform(args: ErrorCreateManyArgs): Promise<Result<ErrorCreateManyResponse>> {
        const response = await this.repository.createMany(args)

        return response
    }
}