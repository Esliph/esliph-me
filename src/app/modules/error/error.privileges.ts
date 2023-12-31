import { PrivilegeAccess, PrivilegeManage } from '@modules/privilege/privilege.manage'
import { PrivilegeParams } from '@modules/privilege/global.privileges'

export const ErrorPrivilegeParent = 'errors'

export enum ErrorPrivileges {
    Parent = ErrorPrivilegeParent,
    List = ErrorPrivileges.Parent + PrivilegeParams.Separator + 'list',
    Find = ErrorPrivileges.Parent + PrivilegeParams.Separator + 'find'
}

const errorPrivileges: string[] = Object.keys(ErrorPrivileges).map(key => ErrorPrivileges[key])

PrivilegeManage.registerPrivilege(...errorPrivileges.map(privilege => ({ name: privilege, type: PrivilegeAccess.User })))
