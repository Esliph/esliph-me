import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthenticationJWT } from '@@types/auth'
import { CONFIG_JWT_MODULE } from '@config/jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: CONFIG_JWT_MODULE.secret
        })
    }

    async validate(payload: AuthenticationJWT) {
        return {
            id: payload.sub,
            email: payload.email,
            username: payload.username
        }
    }
}
