import { HttpException } from '@nestjs/common'
import { HttpEsliph, ResultEsliph } from '@esliph/util-node'

export class ForbiddenException extends HttpException {
    constructor(error: ResultEsliph.ResultModel['error'] = { message: [{ message: 'Request denied' }], title: 'Forbidden' }) {
        super({ ok: false, status: HttpEsliph.HttpStatusCodes.FORBIDDEN, value: null, error }, HttpEsliph.HttpStatusCodes.FORBIDDEN)
    }
}
