import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import {
    MailModelTableRepositoryAbstract,
    MailCreateArgs,
    MailCreateManyArgs,
    MailCreateResponse,
    MailCreateManyResponse
} from '@modules/mail/repository/repository'

export abstract class MailCreateRepositoryAbstract {
    perform: (args: MailCreateArgs) => Promise<Result<MailCreateResponse>>
}

@Injectable()
export class MailCreateRepository implements MailCreateRepositoryAbstract {
    constructor(private readonly repository: MailModelTableRepositoryAbstract) {}

    async perform(args: MailCreateArgs): Promise<Result<MailCreateResponse>> {
        const response = await this.repository.create(args)

        return response
    }
}

export abstract class MailCreateManyRepositoryAbstract {
    perform: (args: MailCreateManyArgs) => Promise<Result<MailCreateManyResponse>>
}

@Injectable()
export class MailCreateManyRepository implements MailCreateManyRepositoryAbstract {
    constructor(private readonly repository: MailModelTableRepositoryAbstract) {}

    async perform(args: MailCreateManyArgs): Promise<Result<MailCreateManyResponse>> {
        const response = await this.repository.createMany(args)

        return response
    }
}