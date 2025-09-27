import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { AiService } from '../../ai/ai.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private aiService: AiService
  ) { }

  async findAll() {
    return await this.postsRepository.find({
      relations: ['user.profile', 'categories']
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id }, relations: ['user.profile', 'categories'] });
    if (!post) throw new NotFoundException('Post not found');
    return post as Post;
  }

  async create(body: CreatePostDto, userId: number) {
    try {
      await this.postsRepository.save({ ...body, user: { id: userId }, categories: body.categoryIds?.map(id => ({ id })) });
      return 'Post created successfully';
    } catch (e) {
      throw new BadRequestException('Error creating post');
    }
  }

  async publish(id: number, userId: number){
    const post = await this.findOne(id);
    if (post.user.id !== userId) throw new ForbiddenException('You are not allowed to publish this post');
    if (!post.content || !post.title || post.categories.length === 0) throw new BadRequestException('Post content, title and at least one category are required');
    const summary = await this.aiService.generateSummary(post.content);
    const image = await this.aiService.generateImage(summary ?? '');
    await this.postsRepository.merge(post,{isDraft:false, summary, coverImage: image??''});
    return 'post published successfully';
  }

  async getPostsByCategoryId(categoryId: number) {
    const posts = await this.postsRepository.find({
      where: { categories: { id: categoryId } },
      relations: ['user.profile'],
    });
    return posts;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.findOne(id);
      const updatedPost = this.postsRepository.merge(post, updatePostDto);
      await this.postsRepository.save(updatedPost);
      return 'Post updated successfully';
    } catch (e) {
      throw new BadRequestException('Error updating post');
    }
  }

  async remove(id: number) {
    try {
      await this.postsRepository.delete(id);
      return 'Post deleted successfully';
    } catch (e) {
      throw new BadRequestException('Error deleting post');
    }
  }
}
