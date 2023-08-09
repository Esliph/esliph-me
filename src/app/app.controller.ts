import { ErrorManage } from '@modules/error/error.manage'
import { Controller, Get, Post, Delete, Put } from '@nestjs/common'
import { Body, Res, Param } from '@nestjs/common/decorators'
import { Response } from '@@types/http'
import { AppService } from '@app.service'
import { Privilege } from '@modules/privilege/decorators/privilege.decorator'
import { GlobalPrivileges } from '@modules/privilege/global.privileges'

@Controller('/')
export class AppController {
    constructor(private readonly appService: AppService, private readonly errorManage: ErrorManage) {}

    @Privilege(GlobalPrivileges.Public)
    @Get()
    home(@Res() res: Response) {
        const response = this.appService.home()

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Privilege(GlobalPrivileges.Public)
    @Get('/ping')
    pingPong(@Res() res: Response) {
        const response = this.appService.pingPong()

        return res.status(response.getStatus()).send(response.getResponse())
    }
}
