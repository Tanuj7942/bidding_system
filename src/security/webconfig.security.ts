import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../middlewares/api.response.middleware";
import { StatusCodes } from "http-status-codes";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const url = req.url;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (url.split("?")[0] == "/api/users") {
    if (token == null) return ApiResponse.error(res, StatusCodes.UNAUTHORIZED, "Unauthorized");

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) return ApiResponse.error(res, StatusCodes.FORBIDDEN, "Forbidden");
        next();
    });
} else {
    next();
}
};