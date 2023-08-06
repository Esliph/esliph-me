import { ENUM_USER_MESSAGES } from '@modules/user/user.messages'
import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { } from 'class-validator'
import { z } from 'zod'
import { UseCase } from '@common/use-case'
import { ZodValidateService } from '@services/zod'
import { HttpStatusCodes } from '@util/http/status-code'
import { MailEntitySimple, MailStatus } from '@modules/mail/schema'
import { ENUM_MAIL_MESSAGES } from '@modules/mail/mail.messages'
import { MailCreateRepositoryAbstract } from '@modules/mail/repository/create.repository'

export const MailCreateUseCaseArgsSchema = z.object({
    title: z.string().nonempty({ message: ENUM_MAIL_MESSAGES.TITLE_IS_EMPTY }),
    body: z.string().optional().transform(val => `${val}`),
    sender: z.string().email({ message: ENUM_USER_MESSAGES.FORMAT_EMAIL_INVALID }).nonempty({ message: ENUM_MAIL_MESSAGES.SENDER_IS_EMPTY }),
    recipients: z.union([
        z.string().email({ message: ENUM_USER_MESSAGES.FORMAT_EMAIL_INVALID }),
        z.array(z.string().email({ message: ENUM_USER_MESSAGES.FORMAT_EMAIL_INVALID }))
    ]).transform(val => Array.isArray(val) ? val : [val]).refine(val => val.length > 0, { message: ENUM_MAIL_MESSAGES.RECIPIENTS_IS_EMPTY })
})

export type MailCreateUseCaseArgs = z.input<typeof MailCreateUseCaseArgsSchema>
export type MailCreateUseCaseResponse = z.output<typeof MailCreateUseCaseArgsSchema>
export type MailCreateUseCasePerformResponseValue = { success: string }
export type MailCreateUseCasePerformResponse = Promise<Result<MailCreateUseCasePerformResponseValue>>

@Injectable()
export class MailCreateUseCase extends UseCase {
    constructor(private readonly createMailRepository: MailCreateRepositoryAbstract) {
        super()
    }

    async perform(createArgs: MailCreateUseCaseArgs): MailCreateUseCasePerformResponse {
        try {
            const responsePerform = await this.performCreate(createArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'Create Mail', message: 'Cannot create mail' })
        }
    }

    private async performCreate(createArgs: MailCreateUseCaseArgs): MailCreateUseCasePerformResponse {
        const createArgsValidationResult = this.validateArgsProps(createArgs)

        const { body, recipients, sender, title } = createArgsValidationResult.getValue()

        const mailEntityTable = new MailEntitySimple({
            body,
            recipients,
            sender,
            sentAt: null,
            status: MailStatus.Opened,
            title
        })

        const performCreateMailRepositoryResult = await this.performCreateMailRepository(mailEntityTable)

        if (!performCreateMailRepositoryResult.isSuccess()) {
            return Result.failure(performCreateMailRepositoryResult.getError(), performCreateMailRepositoryResult.getStatus())
        }

        return Result.success({ success: 'Mail create successfully' }, HttpStatusCodes.CREATED)
    }

    private validateArgsProps(createArgs: MailCreateUseCaseArgs) {
        const MailCreateDTO = ZodValidateService.performParse(createArgs, MailCreateUseCaseArgsSchema)

        return MailCreateDTO
    }

    private async performCreateMailRepository(mailData: MailEntitySimple) {
        const response = await this.createMailRepository.perform({ data: mailData })

        return response
    }
}
