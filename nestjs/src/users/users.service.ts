import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
     constructor(
          @InjectRepository(User)
          private usersRepository: Repository<User>
     ) { }

     async findAll() {
          return await this.usersRepository.find({ relations: ['profile'] });
     }

     async findOne(id: number): Promise<User> {
          const user = await this.usersRepository.findOne({ where: { id }, relations: ['profile'] });
          if (!user) throw new NotFoundException('User not found');
          return user as User;
     }

     async getProfileById(id: number) {
          const user = await this.findOne(id);
          return user.profile;
     }

     async getPostsByUserId(id: number) {
          const user = await this.usersRepository.findOne({ where: { id }, relations: ['posts'] });
          if (!user) throw new NotFoundException('User not found');
          return user.posts;
     }

     async getUserByEmail(email: string) {
          return await this.usersRepository.findOne({where:{email}});
     }

     async create(user: CreateUserDto) {
          try {
               const newUser=this.usersRepository.create(user); //execute hook before insert
               await this.usersRepository.save(newUser);
               return 'User created successfully';
          } catch (e) {
               throw new BadRequestException('Error creating user');
          }
     }

     async update(id: number, userUpdate: UpdateUserDto) {
          try {
               const user = await this.findOne(id);
               const updatedUser = this.usersRepository.merge(user, userUpdate);
               await this.usersRepository.save(updatedUser);
               return 'User updated successfully';
          } catch (e) {
               throw new BadRequestException('Error updating user');
          }
     }

     async delete(id: number) {
          try {
               await this.usersRepository.delete(id);
               return 'User deleted successfully';
          } catch (e) {
               throw new BadRequestException('Error deleting user');
          }
     }
}