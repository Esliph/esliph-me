import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { z } from 'zod'
import { UseCase } from '@common/use-case'
import { ZodValidateService } from '@services/zod'
import { MailDeleteRepositoryAbstract } from '@modules/mail/repository/delete.repository'

export class MailDeleteUseCaseDTO {}

export const MailDeleteUseCaseArgsSchema = ZodValidateService.defaultSchemaModelTable()

export type MailDeleteUseCaseArgs = z.input<typeof MailDeleteUseCaseArgsSchema>
export type MailDeleteUseCaseResponse = z.output<typeof MailDeleteUseCaseArgsSchema>
export type MailDeleteUseCasePerformResponseValue = boolean
export type MailDeleteUseCasePerformResponse = Promise<Result<MailDeleteUseCasePerformResponseValue>>

@Injectable()
export class MailDeleteUseCase extends UseCase {
    constructor(private readonly deleteMailRepository: MailDeleteRepositoryAbstract) {
        super()
    }

    async perform(deleteArgs: MailDeleteUseCaseArgs): MailDeleteUseCasePerformResponse {
        try {
            const responsePerform = await this.performDelete(deleteArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'Delete Mail', message: 'Cannot delete mail' })
        }
    }

    private async performDelete(deleteArgs: MailDeleteUseCaseArgs): MailDeleteUseCasePerformResponse {
        const deleteArgsValidationResult = this.validateArgsProps(deleteArgs)

        const deleteArgsDTO = deleteArgsValidationResult.getValue()

        const performDeleteMailRepositoryResult = await this.performDeleteMailRepository(deleteArgsDTO)

        if (!performDeleteMailRepositoryResult.isSuccess()) {
            return Result.failure(performDeleteMailRepositoryResult.getError(), performDeleteMailRepositoryResult.getStatus())
        }

        return performDeleteMailRepositoryResult
    }

    private validateArgsProps(deleteArgs: MailDeleteUseCaseArgs) {
        const mailListDTO = ZodValidateService.performParse(deleteArgs, MailDeleteUseCaseArgsSchema)

        return mailListDTO
    }

    private async performDeleteMailRepository(deleteArgs: MailDeleteUseCaseResponse) {
        const response = await this.deleteMailRepository.perform({ where: { id: deleteArgs.id } })

        return response
    }
}
