import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
     constructor(private authService: AuthService){}

     //login endpoint
     @UseGuards(AuthGuard('local'))// use the local strategy defined in local.strategy.ts
     @Post('login')
     login(@Req() req: Request){// after validation of local strategy, insert user in request
          const user= req.user as User;
          return {
               user,
               access_token:this.authService.generateJWT(user)
          };
     }
}
