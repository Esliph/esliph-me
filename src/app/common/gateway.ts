import { WebSocketServer } from '@nestjs/websockets'
import { ServerIO, SocketIO } from '@@types/socket'

export class Gateway {
    @WebSocketServer()
    protected server: ServerIO

    socketEmit(socket: SocketIO, evt: string, data: any = {}) {
        socket.emit(evt, data)
    }

    serverEmit(evt: string, data: any = {}, ...rooms: string[]) {
        if (rooms.length) {
            this.server.to([...rooms]).emit(evt, data)
        } else {
            this.server.emit(evt, data)
        }
    }

    async getSocketById(id: string) {
        const sockets = await this.server.fetchSockets()
    }

    async getSockets() {
        const sockets = await this.server.fetchSockets()

        // @ts-expect-error
        return sockets as SocketIO[]
    }
}
