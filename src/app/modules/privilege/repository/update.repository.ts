import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import {
    PrivilegeModelTableRepositoryAbstract,
    PrivilegeUpdateResponse,
    PrivilegeUpdateArgs,
    PrivilegeUpdateManyResponse,
    PrivilegeUpdateManyArgs
} from '@modules/privilege/repository/repository'

export abstract class PrivilegeUpdateRepositoryAbstract {
    perform: (args: PrivilegeUpdateArgs) => Promise<Result<PrivilegeUpdateResponse>>
}

@Injectable()
export class PrivilegeUpdateRepository implements PrivilegeUpdateRepositoryAbstract {
    constructor(private readonly repository: PrivilegeModelTableRepositoryAbstract) {}

    async perform(args: PrivilegeUpdateArgs): Promise<Result<PrivilegeUpdateResponse>> {
        const response = await this.repository.update(args)

        return response
    }
}

export abstract class PrivilegeUpdateManyRepositoryAbstract {
    perform: (args: PrivilegeUpdateManyArgs) => Promise<Result<PrivilegeUpdateManyResponse>>
}

@Injectable()
export class PrivilegeUpdateManyRepository implements PrivilegeUpdateManyRepositoryAbstract {
    constructor(private readonly repository: PrivilegeModelTableRepositoryAbstract) {}

    async perform(args: PrivilegeUpdateManyArgs): Promise<Result<PrivilegeUpdateManyResponse>> {
        const response = await this.repository.updateMany(args)

        return response
    }
}