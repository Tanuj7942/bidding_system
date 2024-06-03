import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Item } from "./item.entity";
import { User } from "./user.entity";

@Entity({ name: 'bids' })
export class Bid {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => Item, item => item.id)
    item: Item;

    @ManyToOne(() => User, user => user.id)
    user: User;

    @Column('decimal', { nullable: false })
    bid_amount: number;

    @CreateDateColumn({ type: 'timestamp without time zone'})
    created_at: Date;
}