import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import {} from 'class-validator'
import { z } from 'zod'
import { UseCase } from '@common/use-case'
import { ZodValidateService } from '@services/zod'
import { HttpStatusCodes } from '@util/http/status-code'
import { MailEntityTable } from '@modules/mail/schema'
import { MailUpdateRepositoryAbstract } from '@modules/mail/repository/update.repository'
import { MailFindUniqueRepositoryAbstract } from '@modules/mail/repository/find.repository'

export class MailUpdateUseCaseDTO {}

export const MailUpdateUseCaseArgsSchema = ZodValidateService.defaultSchemaModelTable().extend({})

export type MailUpdateUseCaseArgs = z.input<typeof MailUpdateUseCaseArgsSchema>
export type MailUpdateUseCaseResponse = z.output<typeof MailUpdateUseCaseArgsSchema>
export type MailUpdateUseCasePerformResponseValue = { success: string }
export type MailUpdateUseCasePerformResponse = Promise<Result<MailUpdateUseCasePerformResponseValue>>

@Injectable()
export class MailUpdateUseCase extends UseCase {
    constructor(private readonly updateMailRepository: MailUpdateRepositoryAbstract, private readonly findMailRepository: MailFindUniqueRepositoryAbstract) {
        super()
    }

    async perform(updateArgs: MailUpdateUseCaseArgs): MailUpdateUseCasePerformResponse {
        try {
            const responsePerform = await this.performUpdate(updateArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'Update Mail', message: 'Cannot update mail' })
        }
    }

    private async performUpdate(updateArgs: MailUpdateUseCaseArgs): MailUpdateUseCasePerformResponse {
        const updateArgsValidationResult = this.validateArgsProps(updateArgs)

        const updateMailData = updateArgsValidationResult.getValue()

        const findMailToBeUpdatedResult = await this.findMailToBeUpdated({ id: updateMailData.id })

        const mailToBeUpdated = findMailToBeUpdatedResult.getValue().mail

        const mailEntityTable = new MailEntityTable(mailToBeUpdated)

        const performUpdateRepositoryResult = await this.performUpdateRepository(mailEntityTable)

        if (!performUpdateRepositoryResult.isSuccess()) {
            return Result.failure(performUpdateRepositoryResult.getError(), performUpdateRepositoryResult.getStatus())
        }

        return Result.success({ success: 'Mail update successfully' }, HttpStatusCodes.OK)
    }

    private async findMailToBeUpdated(args: { id: number }) {
        const response = await this.findMailRepository.perform({ where: { id: args.id } })

        return response
    }

    private validateArgsProps(updateArgs: MailUpdateUseCaseArgs) {
        const mailUpdateDTO = ZodValidateService.performParse(updateArgs, MailUpdateUseCaseArgsSchema)

        return mailUpdateDTO
    }

    private async performUpdateRepository(mailData: MailEntityTable) {
        const response = await this.updateMailRepository.perform({
            where: { id: mailData.id },
            data: mailData
        })

        return response
    }
}
