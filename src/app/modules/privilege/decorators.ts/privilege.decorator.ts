import { PrivilegeOperational } from '@modules/privilege/operational/controller'

export const Privilege = (...privileges: string[]) => {
    return PrivilegeOperational.addPrivilege(...privileges)
}
