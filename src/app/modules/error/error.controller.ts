import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Post, Delete, Put } from '@nestjs/common'
import { Body, Res, Param, Req } from '@nestjs/common/decorators'
import { RequestAuthenticate, Response } from '@@types/http'
import { ErrorService } from '@modules/error/error.service'
import { Privilege } from '@modules/privilege/decorators/privilege.decorator'
import { ErrorPrivileges } from '@modules/error/error.privileges'
import { ErrorManage } from '@modules/error/error.manage'

@Privilege(ErrorPrivileges.Parent)
@ApiTags('errors')
@Controller('/errors')
export class ErrorController {
    constructor(private readonly errorService: ErrorService, private readonly errorManage: ErrorManage) {
        setTimeout(() => {
            this.errorManage.initEvents()
        }, 1)
    }

    @Privilege(ErrorPrivileges.List)
    @Get()
    async getErrors(@Req() req: RequestAuthenticate, @Res() res: Response) {
        const response = await this.errorService.getErrors({})

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Privilege(ErrorPrivileges.Find)
    @Get('/:id')
    async getError(@Param('id') id: string, @Res() res: Response) {
        const response = await this.errorService.getError({ id })

        return res.status(response.getStatus()).send(response.getResponse())
    }
}
