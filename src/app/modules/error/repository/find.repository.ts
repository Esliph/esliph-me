import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import {
    ErrorModelTableRepositoryAbstract,
    ErrorFindFirstArgs,
    ErrorFindFirstResponse,
    ErrorFindManyArgs,
    ErrorFindManyResponse,
    ErrorFindFirstOrThrowArgs,
    ErrorFindFirstOrThrowResponse,
    ErrorFindUniqueOrThrowArgs,
    ErrorFindUniqueOrThrowResponse,
    ErrorFindUniqueArgs,
    ErrorFindUniqueResponse,
    ErrorExistsArgs,
    ErrorExistsResponse
} from '@modules/error/repository/repository'

export abstract class ErrorFindUniqueRepositoryAbstract {
    perform: <Args extends ErrorFindUniqueArgs>(args: Args) => Promise<Result<ErrorFindUniqueResponse<Args>>>
}

@Injectable()
export class ErrorFindUniqueRepository implements ErrorFindUniqueRepositoryAbstract {
    constructor(private readonly repository: ErrorModelTableRepositoryAbstract) { }

    async perform<Args extends ErrorFindUniqueArgs>(args: Args): Promise<Result<ErrorFindUniqueResponse<Args>>> {
        const response = await this.repository.findUnique(args)

        return response
    }
}

export abstract class ErrorFindExistsRepositoryAbstract {
    perform: <Args extends ErrorExistsArgs>(args: Args) => Promise<Result<ErrorExistsResponse>>
}

@Injectable()
export class ErrorFindExistsRepository implements ErrorFindExistsRepositoryAbstract {
    constructor(private readonly repository: ErrorModelTableRepositoryAbstract) { }

    async perform<Args extends ErrorExistsArgs>(args: Args): Promise<Result<ErrorExistsResponse>> {
        const response = await this.repository.findExists(args)

        return response
    }
}

export abstract class ErrorFindFirstRepositoryAbstract {
    perform: <Args extends ErrorFindFirstArgs>(args: Args) => Promise<Result<ErrorFindFirstResponse<Args>>>
}

@Injectable()
export class ErrorFindFirstRepository implements ErrorFindFirstRepositoryAbstract {
    constructor(private readonly repository: ErrorModelTableRepositoryAbstract) { }

    async perform<Args extends ErrorFindFirstArgs>(args: Args): Promise<Result<ErrorFindFirstResponse<Args>>> {
        const response = await this.repository.findFirst(args)

        return response
    }
}

export abstract class ErrorFindManyRepositoryAbstract {
    perform: <Args extends ErrorFindManyArgs>(args: Args) => Promise<Result<ErrorFindManyResponse<Args>>>
}

@Injectable()
export class ErrorFindManyRepository implements ErrorFindManyRepositoryAbstract {
    constructor(private readonly repository: ErrorModelTableRepositoryAbstract) { }

    async perform<Args extends ErrorFindManyArgs>(args: Args): Promise<Result<ErrorFindManyResponse<Args>>> {
        const response = await this.repository.findMany(args)

        return response
    }
}

export abstract class ErrorFindFirstOrThrowRepositoryAbstract {
    perform: <Args extends ErrorFindFirstOrThrowArgs>(args: Args) => Promise<Result<ErrorFindFirstOrThrowResponse<Args>>>
}

@Injectable()
export class ErrorFindFirstOrThrowRepository implements ErrorFindFirstOrThrowRepositoryAbstract {
    constructor(private readonly repository: ErrorModelTableRepositoryAbstract) { }

    async perform<Args extends ErrorFindFirstOrThrowArgs>(args: Args): Promise<Result<ErrorFindFirstOrThrowResponse<Args>>> {
        const response = await this.repository.findFirstOrThrow(args)

        return response
    }
}

export abstract class ErrorFindUniqueOrThrowRepositoryAbstract {
    perform: <Args extends ErrorFindUniqueOrThrowArgs>(args: Args) => Promise<Result<ErrorFindUniqueOrThrowResponse<Args>>>
}

@Injectable()
export class ErrorFindUniqueOrThrowRepository implements ErrorFindUniqueOrThrowRepositoryAbstract {
    constructor(private readonly repository: ErrorModelTableRepositoryAbstract) { }

    async perform<Args extends ErrorFindUniqueOrThrowArgs>(args: Args): Promise<Result<ErrorFindUniqueOrThrowResponse<Args>>> {
        const response = await this.repository.findUniqueOrThrow(args)

        return response
    }
}
