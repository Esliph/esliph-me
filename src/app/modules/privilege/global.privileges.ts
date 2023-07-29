import { PrivilegeAccess, PrivilegeOperational } from '@modules/privilege/operational/controller'

export enum PrivilegeParams {
    Separator = '/'
}

export enum GlobalPrivileges {
    Ignore = 'ignore',
    Public = 'public',
    Private = 'private',
}

export const globalPrivileges = Object.keys(GlobalPrivileges).map(privilege => GlobalPrivileges[privilege]) as string[]

PrivilegeOperational.registerPrivilege(...globalPrivileges.map(globalPrivilege => ({ name: globalPrivilege, type: PrivilegeAccess.Global })))
