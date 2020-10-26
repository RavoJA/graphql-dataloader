import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Tag from './Tag';
import {User} from "./User";

@Entity()
export default class Post {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string = '';

    @ManyToMany(() => Tag, (tag) => tag.posts)
    @JoinTable()
    public tags: Tag[];

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn()
    public user: User;
}
