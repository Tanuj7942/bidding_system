import { Router } from "express";
import UserController from "../controllers/user.controller";
import { Routes } from "../interfaces/routes.interface";
import { authenticateToken } from "../security/webconfig.security";

class UserRoute implements Routes {
    public path = '/users';
    public router = Router();
    private userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authenticateToken, this.userController.getUser);
        this.router.post(`${this.path}`, this.userController.registerUser);
        this.router.post(`${this.path}/login`, this.userController.login);
    }
}

export default UserRoute;