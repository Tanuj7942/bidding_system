import { ItemRepository } from "../repositories/item.repository";
import { dataSource } from "../config/orm.config";
import { Item } from "../entities/item.entity";
import { Request, Response } from "express";
import { ApiResponse } from "../middlewares/api.response.middleware";
import { StatusCodes } from "http-status-codes";
import { Utility } from "../helper/utility.helper";
import { saveFileToDisk } from "../middlewares/file.upload.middleware";
import path from "path";

class ItemService {
    private itemRepo;
    constructor() {
        this.itemRepo = new ItemRepository(dataSource);
    }

    public add = async (req: Request, res: Response) => {
        const {name, description, startingPrice, endTime} = req.body;
        let currentPrice = req.body.currentPrice;

        if (!Utility.isValidString(name)) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "Name is Missing");
        }

        if (!Utility.isValidString(description)) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "Description is Missing");
        }

        if (!Utility.isValidString(startingPrice)) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "Starting Price is Missing");
        }

        if (!Utility.isValidString(currentPrice)) {
            currentPrice = startingPrice;
        }

        if (!Utility.isValidString(endTime)) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "End Time is Missing");
        }

        if (!Utility.isValidDate(endTime)) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "End Time is Invalid");
        }

        if (!req.file) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "Image is Missing");
        }
        
        const item = new Item();

        item.id = "IT" + Utility.getCurrentTimeInMilliseconds();
        item.name = name;
        item.description = description;
        item.startingPrice = startingPrice;
        item.currentPrice = currentPrice;
        item.endTime = new Date(endTime);
        item.createAt = new Date();
        item.imageUrl = path.resolve(__dirname, "../../media");

        saveFileToDisk(req.file, __dirname + "../../../media");

        const response = await this.itemRepo.add(item);

        return ApiResponse.result(res, response, StatusCodes.OK);
    };

    public update = async (req: Request, res: Response) => {
        const {id, name, description, startingPrice, currentPrice, endTime} = req.body;

        if (!Utility.isValidString(id)) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "Item ID is Missing");
        }

        const repoItem = await this.itemRepo.get(new Map().set("itemId", id));

        if (repoItem.length < 1) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "Item ID is Invalid");
        }

        const item = new Item();
        
        item.id = id;
        item.name = name;
        item.description = description;
        item.startingPrice = startingPrice;
        item.currentPrice = currentPrice;
        item.endTime = new Date(endTime);
         
        const response = await this.itemRepo.update(item);

        return ApiResponse.result(res, response, StatusCodes.OK);
    };

    public delete = async (req: Request, res: Response) => {
        const itemId = req.query.itemId as string;

        if (!Utility.isValidString(itemId)) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "Item ID is Missing");
        }
        const params: Map<string, string> = new Map();
        params.set("itemId", itemId);

        const repoItem = await this.itemRepo.get(params);

        if (repoItem.length < 1) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "Item ID is Invalid");
        }

        const response = await this.itemRepo.deleteItem(params);

        return ApiResponse.result(res, response, StatusCodes.OK);
    };

    public get = async (req: Request, res: Response) => {
        const itemId = req.query.itemId as string;

        if (!Utility.isValidString(itemId)) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "Item ID is Missing");
        }
        const params: Map<string, string> = new Map();
        params.set("itemId", itemId);

        const repoItem = await this.itemRepo.get(params);

        if (repoItem.length < 1) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "Item ID is Invalid");
        }

        const response = await this.itemRepo.get(params);

        return ApiResponse.result(res, response, StatusCodes.OK);
    };

    public getList = async (req: Request, res: Response) => {
        const page = req.query.page as string || "1";
        const perPage = req.query.perPage as string || "10";
    

        const params: Map<string, string> = new Map();
        params.set("page", page);
        params.set("perPage", perPage);

        const response = await this.itemRepo.getList(params);

        return ApiResponse.result(res, response, StatusCodes.OK);
    };

}

export default ItemService;