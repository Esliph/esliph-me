import { PrivilegeManage } from '@modules/privilege/privilege.manage'

export const Privilege = (...privileges: string[]) => {
    return PrivilegeManage.addPrivilege(...privileges)
}
