import { Global, Module, Provider } from '@nestjs/common'
import { AppModule } from '@app.module'
import { DatabaseService, PrismaService } from '@services/database'
import { CONFIG_NEST_MODULE_ROOT } from '@config/nest'
import { CONFIG_JWT_MODULE_ROOT } from '@config/jwt'
import { CONFIG_AXIOS_HTTP_MODULE_ROOT } from '@config/axios'
import { CONFIG_QUEUE_MODULE_ROOT } from '@config/queue'
import { CONFIG_SCHEDULE_MODULE_ROOT } from '@config/schedule'

const MainModuleServices: Provider[] = []

const MainModuleDependencies: Provider[] = [
    {
        provide: DatabaseService,
        useClass: PrismaService
    }
]

@Global()
@Module({
    imports: [CONFIG_SCHEDULE_MODULE_ROOT, CONFIG_QUEUE_MODULE_ROOT, CONFIG_NEST_MODULE_ROOT, CONFIG_AXIOS_HTTP_MODULE_ROOT, CONFIG_JWT_MODULE_ROOT, AppModule],
    controllers: [],
    providers: [...MainModuleDependencies, ...MainModuleServices],
    exports: [...MainModuleDependencies, ...MainModuleServices]
})
export class MainModule {}
