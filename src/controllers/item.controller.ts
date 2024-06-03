import { Request, Response } from 'express';
import { asyncMiddleware } from "../middlewares/error.handler.middleware";
import ItemService from '../services/item.service';

class ItemController {

    private itemService;

    constructor() {
        this.itemService = new ItemService();
    }

    public add = asyncMiddleware(
        async (req: Request, res: Response) => {
            return await this.itemService.add(req, res);
        }
    );

    public update = asyncMiddleware(
        async (req: Request, res: Response) => {
            return await this.itemService.update(req, res);
        }
    );

    public get = asyncMiddleware(
        async (req: Request, res: Response) => {
            return await this.itemService.get(req, res);
        }
    );

    public getList = asyncMiddleware(
        async (req: Request, res: Response) => {
            return await this.itemService.getList(req, res);
        }
    );

    public delete = asyncMiddleware(
        async (req: Request, res: Response) => {
            return await this.itemService.delete(req, res);
        }
    );

}

export default ItemController;