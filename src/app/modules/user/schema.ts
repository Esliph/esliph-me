import { HashEsliph } from '@esliph/util-node'
import { User as UserModelPrisma } from '@prisma/client'

export type UserModelTable = UserModelPrisma

export type UserModelSimple = {
    username: string;
    name: string;
    email: string;
    password: string;
    online: boolean
}

export class UserEntityTable implements UserModelTable {
    id: number
    name: string
    username: string
    email: string
    password: string
    createAt: Date
    online: boolean
    updateAt: Date

    constructor({ createAt, email, id, password, updateAt, username, online, name }: UserModelTable) {
        this.id = id
        this.createAt = createAt
        this.updateAt = updateAt
        this.password = password
        this.email = email
        this.username = username
        this.name = name
        this.online = online
    }

    update({ email, username, name }: Partial<Pick<UserModelTable, 'name' | 'email' | 'username'>>) {
        if (email) this.email = email
        if (username) this.username = username
        if (name) this.name = name
        this.updateAt = new Date(Date.now())
    }
}

export class UserEntitySimple implements UserModelSimple {
    username: string
    email: string
    password: string
    name: string
    online: boolean

    constructor({ email, password, username, name, online }: UserModelSimple) {
        this.email = email
        this.password = password
        this.username = username
        this.name = name
        this.online = online
    }

    async cryptPassword() {
        const passwordHash = await HashEsliph.generateHash(this.password)

        this.password = passwordHash
    }
}
