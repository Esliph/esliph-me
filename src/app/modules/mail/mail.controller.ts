import { Controller, Get, Post, Delete, Put, UseGuards } from '@nestjs/common'
import { Body, Res, Param } from '@nestjs/common/decorators'
import { Response } from '@@types/http'
import { MailService } from '@modules/mail/mail.service'
import { MailUpdateUseCaseDTO } from '@modules/mail/use-case/update.use-case'
import { MailDeleteUseCaseDTO } from '@modules/mail/use-case/delete.use-case'

@Controller('/mails')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Get('/')
    async getMails(@Res() res: Response) {
        const response = await this.mailService.getMails({})

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Get('/:id')
    async getMail(@Param('id') id: string, @Res() res: Response) {
        const response = await this.mailService.getMail({ id })

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() body: MailUpdateUseCaseDTO, @Res() res: Response) {
        const response = await this.mailService.update({ id, ...body })

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string, @Body() body: MailDeleteUseCaseDTO, @Res() res: Response) {
        const response = await this.mailService.delete({ id, ...body })

        return res.status(response.getStatus()).send(response.getResponse())
    }
}
