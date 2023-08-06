import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { } from 'class-validator'
import { z } from 'zod'
import { UseCase } from '@common/use-case'
import { HttpStatusCodes } from '@util/http/status-code'
import { MailCreateUseCase, MailCreateUseCaseArgsSchema } from '@modules/mail/use-case/create.use-case'
import { ResultException } from '@util/exceptions/result.exception'

export const MailSendUseCaseArgsSchema = MailCreateUseCaseArgsSchema.extend({})

export type MailSendUseCaseArgs = z.input<typeof MailSendUseCaseArgsSchema>
export type MailSendUseCaseResponse = z.output<typeof MailSendUseCaseArgsSchema>
export type MailSendUseCasePerformResponseValue = { success: string }
export type MailSendUseCasePerformResponse = Promise<Result<MailSendUseCasePerformResponseValue>>

@Injectable()
export class MailSendUseCase extends UseCase {
    constructor(private readonly createMailUseCase: MailCreateUseCase) {
        super()
    }

    async perform(createArgs: MailSendUseCaseArgs): MailSendUseCasePerformResponse {
        try {
            const responsePerform = await this.performSend(createArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'Send Mail', message: 'Cannot send mail' })
        }
    }

    private async performSend(sendArgs: MailSendUseCaseArgs): MailSendUseCasePerformResponse {
        const responseCreateMail = await this.performCreateMail(sendArgs)

        return Result.success({ success: 'Mail send successfully' }, HttpStatusCodes.CREATED)
    }

    private async performCreateMail(mailArgs: MailSendUseCaseArgs) {
        const response = await this.createMailUseCase.perform(mailArgs)

        if (!response.isSuccess()) {
            throw new ResultException(response.getError(), response.getStatus())
        }

        return response
    }
}
