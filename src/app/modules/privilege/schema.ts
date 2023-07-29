import { Privilege as PrivilegeModelPrisma } from '@prisma/client'

export type PrivilegeModelTable = PrivilegeModelPrisma

export type PrivilegeModelSimple = {
    /* Define props of "Privilege" */
}

export class PrivilegeEntityTable implements PrivilegeModelTable {
    id: number
    createAt: Date
    updateAt: Date

    constructor({ }: PrivilegeModelTable) {
        throw new Error('Method not implemented')
    }
}

export class PrivilegeEntitySimple implements PrivilegeModelSimple {

    constructor({ }: PrivilegeModelSimple) {
        throw new Error('Method not implemented')
    }
}
