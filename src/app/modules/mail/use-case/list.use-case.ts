import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { z } from 'zod'
import { UseCase } from '@common/use-case'
import { ZodValidateService } from '@services/zod'
import { MailPropSelect } from '@modules/mail/repository/repository'
import { MailFindManyRepositoryAbstract } from '@modules/mail/repository/find.repository'

export class MailListUseCaseDTO {}

export const MailListUseCaseArgsSchema = z.object({})

const MailPropsSelected = {}

export type MailListUseCaseArgs = z.input<typeof MailListUseCaseArgsSchema>
export type MailListUseCaseResponse = z.output<typeof MailListUseCaseArgsSchema>
export type MailListCasePerformResponseValue = { mails: MailPropSelect<{ select: typeof MailPropsSelected }>[] }
export type MailListCasePerformResponse = Promise<Result<MailListCasePerformResponseValue>>

@Injectable()
export class MailListUseCase extends UseCase {
    constructor(private readonly listMailRepository: MailFindManyRepositoryAbstract) {
        super()
    }

    async perform(listArgs: MailListUseCaseArgs): MailListCasePerformResponse {
        try {
            const responsePerform = await this.performList(listArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'List Mails', message: 'Cannot list mails' })
        }
    }

    private async performList(listArgs: MailListUseCaseArgs): MailListCasePerformResponse {
        const listArgsValidationResult = this.validateArgsProps(listArgs)

        const listArgsDTO = listArgsValidationResult.getValue()

        const performListRepositoryResult = await this.performListRepository(listArgsDTO)

        if (!performListRepositoryResult.isSuccess()) {
            return Result.failure(performListRepositoryResult.getError(), performListRepositoryResult.getStatus())
        }

        return Result.success<MailListCasePerformResponseValue>(performListRepositoryResult.getValue(), performListRepositoryResult.getStatus())
    }

    private validateArgsProps(listArgs: MailListUseCaseArgs) {
        const mailListDTO = ZodValidateService.performParse(listArgs, MailListUseCaseArgsSchema)

        return mailListDTO
    }

    private async performListRepository(listArgs: MailListUseCaseArgs) {
        const response = await this.listMailRepository.perform({ where: listArgs, select: MailPropsSelected })

        return response
    }
}
