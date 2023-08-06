import { Injectable } from '@nestjs/common'
import { Service } from '@common/service'

@Injectable()
export class ErrorCauseService extends Service {
    constructor() {
        super()
    }
}
