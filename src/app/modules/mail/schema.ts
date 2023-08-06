import { $Enums, Mail as MailModelPrisma, MailStatus } from '@prisma/client'

export type MailModelTable = MailModelPrisma

export { MailStatus }

export type MailModelSimple = {
    title: string
    body: string
    status: $Enums.MailStatus
    sender: string
    recipients: string[]
    sentAt: Date | null
}

export class MailEntityTable implements MailModelTable {
    id: number
    title: string
    body: string
    status: $Enums.MailStatus
    sender: string
    recipients: string[]
    createAt: Date
    updateAt: Date
    sentAt: Date | null

    constructor({ body, createAt, id, recipients, sender, status, title, updateAt, sentAt }: MailModelTable) {
        this.body = body
        this.createAt = createAt
        this.id = id
        this.recipients = recipients
        this.sender = sender
        this.status = status
        this.title = title
        this.updateAt = updateAt
        this.sentAt = sentAt
    }
}

export class MailEntitySimple implements MailModelSimple {
    title: string
    body: string
    status: $Enums.MailStatus
    sender: string
    recipients: string[]
    sentAt: Date | null

    constructor({ body, recipients, sender, sentAt, status, title }: MailModelSimple) {
        this.body = body
        this.recipients = recipients
        this.sender = sender
        this.status = status
        this.title = title
        this.sentAt = sentAt
    }
}
