import { ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { MetadataControl } from '@services/metadata'
import { PrivilegeModel } from '@@types/privileges'

export const PRIVILEGE_KEY_NAME = 'privileges'

export enum PrivilegeType {
    Global = 'global',
    User = 'user',
    Root = '$root'
}

export class PrivilegeCore {
    private static privileges: PrivilegeModel[] = []
    private static metadataController = new MetadataControl(new Reflector())

    static registerPrivilege(...privileges: PrivilegeModel[]) {
        this.privileges.push(...privileges)
    }

    static extractPrivilegesOfContext(context: ExecutionContext) {
        const privileges = this.metadataController.get<string>(PRIVILEGE_KEY_NAME, context)

        return privileges.map(privilege => JSON.parse(privilege)) as PrivilegeModel[]
    }

    static addPrivilege(...privileges: string[]) {
        const privilegesModel = this.privileges.filter(privilege => privileges.find(privilegeRequest => privilege.name == privilegeRequest))

        return this.metadataController.set(PRIVILEGE_KEY_NAME, ...privilegesModel.map(privilege => JSON.stringify(privilege)))
    }

    static getPrivilegesByType(type: PrivilegeType) {
        return this.privileges.filter(privilege => privilege.type == type)
    }

    static getPrivilegeByName(name: string) {
        return this.privileges.find(privilege => privilege.name == name) || null
    }

    static filterByTypeInPrivileges(privileges: PrivilegeModel[], ...types: PrivilegeType[]) {
        return privileges.filter(privilege => types.find(type => privilege.type == type))
    }

    static filterByNotTypeInPrivileges(privileges: PrivilegeModel[], ...types: PrivilegeType[]) {
        return privileges.filter(privilege => !types.find(type => privilege.type == type))
    }

    static findByNameInPrivileges(privileges: PrivilegeModel[], ...names: string[]) {
        return privileges.filter(privilege => names.find(name => privilege.name == name))
    }
}
