import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile{
     @PrimaryGeneratedColumn()
     id: number;
     
     @Column({type: 'varchar', length: 100})
     name: string;

     @Column({type: 'varchar', length: 100, name:'last_name'})
     lastName: string;
     
     @Column({type:'varchar', length:100, nullable: true })
     avatar: string;
     
     @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'create_at'})
     createdAt: Date;
     
     @UpdateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'update_at'})
     updateAt: Date;
}