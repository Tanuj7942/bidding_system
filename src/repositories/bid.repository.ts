import { Bid } from '../entities/bid.entity';
import { DataSource, Repository } from 'typeorm';

export class BidRepository extends Repository<Bid>
{
    constructor(dataSource: DataSource) {
        super(Bid, dataSource.createEntityManager());
    }

}