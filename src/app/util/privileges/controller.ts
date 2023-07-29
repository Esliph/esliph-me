import { PrivilegeType } from '@services/privilege'
import { PrivilegeModel } from '@@types/privileges'

const GLOBAL_PERFORM_VALID_PRIVILEGES = {
    public: () => { return true },
    private: () => { return false },
    ignore: () => { return false },
}

export function ValidPrivileges(...privileges: PrivilegeModel[]) {
    for (let i = 0; i < privileges.length; i++) {
        const privilegeName = privileges[i]

        if (privilegeName.type != PrivilegeType.Global) { continue }

        if (!GLOBAL_PERFORM_VALID_PRIVILEGES[privilegeName.name]) { continue }

        if (!GLOBAL_PERFORM_VALID_PRIVILEGES[privilegeName.name]()) { return false }
    }

    return true
}
