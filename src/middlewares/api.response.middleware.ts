import express from 'express';
import { StatusCodes } from 'http-status-codes';


export class ApiResponse {
  public static result = (
    res: express.Response,
    data: object,
    status = 200,
  ) => {
    res.status(status).json({
      data: data,
      status: StatusCodes[status]
    });
  };

  public static error = (
    res: express.Response,
    status = 400,
    message: string,
    data?: any,
  ) => {
    res.status(status).json({
      status: StatusCodes[status],
      message: message,
      data: data,
    });
  };
}
