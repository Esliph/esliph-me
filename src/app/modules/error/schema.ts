import { Error as ErrorModelPrisma } from '@prisma/client'
import { HashEsliph } from '@esliph/util-node'

export type ErrorModelTable = ErrorModelPrisma

export type ErrorModelSimple = {
    /* Define props of "Error" */
}

export class ErrorEntityTable implements ErrorModelTable {

    constructor({}: ErrorModelTable) {
        throw new Error('Method not implemented')
    }
}

export class ErrorEntitySimple implements ErrorModelSimple {

    constructor({}: ErrorModelSimple) {
        throw new Error('Method not implemented')
    }
}