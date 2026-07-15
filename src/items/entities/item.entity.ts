import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from './listing.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entinty';

@Entity()
export class Item extends AbstractEntity<Item> {

    @Column()
    name: string;

    @OneToOne(()=>Listing , {cascade:true})
    @JoinColumn()
    listing:Listing;
    
    @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
    comments:Comment[]; ;
    
    @Column({default: true, nullable: true})
    public: boolean;

    @ManyToMany(() => Tag, { cascade: true })
    @JoinTable()
    tags: Tag[];
    // constructor(item: Partial <Item>) {
    //     Object.assign(this, item);
    // }
}
