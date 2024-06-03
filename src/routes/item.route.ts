import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import ItemController from "../controllers/item.controller";
import multer from "multer";
import { fileFilter } from "../middlewares/file.upload.middleware";

class ItemRoute implements Routes {
    public path = '/items';
    public router = Router();
    private itemController = new ItemController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, multer({ storage: multer.memoryStorage(), fileFilter:fileFilter}).single('file'), this.itemController.add);
        this.router.put(`${this.path}`, multer({ storage: multer.memoryStorage(), fileFilter:fileFilter}).single('file'), this.itemController.update);
        this.router.delete(`${this.path}`, this.itemController.delete);
        this.router.get(`${this.path}`, this.itemController.get);
        this.router.get(`${this.path}/getList`, this.itemController.getList);
    }
}

export default ItemRoute;