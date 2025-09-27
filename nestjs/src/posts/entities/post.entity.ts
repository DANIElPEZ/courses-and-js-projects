import { User } from "../../users/entities/user.entity";
import { ManyToMany, JoinTable, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn } from "typeorm";
import { ManyToOne } from "typeorm";
import { Category } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'posts' })
export class Post {
     @PrimaryGeneratedColumn()
     @ApiProperty({ description: 'The id of the post' })
     id: number;

     @ApiProperty({ description: 'The tittle of the post' })
     @Column({ type: 'varchar', length: 255 })
     title: string;

     @ApiProperty({ description: 'The content of the post' })
     @Column({ type: 'text' })
     content: string;

     @ApiProperty({ description: 'The cover image of the post' })
     @Column({ type: 'varchar', length: 900, name: 'cover_image' })
     coverImage: string;

     @ApiProperty({ description: 'The summary of the post' })
     @Column({ type: 'varchar', length: 255, name: 'summary' })
     summary: string;

     @ApiProperty({ description: 'Whether the post is a draft' })
     @Column({ type: 'boolean', default: false, name: 'is_draft' })
     isDraft: boolean;

     @ApiProperty({ description: 'The created at date of the post' })
     @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'create_at' })
     createdAt: Date;

     @ApiProperty({ description: 'The updated at date of the post' })
     @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'update_at' })
     updateAt: Date;

     @ManyToOne(() => User, (user) => user.posts, { nullable: false })
     @JoinColumn({ name: 'user_id' })
     user: User;

     @ManyToMany(() => Category, (category) => category.posts)
     @JoinTable({
          name: 'posts_categories',
          joinColumn: { name: 'post_id', referencedColumnName: 'id' },
          inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
     })
     categories: Category[];
}