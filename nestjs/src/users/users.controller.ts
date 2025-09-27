import { Controller, Get, Param, Post, Body, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')// endpoint /users
export class UsersController { //class represents logic
     constructor(private userService: UsersService) { }

     @Get() // HTTP GET method
     getUsers() {
          return this.userService.findAll();
     }

     @Get(':id') // HTTP GET method with parameter
     getUserById(@Param('id', ParseIntPipe) id: number) {// @Param decorator extracts the 'id' from the route
          return this.userService.findOne(id);
     }

     @Get(':id/profile') // HTTP GET method with parameter
     getProfileById(@Param('id', ParseIntPipe) id: number) {// @Param decorator extracts the 'id' from the route
          return this.userService.getProfileById(id);
     }

     @Get(':id/posts') // HTTP GET method with parameter
     getPosts(@Param('id', ParseIntPipe) id: number) {// @Param decorator extracts the 'id' from the route
          return this.userService.getPostsByUserId(id);
     }

     @Post()// HTTP POST method
     createUser(@Body() body: CreateUserDto) { // @Body decorator extracts the body of the request
          return this.userService.create(body);
     }

     @Delete(':id')// HTTP DELETE method with parameter
     deleteUser(@Param('id', ParseIntPipe) id: number) {
          return this.userService.delete(id);
     }

     @Put(':id') // HTTP PUT method with parameter
     updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
          return this.userService.update(id, body);
     }
}