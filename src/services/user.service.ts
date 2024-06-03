import { Request, Response } from "express";
import { dataSource } from "../config/orm.config";
import { UserRepository } from "../repositories/user.repository";
import { ApiResponse } from "../middlewares/api.response.middleware";
import { StatusCodes } from "http-status-codes";
import { User } from "../entities/user.entity";
import { Utility } from "../helper/utility.helper";
import jwt from "jsonwebtoken";

class UserService {
    private userRepo;
    constructor() {
        this.userRepo = new UserRepository(dataSource);
    }

    public getUser = async (req: Request, res: Response) => {
        const params: Map<string, string> = new Map();

        const userId: string = req.query.userId as string; 
        if (!Utility.isValidString(userId)) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "User ID is Missing");
        }

        params.set("userId", userId);
        const response = await this.userRepo.getUser(params);

        if (response.length) {
            return ApiResponse.result(res, response, StatusCodes.OK);
        } else {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "No User Found", userId);
        }
    };

    public registerUser = async (req: Request, res: Response) => {

        
        const {username, password, email} = req.body;

        const user = new User();
        user.id = "UID" + Utility.getCurrentTimeInMilliseconds();
        user.username = username;
        user.password = password;
        user.email = email;
        user.role = "user";
        user.createdAt = new Date();
        user.updatedAt = new Date();

        const response = await this.userRepo.registerUser(user);

        return ApiResponse.result(res, response, StatusCodes.OK);
    };

    public login = async (req: Request, res: Response) => {
        const params: Map<string, string> = new Map();

        const userId: string = req.query.userId as string; 
        if (!Utility.isValidString(userId)) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "User ID is Missing");
        }

        params.set("userId", userId);
        const response = await this.userRepo.getUser(params);

        if (response.length == 0) {
            return ApiResponse.error(res, StatusCodes.BAD_REQUEST, "No User Found", userId);
        }

        const accessToken = jwt.sign({ username: response[0].username, role: response[0].role }, process.env.JWT_SECRET || "KGK_GROUP_KEY");

        return ApiResponse.result(res, {"accessToken": accessToken}, StatusCodes.OK);
    };

}

export default UserService;