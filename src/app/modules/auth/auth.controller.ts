import { GlobalPrivileges } from '@modules/privilege/global.privileges'
import { Application } from '@core'
import { Controller, Post } from '@nestjs/common'
import { Body, Req, Res } from '@nestjs/common/decorators'
import { Response } from '@@types/http'
import { AuthSignInUseCaseDTO } from '@modules/auth/use-case/sign-in.use-case'
import { AuthSignUpUseCaseDTO } from '@modules/auth/use-case/sign-up.use-case'
import { AuthService } from '@modules/auth/auth.service'
import { Privilege } from '@util/decorators/privilege.decorator'
import { ErrorType } from '@@types/error'

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Privilege(GlobalPrivileges.Public)
    @Post('/sign-up')
    async signUp(@Body() body: AuthSignUpUseCaseDTO, @Res() res: Response) {
        const response = await this.authService.signUp({ ...body })

        if (!response.isSuccess()) {
            Application.emit('error', {
                ...response.getError(),
                type: ErrorType.HttpRequest
            })
        }

        return res.status(response.getStatus()).send(response.getResponse())
    }

    @Privilege(GlobalPrivileges.Public)
    @Post('/sign-in')
    async signIn(@Body() body: AuthSignInUseCaseDTO, @Res() res: Response) {
        const response = await this.authService.signIn({ ...body })

        if (!response.isSuccess()) {
            Application.emit('error', {
                ...response.getError(),
                type: ErrorType.HttpRequest
            })
        }

        return res.status(response.getStatus()).send(response.getResponse())
    }
}
