import { WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

export class Gateway {
    @WebSocketServer()
    protected server: Server
}
