import { Application } from '@core'
import { ErrorCreateUseCaseArgs } from '@modules/error/use-case/create.use-case'
import { ErrorService } from '@modules/error/error.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ErrorOperation {
    constructor(
        private readonly errorService: ErrorService
    ) { }

    initEvents() {
        Application.on('error', ({ message, title, type, causes = [], description, stack }) => {
            this.registerError({
                message: message,
                title: title,
                type: type,
                causes: causes,
                description: description,
                stack: stack,
            })
        })
    }

    async registerError(args: ErrorCreateUseCaseArgs) {
        const response = await this.errorService.create({ ...args })
    }
}
