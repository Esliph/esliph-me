import { ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { MetadataControl } from '@services/metadata'

export const PRIVILEGE_KEY_NAME = 'privileges'

export class PrivilegeCore {
    private static metadataController = new MetadataControl(new Reflector())

    static addPrivilege(...privileges: string[]) {
        return this.metadataController.set(PRIVILEGE_KEY_NAME, ...privileges)
    }

    static getPrivileges(context: ExecutionContext) {
        const privileges = this.metadataController.get<string>(PRIVILEGE_KEY_NAME, context)

        return privileges
    }
}
