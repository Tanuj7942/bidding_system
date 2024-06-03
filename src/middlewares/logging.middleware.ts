import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export function requestLogging(req: Request, res: Response, next: NextFunction) {
    const childLogger = logger.child({
        "headers": req.headers,
        "url": req.url,
        "query": req.query,
        "params": req.params,
        "body": req.body,
    });
    
    childLogger.info("Incoming Request");
    next();
}