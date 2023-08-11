import { Injectable } from '@nestjs/common'
import { Service } from '@common/service'
import { PrivilegeCreateUseCase, PrivilegeCreateUseCaseArgs } from '@modules/privilege/use-case/create.use-case'
import { PrivilegeFindOneUseCase, PrivilegeFindOneUseCaseArgs } from '@modules/privilege/use-case/find-one.use-case'
import { PrivilegeListUseCase, PrivilegeListUseCaseArgs } from '@modules/privilege/use-case/list.use-case'
import { PrivilegeUpdateUseCase, PrivilegeUpdateUseCaseArgs } from '@modules/privilege/use-case/update.use-case'
import { PrivilegeDeleteUseCase, PrivilegeDeleteUseCaseArgs } from '@modules/privilege/use-case/delete.use-case'
import { PrivilegeValidateUseCase, PrivilegeValidateUseCaseArgs } from '@modules/privilege/use-case/validate-privileges.use-case'
import { NeedAuthenticateByAccessPrivilegesUseCase } from './use-case/need-auth-acess-privilege'

@Injectable()
export class PrivilegeService extends Service {
    constructor(
        private readonly createUC: PrivilegeCreateUseCase,
        private readonly listUC: PrivilegeListUseCase,
        private readonly updateUC: PrivilegeUpdateUseCase,
        private readonly deleteUC: PrivilegeDeleteUseCase,
        private readonly findUC: PrivilegeFindOneUseCase,
        private readonly validatePrivilegeUC: PrivilegeValidateUseCase
    ) {
        super()
    }

    async getPrivileges(body?: PrivilegeListUseCaseArgs) {
        const response = await this.listUC.perform({ ...body })

        return response
    }

    async getPrivilege(body: PrivilegeFindOneUseCaseArgs) {
        const response = await this.findUC.perform({ ...body })

        return response
    }

    async create(body: PrivilegeCreateUseCaseArgs) {
        const response = await this.createUC.perform({ ...body })

        return response
    }

    async update(body: PrivilegeUpdateUseCaseArgs) {
        const response = await this.updateUC.perform({ ...body })

        return response
    }

    async delete(body: PrivilegeDeleteUseCaseArgs) {
        const response = await this.deleteUC.perform({ ...body })

        return response
    }

    async validatePrivilege(body: PrivilegeValidateUseCaseArgs) {
        const response = await this.validatePrivilegeUC.perform({ ...body })

        return response
    }

    isNeedAuthenticateByAccessPrivileges(...privileges: string[]) {
        const response = NeedAuthenticateByAccessPrivilegesUseCase({ privileges })

        return response
    }
}
