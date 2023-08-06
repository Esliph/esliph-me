import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import {
    MailModelTableRepositoryAbstract,
    MailDeleteArgs,
    MailDeleteResponse,
    MailDeleteManyArgs,
    MailDeleteManyResponse
} from '@modules/mail/repository/repository'

export abstract class MailDeleteRepositoryAbstract {
    perform: (args: MailDeleteArgs) => Promise<Result<MailDeleteResponse>>
}

@Injectable()
export class MailDeleteRepository implements MailDeleteRepositoryAbstract {
    constructor(private readonly repository: MailModelTableRepositoryAbstract) {}

    async perform(args: MailDeleteArgs): Promise<Result<MailDeleteResponse>> {
        const response = await this.repository.delete(args)

        return response
    }
}

export abstract class MailDeleteManyRepositoryAbstract {
    perform: (args: MailDeleteManyArgs) => Promise<Result<MailDeleteManyResponse>>
}

@Injectable()
export class MailDeleteManyRepository implements MailDeleteManyRepositoryAbstract {
    constructor(private readonly repository: MailModelTableRepositoryAbstract) {}

    async perform(args: MailDeleteManyArgs): Promise<Result<MailDeleteManyResponse>> {
        const response = await this.repository.deleteMany(args)

        return response
    }
}