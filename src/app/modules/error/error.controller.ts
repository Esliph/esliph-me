import { ErrorOperation } from '@modules/error/operational/controller'
import { Controller, Get, Post, Delete, Put, UseGuards } from '@nestjs/common'
import { Body, Res, Param } from '@nestjs/common/decorators'
import { Response } from '@@types/http'
import { ErrorService } from '@modules/error/error.service'

@Controller('/errors')
export class ErrorController {
    constructor(private readonly errorService: ErrorService, private readonly errorOperational: ErrorOperation) {
        setTimeout(() => {
            this.errorOperational.initEvents()
        }, 1)
    }

    @Get('/')
    async getErrors(@Res() res: Response) {
        const response = await this.errorService.getErrors({})

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Get('/:id')
    async getError(@Param('id') id: string, @Res() res: Response) {
        const response = await this.errorService.getError({ id })

        return res.status(response.getStatus()).send(response.getResponse())
    }
}
