import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post as PostEntity } from '../entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @ApiOperation({ summary: 'Create a new post' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const user = req.user as { userId: number };
    return this.postsService.create(createPostDto, user.userId);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'The list of posts' })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiResponse({ status: 200, description: 'The post', type: PostEntity })
  @ApiOperation({ summary: 'Get a post by id' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.postsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a post by id' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @ApiOperation({ summary: 'Publish a post by id' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id/publish')
  publish(@Param('id', ParseIntPipe) id: number, @Req() req:Request){
    const user = req.user as {userId: number};
    return this.postsService.publish(id, user.userId);
  }

  @ApiOperation({ summary: 'Delete a post by id' })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.postsService.remove(+id);
  }
}
