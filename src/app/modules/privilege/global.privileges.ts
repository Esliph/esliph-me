import { PrivilegeAccess, PrivilegeManage } from '@modules/privilege/privilege.manage'

export enum PrivilegeParams {
    Separator = '/'
}

export enum GlobalPrivileges {
    Ignore = 'ignore',
    Public = 'public',
    Private = 'private'
}

export const globalPrivileges = Object.keys(GlobalPrivileges).map(privilege => GlobalPrivileges[privilege]) as string[]

PrivilegeManage.registerPrivilege(...globalPrivileges.map(globalPrivilege => ({ name: globalPrivilege, type: PrivilegeAccess.Global })))
