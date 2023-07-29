import { PrivilegeType, PrivilegeCore } from '@services/privilege'

export enum PrivilegeParams {
    Separator = '/'
}

export enum GlobalPrivileges {
    Ignore = 'ignore',
    Public = 'public',
    Private = 'private',
}

export const globalPrivileges = Object.keys(GlobalPrivileges).map(privilege => GlobalPrivileges[privilege]) as string[]

PrivilegeCore.registerPrivilege(...globalPrivileges.map(globalPrivilege => ({ name: globalPrivilege, type: PrivilegeType.Global })))
