import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import {
    PrivilegeModelTableRepositoryAbstract,
    PrivilegeFindFirstArgs,
    PrivilegeFindFirstResponse,
    PrivilegeFindManyArgs,
    PrivilegeFindManyResponse,
    PrivilegeFindFirstOrThrowArgs,
    PrivilegeFindFirstOrThrowResponse,
    PrivilegeFindUniqueOrThrowArgs,
    PrivilegeFindUniqueOrThrowResponse,
    PrivilegeFindUniqueArgs,
    PrivilegeFindUniqueResponse,
    PrivilegeExistsArgs,
    PrivilegeExistsResponse
} from '@modules/privilege/repository/repository'

export abstract class PrivilegeFindUniqueRepositoryAbstract {
    perform: <Args extends PrivilegeFindUniqueArgs>(args: Args) => Promise<Result<PrivilegeFindUniqueResponse<Args>>>
}

@Injectable()
export class PrivilegeFindUniqueRepository implements PrivilegeFindUniqueRepositoryAbstract {
    constructor(private readonly repository: PrivilegeModelTableRepositoryAbstract) {}

    async perform<Args extends PrivilegeFindUniqueArgs>(args: Args): Promise<Result<PrivilegeFindUniqueResponse<Args>>> {
        const response = await this.repository.findUnique(args)

        return response
    }
}

export abstract class PrivilegeFindExistsRepositoryAbstract {
    perform: <Args extends PrivilegeExistsArgs>(args: Args) => Promise<Result<PrivilegeExistsResponse>>
}

@Injectable()
export class PrivilegeFindExistsRepository implements PrivilegeFindExistsRepositoryAbstract {
    constructor(private readonly repository: PrivilegeModelTableRepositoryAbstract) {}

    async perform<Args extends PrivilegeExistsArgs>(args: Args): Promise<Result<PrivilegeExistsResponse>> {
        const response = await this.repository.findExists(args)

        return response
    }
}

export abstract class PrivilegeFindFirstRepositoryAbstract {
    perform: <Args extends PrivilegeFindFirstArgs>(args: Args) => Promise<Result<PrivilegeFindFirstResponse<Args>>>
}

@Injectable()
export class PrivilegeFindFirstRepository implements PrivilegeFindFirstRepositoryAbstract {
    constructor(private readonly repository: PrivilegeModelTableRepositoryAbstract) {}

    async perform<Args extends PrivilegeFindFirstArgs>(args: Args): Promise<Result<PrivilegeFindFirstResponse<Args>>> {
        const response = await this.repository.findFirst(args)

        return response
    }
}

export abstract class PrivilegeFindManyRepositoryAbstract {
    perform: <Args extends PrivilegeFindManyArgs>(args: Args) => Promise<Result<PrivilegeFindManyResponse<Args>>>
}

@Injectable()
export class PrivilegeFindManyRepository implements PrivilegeFindManyRepositoryAbstract {
    constructor(private readonly repository: PrivilegeModelTableRepositoryAbstract) {}

    async perform<Args extends PrivilegeFindManyArgs>(args: Args): Promise<Result<PrivilegeFindManyResponse<Args>>> {
        const response = await this.repository.findMany(args)

        return response
    }
}

export abstract class PrivilegeFindFirstOrThrowRepositoryAbstract {
    perform: <Args extends PrivilegeFindFirstOrThrowArgs>(args: Args) => Promise<Result<PrivilegeFindFirstOrThrowResponse<Args>>>
}

@Injectable()
export class PrivilegeFindFirstOrThrowRepository implements PrivilegeFindFirstOrThrowRepositoryAbstract {
    constructor(private readonly repository: PrivilegeModelTableRepositoryAbstract) {}

    async perform<Args extends PrivilegeFindFirstOrThrowArgs>(args: Args): Promise<Result<PrivilegeFindFirstOrThrowResponse<Args>>> {
        const response = await this.repository.findFirstOrThrow(args)

        return response
    }
}

export abstract class PrivilegeFindUniqueOrThrowRepositoryAbstract {
    perform: <Args extends PrivilegeFindUniqueOrThrowArgs>(args: Args) => Promise<Result<PrivilegeFindUniqueOrThrowResponse<Args>>>
}

@Injectable()
export class PrivilegeFindUniqueOrThrowRepository implements PrivilegeFindUniqueOrThrowRepositoryAbstract {
    constructor(private readonly repository: PrivilegeModelTableRepositoryAbstract) {}

    async perform<Args extends PrivilegeFindUniqueOrThrowArgs>(args: Args): Promise<Result<PrivilegeFindUniqueOrThrowResponse<Args>>> {
        const response = await this.repository.findUniqueOrThrow(args)

        return response
    }
}