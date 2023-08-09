import { Controller, Get, Post, Delete, Put, UseGuards } from '@nestjs/common'
import { Body, Res, Param } from '@nestjs/common/decorators'
import { Response } from '@@types/http'
import { PrivilegeService } from '@modules/privilege/privilege.service'
import { PrivilegeUpdateUseCaseDTO } from '@modules/privilege/use-case/update.use-case'
import { PrivilegeDeleteUseCaseDTO } from '@modules/privilege/use-case/delete.use-case'
import { PrivilegeCreateUseCaseDTO } from '@modules/privilege/use-case/create.use-case'

@Controller('/privileges')
export class PrivilegeController {
    constructor(private readonly privilegeService: PrivilegeService) {}

    @Get()
    async getPrivileges(@Res() res: Response) {
        const response = await this.privilegeService.getPrivileges({})

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Get('/:id')
    async getPrivilege(@Param('id') id: string, @Res() res: Response) {
        const response = await this.privilegeService.getPrivilege({ id })

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Post('/create')
    async create(@Body() body: PrivilegeCreateUseCaseDTO, @Res() res: Response) {
        const response = await this.privilegeService.create({ ...body })

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() body: PrivilegeUpdateUseCaseDTO, @Res() res: Response) {
        const response = await this.privilegeService.update({ id, ...body })

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string, @Body() body: PrivilegeDeleteUseCaseDTO, @Res() res: Response) {
        const response = await this.privilegeService.delete({ id, ...body })

        return res.status(response.getStatus()).send(response.getResponse())
    }
}
