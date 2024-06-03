import { BidRepository } from "../repositories/bid.repository";
import { dataSource } from "../config/orm.config";

class BidService {
    private bidRepo;
    constructor() {
        this.bidRepo = new BidRepository(dataSource);
    }

    public getAllUsers = async () => {
        return this.bidRepo.find()
    };

}

export default BidService;