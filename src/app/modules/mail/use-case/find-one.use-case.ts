import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { z } from 'zod'
import { UseCase } from '@common/use-case'
import { ZodValidateService } from '@services/zod'
import { MailPropSelect } from '@modules/mail/repository/repository'
import { MailFindUniqueRepositoryAbstract } from '@modules/mail/repository/find.repository'

export class MailFindOneUseCaseDTO {}

export const MailFindOneUseCaseArgsSchema = ZodValidateService.defaultSchemaModelTable()

const MailPropsSelected = {}

export type MailFindOneUseCaseArgs = z.input<typeof MailFindOneUseCaseArgsSchema>
export type MailFindOneUseCaseResponse = z.output<typeof MailFindOneUseCaseArgsSchema>
export type MailFindOneUseCasePerformResponseValue = { mail: MailPropSelect<{ select: typeof MailPropsSelected }> }
export type MailFindOneUseCasePerformResponse = Promise<Result<MailFindOneUseCasePerformResponseValue>>

@Injectable()
export class MailFindOneUseCase extends UseCase {
    constructor(private readonly findMailRepository: MailFindUniqueRepositoryAbstract) {
        super()
    }

    async perform(findArgs: MailFindOneUseCaseArgs): MailFindOneUseCasePerformResponse {
        try {
            const responsePerform = await this.performFindOne(findArgs)

            return responsePerform
        } catch (err: any) {
            return this.extractError(err, { title: 'Find Mail', message: 'Cannot find mail' })
        }
    }

    private async performFindOne(findArgs: MailFindOneUseCaseArgs): MailFindOneUseCasePerformResponse {
        const findArgsValidationResult = this.validateArgsProps(findArgs)

        const findArgsDTO = findArgsValidationResult.getValue()

        const performFindRepositoryResult = await this.performFindRepository(findArgsDTO)

        if (!performFindRepositoryResult.isSuccess()) {
            return Result.failure(performFindRepositoryResult.getError(), performFindRepositoryResult.getStatus())
        }

        return Result.success<MailFindOneUseCasePerformResponseValue>(performFindRepositoryResult.getValue(), performFindRepositoryResult.getStatus())
    }

    private validateArgsProps(findArgs: MailFindOneUseCaseArgs) {
        const mailFindDTO = ZodValidateService.performParse(findArgs, MailFindOneUseCaseArgsSchema)

        return mailFindDTO
    }

    private async performFindRepository(findArgs: MailFindOneUseCaseResponse) {
        const response = await this.findMailRepository.perform({ where: { id: findArgs.id }, select: MailPropsSelected })

        return response
    }
}
