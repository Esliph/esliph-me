import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import {
    MailModelTableRepositoryAbstract,
    MailFindFirstArgs,
    MailFindFirstResponse,
    MailFindManyArgs,
    MailFindManyResponse,
    MailFindFirstOrThrowArgs,
    MailFindFirstOrThrowResponse,
    MailFindUniqueOrThrowArgs,
    MailFindUniqueOrThrowResponse,
    MailFindUniqueArgs,
    MailFindUniqueResponse,
    MailExistsArgs,
    MailExistsResponse
} from '@modules/mail/repository/repository'

export abstract class MailFindUniqueRepositoryAbstract {
    perform: <Args extends MailFindUniqueArgs>(args: Args) => Promise<Result<MailFindUniqueResponse<Args>>>
}

@Injectable()
export class MailFindUniqueRepository implements MailFindUniqueRepositoryAbstract {
    constructor(private readonly repository: MailModelTableRepositoryAbstract) {}

    async perform<Args extends MailFindUniqueArgs>(args: Args): Promise<Result<MailFindUniqueResponse<Args>>> {
        const response = await this.repository.findUnique(args)

        return response
    }
}

export abstract class MailFindExistsRepositoryAbstract {
    perform: <Args extends MailExistsArgs>(args: Args) => Promise<Result<MailExistsResponse>>
}

@Injectable()
export class MailFindExistsRepository implements MailFindExistsRepositoryAbstract {
    constructor(private readonly repository: MailModelTableRepositoryAbstract) {}

    async perform<Args extends MailExistsArgs>(args: Args): Promise<Result<MailExistsResponse>> {
        const response = await this.repository.findExists(args)

        return response
    }
}

export abstract class MailFindFirstRepositoryAbstract {
    perform: <Args extends MailFindFirstArgs>(args: Args) => Promise<Result<MailFindFirstResponse<Args>>>
}

@Injectable()
export class MailFindFirstRepository implements MailFindFirstRepositoryAbstract {
    constructor(private readonly repository: MailModelTableRepositoryAbstract) {}

    async perform<Args extends MailFindFirstArgs>(args: Args): Promise<Result<MailFindFirstResponse<Args>>> {
        const response = await this.repository.findFirst(args)

        return response
    }
}

export abstract class MailFindManyRepositoryAbstract {
    perform: <Args extends MailFindManyArgs>(args: Args) => Promise<Result<MailFindManyResponse<Args>>>
}

@Injectable()
export class MailFindManyRepository implements MailFindManyRepositoryAbstract {
    constructor(private readonly repository: MailModelTableRepositoryAbstract) {}

    async perform<Args extends MailFindManyArgs>(args: Args): Promise<Result<MailFindManyResponse<Args>>> {
        const response = await this.repository.findMany(args)

        return response
    }
}

export abstract class MailFindFirstOrThrowRepositoryAbstract {
    perform: <Args extends MailFindFirstOrThrowArgs>(args: Args) => Promise<Result<MailFindFirstOrThrowResponse<Args>>>
}

@Injectable()
export class MailFindFirstOrThrowRepository implements MailFindFirstOrThrowRepositoryAbstract {
    constructor(private readonly repository: MailModelTableRepositoryAbstract) {}

    async perform<Args extends MailFindFirstOrThrowArgs>(args: Args): Promise<Result<MailFindFirstOrThrowResponse<Args>>> {
        const response = await this.repository.findFirstOrThrow(args)

        return response
    }
}

export abstract class MailFindUniqueOrThrowRepositoryAbstract {
    perform: <Args extends MailFindUniqueOrThrowArgs>(args: Args) => Promise<Result<MailFindUniqueOrThrowResponse<Args>>>
}

@Injectable()
export class MailFindUniqueOrThrowRepository implements MailFindUniqueOrThrowRepositoryAbstract {
    constructor(private readonly repository: MailModelTableRepositoryAbstract) {}

    async perform<Args extends MailFindUniqueOrThrowArgs>(args: Args): Promise<Result<MailFindUniqueOrThrowResponse<Args>>> {
        const response = await this.repository.findUniqueOrThrow(args)

        return response
    }
}