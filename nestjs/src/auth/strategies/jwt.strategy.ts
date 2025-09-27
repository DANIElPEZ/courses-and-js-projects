import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
     constructor(private configService: ConfigService){
          const secret = configService.get('jwt_secret');
          if (!secret) throw new Error('JWT secret not configured');
          super({
               ignoreExpiration:false,
               secretOrKey: secret,
               jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()// extract token from header
          });
     }

     validate(jwt: {sub: string}){ // execute when try to access a protected route
          return {userId: jwt.sub};
     }
}