import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

// Using modules, separate the logic in modules, use controller and service
@Module({
     imports:[TypeOrmModule.forFeature([User, Profile])], // Import entities for repository injection
     controllers:[UsersController],
     providers:[UsersService],
     exports:[UsersService] // Export for use in other modules
})
export class UsersModule {}