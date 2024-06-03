import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: "users" })
export class User {
    @PrimaryColumn({ name: 'id' })
    id: string;

    @Column({ name: 'username' })
    username: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'role' })
    role: string;

    @CreateDateColumn({ name: 'createdAt', type: "timestamp without time zone" })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt', type: "timestamp without time zone" })
    updatedAt: Date;
}
