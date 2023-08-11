import { Result } from '@esliph/util-node'
import { PrivilegeAccess, PrivilegeManage } from '@modules/privilege/privilege.manage'

export function NeedAuthenticateByAccessPrivilegesUseCase({ privileges: privilegesArgs }: { privileges: string[] }) {
    const allPrivileges = PrivilegeManage.getPrivilegesByName(privilegesArgs)

    const privilegesThatNeedAuthentication = PrivilegeManage.filterByNotTypeInPrivileges(allPrivileges, PrivilegeAccess.Global)

    return Result.success({ needAuthentication: !!privilegesThatNeedAuthentication.length })
}
