import { BeforeInsert, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from '../../posts/entities/post.entity';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
     @PrimaryGeneratedColumn()
     id: number;

     @Column({ type: 'varchar', length: 255, unique:true })
     email: string;

     @Exclude()
     @Column({ type: 'varchar', length: 100, unique: true })
     password: string;

     @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'create_at' })
     createdAt: Date;

     @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'update_at' })
     updateAt: Date;

     //setting foreign keys
     @OneToOne(()=>Profile, {nullable:false, cascade:true})
     @JoinColumn({name:'profile_id'})
     profile:Profile;

     @OneToMany(()=>Post, (post)=>post.user)
     posts: Post[];

     @BeforeInsert()//execute if use .create() method
     async hashPassword(){
          this.password = await bcrypt.hash(this.password, 10);
     }
}