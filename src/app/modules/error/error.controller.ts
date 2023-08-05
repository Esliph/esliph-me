import { Controller, Get, Post, Delete, Put, UseGuards } from '@nestjs/common'
import { Body, Res, Param } from '@nestjs/common/decorators'
import { Response } from '@@types/http'
import { ErrorService } from '@modules/error/error.service'
import { ErrorUpdateUseCaseDTO } from '@modules/error/use-case/update.use-case'
import { ErrorDeleteUseCaseDTO } from '@modules/error/use-case/delete.use-case'
import { ErrorCreateUseCaseDTO } from '@modules/error/use-case/create.use-case'

@Controller('/errors')
export class ErrorController {
    constructor(private readonly errorService: ErrorService) { }

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

    @Post('/create')
    async create(@Body() body: ErrorCreateUseCaseDTO, @Res() res: Response) {
        const response = await this.errorService.create({ ...body })

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() body: ErrorUpdateUseCaseDTO, @Res() res: Response) {
        const response = await this.errorService.update({ id, ...body })

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string, @Body() body: ErrorDeleteUseCaseDTO, @Res() res: Response) {
        const response = await this.errorService.delete({ id, ...body })

        return res.status(response.getStatus()).send(response.getResponse())
    }
}