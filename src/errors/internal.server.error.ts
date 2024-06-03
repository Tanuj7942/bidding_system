import httpStatusCodes from 'http-status-codes';
import { logger } from '../utils/logger';
import { BaseError } from './base.error';

export class InternalServerError extends BaseError {
  public static staticMessage = 'Internal server error';
  public statusCode: number;
  constructor(error?: string, data?: any) {
    const message = error ? error : InternalServerError.staticMessage;
    super(message);
    this.data = data;
    this.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
    this.message = message;
    logger.error(this.message);
  }
}

export class UnauthorizedError extends BaseError {
  public static staticMessage = 'Unauthorized';
  public statusCode: number;
  constructor(error?: string, data?: any) {
    const message = error ? error : UnauthorizedError.staticMessage;
    super(message);
    this.data = data;
    this.statusCode = httpStatusCodes.UNAUTHORIZED;
    this.message = message;
    logger.error(this.message);
  }
}

export class BadRequest extends BaseError {
  public static staticMessage = 'Bad Request';
  public statusCode: number;
  constructor(error?: string, data?: any) {
    const message = error ? error : BadRequest.staticMessage;
    super(message);
    this.statusCode = httpStatusCodes.BAD_REQUEST;
    this.data = data;
    this.message = message;
    logger.error(this.message);
  }
}


export class NotFound extends BaseError {
  public static staticMessage = 'Not Found';
  public statusCode: number;
  constructor(error?: string, data?: any) {
    const message = error ? error : NotFound.staticMessage;
    super(message);
    this.statusCode = httpStatusCodes.NOT_FOUND;
    this.data = data;
    this.message = message;
    logger.error(this.message);
  }
}


export class Forbidden extends BaseError {
  public static staticMessage = 'Forbidden';
  public statusCode: number;
  constructor(error?: string, data?: any) {
    const message = error ? error : Forbidden.staticMessage;
    super(message);
    this.statusCode = httpStatusCodes.FORBIDDEN;
    this.data = data;
    this.message = message;
    logger.error(this.message);
  }
}