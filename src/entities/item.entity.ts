import { Column, CreateDateColumn, Double, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: "items" })
export class Item {
    @PrimaryColumn({ name: 'id' })
    id: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'description', type: "text" })
    description: string;

    @Column({ name: 'starting_price', type: "double precision" })
    startingPrice: Double;

    @Column({ name: 'current_price', type: "double precision" })
    currentPrice: Double;

    @Column({ name: 'image_url' })
    imageUrl: string;

    @CreateDateColumn({ name: 'end_time', type: "timestamp without time zone" })
    endTime: Date;

    @CreateDateColumn({ name: 'created_at', type: "timestamp without time zone" })
    createAt: Date;
}
