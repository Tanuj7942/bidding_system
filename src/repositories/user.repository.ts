import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserRepository extends Repository<User> {

    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }

    public getUser = async (params: Map<string, string>) => {
        return await this.dataSource.manager.query(`SELECT id, username, email, role, created_at FROM users WHERE id = $1;`, [params.get("userId")]);
    }

    public registerUser = async (user: User) => {
        return await this.dataSource.manager.query(`INSERT INTO users (id, username, password, email, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7); `, [user.id, user.username, user.password, user.email, user.role, user.createdAt, user.updatedAt]);
    }

}