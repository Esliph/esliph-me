import { PrivilegeAccess, PrivilegeManage } from '@modules/privilege/privilege.manage'
import { PrivilegeParams } from '@modules/privilege/global.privileges'

export const MailPrivilegeParent = 'mails'

export enum MailPrivileges {
    Parent = MailPrivilegeParent,
    Send = MailPrivileges.Parent + PrivilegeParams.Separator + 'send',
    List = MailPrivileges.Parent + PrivilegeParams.Separator + 'list',
    Find = MailPrivileges.Parent + PrivilegeParams.Separator + 'find',
    Update = MailPrivileges.Parent + PrivilegeParams.Separator + 'update'
}

const mailPrivileges: string[] = Object.keys(MailPrivileges).map(key => MailPrivileges[key])

PrivilegeManage.registerPrivilege(...mailPrivileges.map(privilege => ({ name: privilege, type: PrivilegeAccess.User })))
