import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ResponseError } from '@sendgrid/mail';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import {
  STATUS_FORBIDDEN,
  STATUS_UNAUTHORIZED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_BAD_REQUEST,
  STATUS_CONFLICT,
} from '../constants/index';
import log from '../utils/logger';
import ErrorResponse from '../helpers/errorResponse';

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || STATUS_INTERNAL_SERVER_ERROR;
    const message: string = error.message || 'Something went wrong';
    const customError = error;

    if (error instanceof ErrorResponse) {
      return res.status((customError as ErrorResponse).status).json({ success: false, error: customError.message });
    }

    if (error instanceof ZodError) {
      const errors = Object.values(error.errors).map((el) => el.message);
      return res.status(STATUS_BAD_REQUEST).json({ success: false, error: errors });
    }

    if (error.message === 'TokenExpiredError: jwt expired') {
      return res.status(STATUS_UNAUTHORIZED).json({ success: false, error: 'Session expired' });
    }

    if (error.message === 'JsonWebTokenError: invalid token') {
      return res.status(STATUS_FORBIDDEN).json({ success: false, error: 'Access forbidden' });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((val: any) => val.message);
      return res.status(STATUS_BAD_REQUEST).json({ success: false, error: errors });
    }

    if (error.code === 'ENOTFOUND') {
      return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ success: false, error: 'Email not sent' });
    }

    if (error.code === 11000) {
      return res
        .status(STATUS_CONFLICT)
        .json({ success: false, error: 'Duplicate resource', duplicate: error.keyValue });
    }
    log.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    return res.status(status).json({ success: false, error: message });
  } catch (err) {
    return next(err);
  }
};

export default errorMiddleware;
