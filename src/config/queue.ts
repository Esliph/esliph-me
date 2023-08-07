import { BullModule } from '@nestjs/bull'

export const CONFIG_QUEUE_MODULE_ROOT = BullModule.forRoot({
    redis: {
        host: 'localhost',
        port: 6379
    }
})
