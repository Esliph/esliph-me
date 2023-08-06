import { Injectable } from '@nestjs/common'
import { Service } from '@common/service'
import { MailCreateUseCase, MailCreateUseCaseArgs } from '@modules/mail/use-case/create.use-case'
import { MailFindOneUseCase, MailFindOneUseCaseArgs } from '@modules/mail/use-case/find-one.use-case'
import { MailListUseCase, MailListUseCaseArgs } from '@modules/mail/use-case/list.use-case'
import { MailUpdateUseCase, MailUpdateUseCaseArgs } from '@modules/mail/use-case/update.use-case'
import { MailDeleteUseCase, MailDeleteUseCaseArgs } from '@modules/mail/use-case/delete.use-case'
import { MailSendUseCase, MailSendUseCaseArgs } from '@modules/mail/use-case/send.use-case'

@Injectable()
export class MailService extends Service {
    constructor(
        private readonly createUC: MailCreateUseCase,
        private readonly listUC: MailListUseCase,
        private readonly updateUC: MailUpdateUseCase,
        private readonly deleteUC: MailDeleteUseCase,
        private readonly sendUC: MailSendUseCase,
        private readonly findUC: MailFindOneUseCase
    ) {
        super()
    }

    async sendMail(body: MailSendUseCaseArgs) {
        const response = await this.sendUC.perform({ ...body })

        return response
    }

    async getMails(body?: MailListUseCaseArgs) {
        const response = await this.listUC.perform({ ...body })

        return response
    }

    async getMail(body: MailFindOneUseCaseArgs) {
        const response = await this.findUC.perform({ ...body })

        return response
    }

    async create(body: MailCreateUseCaseArgs) {
        const response = await this.createUC.perform({ ...body })

        return response
    }

    async update(body: MailUpdateUseCaseArgs) {
        const response = await this.updateUC.perform({ ...body })

        return response
    }

    async delete(body: MailDeleteUseCaseArgs) {
        const response = await this.deleteUC.perform({ ...body })

        return response
    }
}
