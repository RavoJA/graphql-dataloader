import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Post from "./Post";

@Entity()
export class User {
    @Column() @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable: true})
    name: string;

    @OneToMany(() => Post, (post) => post.user)
    public posts: Post[];
}