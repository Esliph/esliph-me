import { Injectable } from '@nestjs/common'
import { HttpEsliph, Result } from '@esliph/util-node'
import { PrivilegeCreateUseCase, PrivilegeCreateUseCaseArgs } from '@modules/privilege/use-case/create.use-case'
import { PrivilegeFindOneUseCase, PrivilegeFindOneUseCaseArgs } from '@modules/privilege/use-case/find-one.use-case'
import { PrivilegeListUseCase, PrivilegeListUseCaseArgs } from '@modules/privilege/use-case/list.use-case'
import { PrivilegeUpdateUseCase, PrivilegeUpdateUseCaseArgs } from '@modules/privilege/use-case/update.use-case'
import { PrivilegeDeleteUseCase, PrivilegeDeleteUseCaseArgs } from '@modules/privilege/use-case/delete.use-case'

@Injectable()
export class PrivilegeService {
    constructor(
        private readonly createUC: PrivilegeCreateUseCase,
        private readonly listUC: PrivilegeListUseCase,
        private readonly updateUC: PrivilegeUpdateUseCase,
        private readonly deleteUC: PrivilegeDeleteUseCase,
        private readonly findUC: PrivilegeFindOneUseCase
    ) { }

    async getPrivileges(body?: PrivilegeListUseCaseArgs) {
        try {
            const response = await this.listUC.perform({ ...body })

            return response
        } catch (err) {
            return Result.failure(
                { title: 'List Privileges', message: [{ message: 'Cannot get list privileges', origin: 'ServerAPI' }] },
                HttpEsliph.HttpStatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getPrivilege(body: PrivilegeFindOneUseCaseArgs) {
        try {
            const response = await this.findUC.perform({ ...body })

            return response
        } catch (err) {
            return Result.failure(
                { title: 'Find Privilege', message: [{ message: 'Cannot get privilege', origin: 'ServerAPI' }] },
                HttpEsliph.HttpStatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async create(body: PrivilegeCreateUseCaseArgs) {
        try {
            const response = await this.createUC.perform({ ...body })

            return response
        } catch (err: any) {
            return Result.failure(
                { title: 'Create Privilege', message: [{ message: 'Cannot create privilege', origin: 'ServerAPI' }] },
                HttpEsliph.HttpStatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async update(body: PrivilegeUpdateUseCaseArgs) {
        try {
            const response = await this.updateUC.perform({ ...body })

            return response
        } catch (err: any) {
            return Result.failure(
                { title: 'Update Privilege', message: [{ message: 'Cannot update privilege', origin: 'ServerAPI' }] },
                HttpEsliph.HttpStatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async delete(body: PrivilegeDeleteUseCaseArgs) {
        try {
            const response = await this.deleteUC.perform({ ...body })

            return response
        } catch (err: any) {
            return Result.failure(
                { title: 'Delete Privilege', message: [{ message: 'Cannot delete privilege', origin: 'ServerAPI' }] },
                HttpEsliph.HttpStatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}