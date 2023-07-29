import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import {
    PrivilegeModelTableRepositoryAbstract,
    PrivilegeCreateArgs,
    PrivilegeCreateManyArgs,
    PrivilegeCreateResponse,
    PrivilegeCreateManyResponse
} from '@modules/privilege/repository/repository'

export abstract class PrivilegeCreateRepositoryAbstract {
    perform: (args: PrivilegeCreateArgs) => Promise<Result<PrivilegeCreateResponse>>
}

@Injectable()
export class PrivilegeCreateRepository implements PrivilegeCreateRepositoryAbstract {
    constructor(private readonly repository: PrivilegeModelTableRepositoryAbstract) {}

    async perform(args: PrivilegeCreateArgs): Promise<Result<PrivilegeCreateResponse>> {
        const response = await this.repository.create(args)

        return response
    }
}

export abstract class PrivilegeCreateManyRepositoryAbstract {
    perform: (args: PrivilegeCreateManyArgs) => Promise<Result<PrivilegeCreateManyResponse>>
}

@Injectable()
export class PrivilegeCreateManyRepository implements PrivilegeCreateManyRepositoryAbstract {
    constructor(private readonly repository: PrivilegeModelTableRepositoryAbstract) {}

    async perform(args: PrivilegeCreateManyArgs): Promise<Result<PrivilegeCreateManyResponse>> {
        const response = await this.repository.createMany(args)

        return response
    }
}