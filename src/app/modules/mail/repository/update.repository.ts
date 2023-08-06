import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import {
    MailModelTableRepositoryAbstract,
    MailUpdateResponse,
    MailUpdateArgs,
    MailUpdateManyResponse,
    MailUpdateManyArgs
} from '@modules/mail/repository/repository'

export abstract class MailUpdateRepositoryAbstract {
    perform: (args: MailUpdateArgs) => Promise<Result<MailUpdateResponse>>
}

@Injectable()
export class MailUpdateRepository implements MailUpdateRepositoryAbstract {
    constructor(private readonly repository: MailModelTableRepositoryAbstract) {}

    async perform(args: MailUpdateArgs): Promise<Result<MailUpdateResponse>> {
        const response = await this.repository.update(args)

        return response
    }
}

export abstract class MailUpdateManyRepositoryAbstract {
    perform: (args: MailUpdateManyArgs) => Promise<Result<MailUpdateManyResponse>>
}

@Injectable()
export class MailUpdateManyRepository implements MailUpdateManyRepositoryAbstract {
    constructor(private readonly repository: MailModelTableRepositoryAbstract) {}

    async perform(args: MailUpdateManyArgs): Promise<Result<MailUpdateManyResponse>> {
        const response = await this.repository.updateMany(args)

        return response
    }
}