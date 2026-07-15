import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, ManyToMany } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Comment extends AbstractEntity<Comment> {
    @Column()
    content: string;

    @ManyToMany(() => Item, (item) => item.comments)
    items: Item;
}