import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { asyncMiddleware } from "../middlewares/error.handler.middleware";

class UserController {

    private userService;

    constructor() {
        this.userService = new UserService();
    }

    public getUser = asyncMiddleware(
        async (req: Request, res: Response) => {
            return await this.userService.getUser(req, res);
        }
    );

    public registerUser = asyncMiddleware(
        async (req: Request, res: Response) => {
            return await this.userService.registerUser(req, res);
        }
    );

    public login = asyncMiddleware(
        async (req: Request, res: Response) => {
            return await this.userService.login(req, res);
        }
    ); 

}

export default UserController;