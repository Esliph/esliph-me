import { PrivilegeAccess } from '@modules/privilege/operational/controller'

export type PrivilegeModel = {
    name: string,
    type: PrivilegeAccess
}
