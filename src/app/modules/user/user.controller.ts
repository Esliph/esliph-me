import { Controller, Get, Post, Delete, Put, UseGuards } from '@nestjs/common'
import { Body, Res, Param } from '@nestjs/common/decorators'
import { Response } from '@@types/http'
import { Application } from '@core'
import { ErrorType } from '@@types/error'
import { Privilege } from '@util/decorators/privilege.decorator'
import { UserService } from '@modules/user/user.service'
import { UserPrivileges } from '@modules/user/user.privileges'
import { UserUpdateUseCaseDTO } from '@modules/user/use-case/update.use-case'
import { UserDeleteUseCaseDTO } from '@modules/user/use-case/delete.use-case'
import { UserCreateUseCaseDTO } from '@modules/user/use-case/create.use-case'

@Privilege(UserPrivileges.Parent)
@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Privilege(UserPrivileges.List)
    @Get('/')
    async getUsers(@Res() res: Response) {
        const response = await this.userService.getUsers({})

        if (!response.isSuccess()) {
            Application.emit('error', {
                ...response.getError(),
                type: ErrorType.HttpRequest
            })
        }

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Privilege(UserPrivileges.Find)
    @Get('/:id')
    async getUser(@Param('id') id: string, @Res() res: Response) {
        const response = await this.userService.getUser({ id })

        if (!response.isSuccess()) {
            Application.emit('error', {
                ...response.getError(),
                type: ErrorType.HttpRequest
            })
        }

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Privilege(UserPrivileges.Create)
    @Post('/create')
    async create(@Body() body: UserCreateUseCaseDTO, @Res() res: Response) {
        const response = await this.userService.create({ ...body })

        if (!response.isSuccess()) {
            Application.emit('error', {
                ...response.getError(),
                type: ErrorType.HttpRequest
            })
        }

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Privilege(UserPrivileges.Update)
    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() body: UserUpdateUseCaseDTO, @Res() res: Response) {
        const response = await this.userService.update({ id, ...body })

        if (!response.isSuccess()) {
            Application.emit('error', {
                ...response.getError(),
                type: ErrorType.HttpRequest
            })
        }

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Privilege(UserPrivileges.Delete)
    @Delete('/delete/:id')
    async delete(@Param('id') id: string, @Body() body: UserDeleteUseCaseDTO, @Res() res: Response) {
        const response = await this.userService.delete({ id, ...body })

        if (!response.isSuccess()) {
            Application.emit('error', {
                ...response.getError(),
                type: ErrorType.HttpRequest
            })
        }

        return res.status(response.getStatus()).send(response.getResponse())
    }
}
