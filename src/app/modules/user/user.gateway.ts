import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Injectable } from '@nestjs/common'
import { SocketIO } from '@@types/socket'
import { Gateway } from '@common/gateway'
import { CONFIG_SOCKET } from '@config/socket'

@WebSocketGateway({ cors: { origin: CONFIG_SOCKET.origin } })
@Injectable()
export class UserGateway extends Gateway {
    @SubscribeMessage('users')
    async identity(@ConnectedSocket() client: SocketIO, @MessageBody() data: any) {
        this.socketEmit(client, 'users', data)
    }
}
