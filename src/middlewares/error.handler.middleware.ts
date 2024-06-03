import express from 'express';
import httpStatusCodes from 'http-status-codes';
import { logger } from '../utils/logger';
import { BaseError } from '../errors/base.error';
import { ApiResponse } from './api.response.middleware';
import { InternalServerError } from '../errors/internal.server.error';

export interface IError {
  status?: number;
  code?: number;
  message?: string;
}
/**
 * NOT_FOUND(404) middleware to catch error response
 *
 * @param  {object}   res
 */
export function notFoundErrorHandler(
  _err: BaseError,
  _req: express.Request,
  res: express.Response,
) {
  res.status(httpStatusCodes.NOT_FOUND).json({
    success: false,
    error: {
      code: httpStatusCodes.NOT_FOUND,
      message: httpStatusCodes.getStatusText(httpStatusCodes.NOT_FOUND),
    },
  });
}

/**
 * Generic error response middleware
 *
 * @param  {object}   err
 * @param  {object}   res
 */
export function errorHandler(
  err: BaseError,
  _req: express.Request,
  res: express.Response,
) {
  logger.error(err);
  res.status(err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR).json({
    message:
      err.message ||
      httpStatusCodes.getStatusText(httpStatusCodes.INTERNAL_SERVER_ERROR),
    name: err.name,
  });
}

/**
 * Generic error catch middleware
 *
 * @param  {function} fn
 */
export const asyncMiddleware =
  (fn: (arg0: any, arg1: any) => any) =>
    async (req: express.Request, res: express.Response) => {
      await fn(req, res).catch((error: BaseError | any) => {
        if (
          error instanceof BaseError &&
          !(error instanceof InternalServerError)
        ) {
          logger.error('-----error details-----');
          logger.warn(error?.stack);
          logger.warn(error);

          ApiResponse.error(
            res,
            error.statusCode,
            error.message,
            error.data,
          );
        } else {
          logger.error(error?.stack);
          logger.error(error);

          ApiResponse.error(
            res,
            httpStatusCodes.INTERNAL_SERVER_ERROR,
            'Internal server error',
          );
        }
      });
    };
