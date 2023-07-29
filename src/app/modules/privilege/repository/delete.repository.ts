import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import {
    PrivilegeModelTableRepositoryAbstract,
    PrivilegeDeleteArgs,
    PrivilegeDeleteResponse,
    PrivilegeDeleteManyArgs,
    PrivilegeDeleteManyResponse
} from '@modules/privilege/repository/repository'

export abstract class PrivilegeDeleteRepositoryAbstract {
    perform: (args: PrivilegeDeleteArgs) => Promise<Result<PrivilegeDeleteResponse>>
}

@Injectable()
export class PrivilegeDeleteRepository implements PrivilegeDeleteRepositoryAbstract {
    constructor(private readonly repository: PrivilegeModelTableRepositoryAbstract) {}

    async perform(args: PrivilegeDeleteArgs): Promise<Result<PrivilegeDeleteResponse>> {
        const response = await this.repository.delete(args)

        return response
    }
}

export abstract class PrivilegeDeleteManyRepositoryAbstract {
    perform: (args: PrivilegeDeleteManyArgs) => Promise<Result<PrivilegeDeleteManyResponse>>
}

@Injectable()
export class PrivilegeDeleteManyRepository implements PrivilegeDeleteManyRepositoryAbstract {
    constructor(private readonly repository: PrivilegeModelTableRepositoryAbstract) {}

    async perform(args: PrivilegeDeleteManyArgs): Promise<Result<PrivilegeDeleteManyResponse>> {
        const response = await this.repository.deleteMany(args)

        return response
    }
}