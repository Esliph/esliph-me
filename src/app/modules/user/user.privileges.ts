import { PrivilegeAccess, PrivilegeOperational } from '@modules/privilege/operational/controller'
import { PrivilegeParams } from '@modules/privilege/global.privileges'

export const UserPrivilegeParent = 'users'

export enum UserPrivileges {
    Parent = UserPrivilegeParent,
    Create = UserPrivileges.Parent + PrivilegeParams.Separator + 'create',
    Update = UserPrivileges.Parent + PrivilegeParams.Separator + 'update',
    Delete = UserPrivileges.Parent + PrivilegeParams.Separator + 'delete',
    List = UserPrivileges.Parent + PrivilegeParams.Separator + 'list',
    Find = UserPrivileges.Parent + PrivilegeParams.Separator + 'find'
}

const userPrivileges: string[] = Object.keys(UserPrivileges).map(key => UserPrivileges[key])

PrivilegeOperational.registerPrivilege(...userPrivileges.map(privilege => ({ name: privilege, type: PrivilegeAccess.User })))
