import { Item } from '../entities/item.entity';
import { DataSource, Repository } from 'typeorm';

export class ItemRepository extends Repository<Item> {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        super(Item, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }

    public add = async (item: Item) => {
        return await this.dataSource.manager.query(`INSERT INTO items (id, name, description, starting_price, current_price, image_url, end_time, created_at) VALUES ($1, $2 ,$3, $4, $5, $6, $7, $8)`, 
        [item.id, item.name, item.description, item.startingPrice, item.currentPrice, item.imageUrl, item.endTime, item.createAt]);
    }

    public update = async (item: Item) => {
        let sql = `UPDATE items SET `;
        const parameters: Array<any> = [];
        let paramIndex = 1;
    
        if (item.name) {
            sql += `name = $${paramIndex}, `;
            parameters.push(item.name);
            paramIndex++;
        }
        if (item.description) {
            sql += `description = $${paramIndex}, `;
            parameters.push(item.description);
            paramIndex++;
        }
        if (item.startingPrice) {
            sql += `starting_price = $${paramIndex}, `;
            parameters.push(item.startingPrice);
            paramIndex++;
        }
        if (item.currentPrice) {
            sql += `current_price = $${paramIndex}, `;
            parameters.push(item.currentPrice);
            paramIndex++;
        }
        if (item.imageUrl) {
            sql += `image_url = $${paramIndex}, `;
            parameters.push(item.imageUrl);
            paramIndex++;
        }
        if (item.endTime) {
            sql += `end_time = $${paramIndex}, `;
            parameters.push(item.endTime);
            paramIndex++;
        }
        if (item.createAt) {
            sql += `created_at = $${paramIndex}, `;
            parameters.push(item.createAt);
            paramIndex++;
        }
    
        // Remove the trailing comma and space
        sql = sql.slice(0, -2);
    
        // Add the WHERE clause to target the specific item by id
        sql += ` WHERE id = $${paramIndex}`;
        parameters.push(item.id);

        console.log("Query =========> ", sql)

        return await this.dataSource.manager.query(sql, parameters);
    }

    public deleteItem = async (params: Map<string, string>) => {
        return await this.dataSource.manager.query(`DELETE FROM items WHERE id = $1`, [params.get("itemId")]);
    }

    public get = async (params: Map<string, string>) => {
        return await this.dataSource.manager.query(`SELECT id, name, description, starting_price, current_price, image_url, end_time, created_at FROM items WHERE id = $1;`, [params.get("itemId")]);
    }

    public getList = async (params: Map<string, string>) => {
        let page: number = parseInt(params.get("page"));
        let perPage: number = parseInt(params.get("perPage"));

        if (page < 1) {
            page = 1;
        }

        if (perPage < 1) {
            perPage = 10;
        }

        return await this.dataSource.manager.query(`SELECT id, name, description, starting_price, current_price, image_url, end_time, created_at FROM items LIMIT $1 OFFSET $2;`, [perPage, ((page-1)*perPage)]);
    }

}