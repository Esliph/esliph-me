import { Gateway } from '@common/gateway'
import { Injectable } from '@nestjs/common'
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'dgram'

@WebSocketGateway({ cors: { origin: '*' } })
@Injectable()
export class UserGateway extends Gateway {
    @SubscribeMessage('users')
    async identity(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
        console.log(data)
        client.emit('users', data)
    }
}
