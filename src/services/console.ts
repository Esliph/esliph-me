import { Injectable, LoggerService } from '@nestjs/common'
import { Console } from '@esliph/util-node'

const TEMPLATE_LOG = '<prefix?value="#"&styles=italic> <met?value="  LOG  "&background=blue> <dateTime> <context?color=green&styles=bold>: <message>'
const TEMPLATE_ERROR = '<prefix?value="#"&styles=italic> <met?value=" ERROR "&background=red> <dateTime> <context?color=green&styles=bold>: <message>'
const TEMPLATE_WARN =
    '<prefix?value="#"&styles=italic> <met?value=" WARN  "&background=yellow&color=black> <dateTime> <context?color=green&styles=bold>: <message>'
const TEMPLATE_INFO = '<prefix?value="#"&styles=italic> <met?value=" INFO  "&background=white> <dateTime> <context?color=green&styles=bold>: <message>'

export class ConsoleLogger extends Console<typeof TEMPLATE_LOG, typeof TEMPLATE_ERROR, typeof TEMPLATE_WARN, typeof TEMPLATE_INFO> {
    constructor(args?: { context?: string }) {
        super({
            methodsValue: { ...args },
            templates: {
                error: TEMPLATE_ERROR,
                log: TEMPLATE_LOG,
                info: TEMPLATE_INFO,
                warn: TEMPLATE_WARN
            }
        })
    }
}

export const CONSOLE_PID_NAME = 'App'
const CONTEXT_APP_LOGGER = 'AppNest'

@Injectable()
export class ConsoleLoggerNest implements LoggerService {
    private console = new ConsoleLogger()

    log(message: any, context: any) {
        // this.console.log(message, null, { context: `[${CONTEXT_APP_LOGGER}:${context}]` })
    }
    error(message: any, context: any, _context: any) {
        this.console.error(message, null, { context: `[${CONTEXT_APP_LOGGER}:${_context || context}]` })
    }
    warn(message: any, context: any) {
        this.console.warn(message, null, { context: `[${CONTEXT_APP_LOGGER}:${context}]` })
    }
    debug?(message: any, context: any) {
        this.console.info(message, null, { context: `[${CONTEXT_APP_LOGGER}:${context}]` })
    }
}
