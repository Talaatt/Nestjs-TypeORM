import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from './listing.entity';
import { AbstractEntity } from 'src/database/abstract.entity';

@Entity()
export class Item extends AbstractEntity<Item> {

    @Column()
    name: string;

    @OneToOne(()=>Listing , {cascade:true})
    @JoinColumn()
    listing:Listing;
    
    @OneToMany(() => Comment, (comment) => comment.items, { cascade: true })
    comments:Comment[]; ;
    
    @Column({default: true, nullable: true})
    public: boolean;

    // constructor(item: Partial <Item>) {
    //     Object.assign(this, item);
    // }
}
