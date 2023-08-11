import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { FastifyPluginAsync, FastifyPluginCallback, FastifyPluginOptions, FastifyRegisterOptions } from 'fastify'
import fastifyCsrf from '@fastify/csrf-protection'
import fastifyHelmet from '@fastify/helmet'
import fastifyCompression from '@fastify/compress'
import fastifyCookie from '@fastify/cookie'
import { ObserverEvent } from '@esliph/util-node'
import { getEnv } from '@services/env'
import { MainModule } from '@main.module'
import { AppEvents } from '@@types/events'
import { ConsoleLogger } from '@services/console'
import { OPTIONS_NEST_APPLICATION } from '@config/nest'

const OBSERVER_CONTEXT = 'AppServer'
const PORT = getEnv({ name: 'PORT', defaultValue: 8080 })

export class Application {
    private static app: NestFastifyApplication
    private static observer: ObserverEvent<typeof OBSERVER_CONTEXT, AppEvents>
    private static console: ConsoleLogger

    static async factory() {
        await this.createApplication()
        await this.initComponents()
    }

    private static async createApplication() {
        const { console, app, observer } = await this.createAppAndConsoleAndObserver()

        this.app = app
        this.console = console
        this.observer = observer
    }

    private static async createAppAndConsoleAndObserver() {
        const console = new ConsoleLogger({ context: `[${OBSERVER_CONTEXT}]` })
        const observer = new ObserverEvent<typeof OBSERVER_CONTEXT, AppEvents>(OBSERVER_CONTEXT)
        const app = await NestFactory.create<NestFastifyApplication>(MainModule, new FastifyAdapter(), OPTIONS_NEST_APPLICATION)

        return { app, console, observer }
    }

    private static async initComponents() {
        this.initObserver()
        this.buildDocumentApi()
        this.initComponentsConfig()
        await this.initComponentsApp()
    }

    private static initObserver() {
        this.on('error', err => { })
    }

    private static async initComponentsApp() {
        await this.registerInApp(fastifyCompression, { encodings: ['gzip', 'deflate'] })
        await this.registerInApp(fastifyCookie, { secret: 'my-secret' })
        await this.registerInApp(fastifyCsrf)
        await this.registerInApp(fastifyHelmet)
        await this.performListen()
    }

    private static initComponentsConfig() { }

    public static async closeApp() {
        await this.app.close()
    }

    private static async performListen() {
        await this.app.listen(PORT)

        const url = await this.getUrl()

        this.console.log(`Server running on node environment=${getEnv({ name: 'NODE_ENV', defaultValue: 'local' })} on ${url}\n`)
    }

    private static async getUrl() {
        const url = await this.app.getUrl()

        return url
    }

    private static async registerInApp<Options extends FastifyPluginOptions = any>(
        plugin:
            | FastifyPluginCallback<Options>
            | FastifyPluginAsync<Options>
            | Promise<{ default: FastifyPluginCallback<Options> }>
            | Promise<{ default: FastifyPluginAsync<Options> }>,
        opts?: FastifyRegisterOptions<Options>
    ) {
        await this.app.register(plugin, opts)
    }

    private static buildDocumentApi() {
        const document = this.createDocumentApi()

        SwaggerModule.setup('v1/api', this.app, document, {
            customSiteTitle: 'Chat API Docs'
        })
    }

    private static createDocumentApi() {
        const config = new DocumentBuilder().setTitle('Chat API Docs').setDescription('Chat API').setVersion('1.0').build()
        const document = SwaggerModule.createDocument(this.app, config)

        return document
    }

    static on<Event extends keyof AppEvents>(eventName: Event, handler: (data: AppEvents[Event]) => void) {
        return this.observer.on(eventName, handler)
    }

    static async emit<Event extends keyof AppEvents>(eventName: Event, data: AppEvents[Event]) {
        await this.observer.emitToEvent(eventName, data)
    }

    static log(message: any, context: any) {
        this.console.log(message, null, { context: `[${context}]` })
    }

    static error(message: any, context: any) {
        this.console.error(message, null, { context: `[${context}]` })
    }

    static warn(message: any, context: any) {
        this.console.warn(message, null, { context: `[${context}]` })
    }

    static debug?(message: any, context: any) {
        this.console.info(message, null, { context: `[${context}]` })
    }
}
