import { Injectable } from '@nestjs/common'
import { Result } from '@esliph/util-node'
import { HttpStatusCodes } from '@util/http/status-code'

@Injectable()
export class AppService {
    constructor() {}

    home() {
        return Result.success({ ok: true }, HttpStatusCodes.OK)
    }

    pingPong() {
        return Result.success({ ping: 'pong' }, HttpStatusCodes.OK)
    }
}
