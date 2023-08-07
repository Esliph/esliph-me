import { Privilege as PrivilegeModelPrisma } from '@prisma/client'
import { PrivilegeAccess } from '@modules/privilege/privilege.manage'

export type PrivilegeModelTable = PrivilegeModelPrisma

export type PrivilegeModelSimple = {
    /* Define props of "Privilege" */
}

export type PrivilegeModel = {
    name: string
    type: PrivilegeAccess
}

export class PrivilegeEntityTable implements PrivilegeModelTable {
    id: number
    createAt: Date
    updateAt: Date

    constructor({}: PrivilegeModelTable) {
        throw new Error('Method not implemented')
    }
}

export class PrivilegeEntitySimple implements PrivilegeModelSimple {
    constructor({}: PrivilegeModelSimple) {
        throw new Error('Method not implemented')
    }
}
