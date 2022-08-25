import { Response, NextFunction } from 'express';
import { STATUS_BAD_REQUEST, STATUS_FORBIDDEN, STATUS_UNAUTHORIZED } from '../constants/index';
import { TokenData, RequestWithUser } from '../interfaces/auth.interface';

import UserService from '../services/user.service';
import ErrorResponse from '../helpers/errorResponse';
import JWT from '../utils/jwt';

const service = new UserService();

export const deserializeUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const accessToken = (req.headers.authorization || '').replace(/^Bearer\s/, '');
    if (!accessToken) return next();

    const decoded = JWT.verify(accessToken, 'accessTokenPublicKey');
    if (decoded) req.user = decoded as TokenData;
    return next();
  } catch (error) {
    return next(error);
  }
};

export const requireUser = async (req: any, res: Response, next: NextFunction) => {
  const { user } = req;
  if (!user) return next(new ErrorResponse(STATUS_UNAUTHORIZED, 'Unauthorized'));

  const findUser = await service.findUserById(user._id);
  if (!findUser) return next(new ErrorResponse(STATUS_UNAUTHORIZED, 'You are not user'));

  return next();
};

export const requireRole = (role: 'admin' | 'subscriber' | 'vendor') => {
  const hasRole = async (req: any, res: Response, next: NextFunction) => {
    const {
      user: { _id },
    } = req;

    const user = await service.findUserById(_id);
    if (!user) return next(new ErrorResponse(STATUS_BAD_REQUEST, 'Resource not available'));
    console.log(role);

    if (role !== user.role) {
      return next(new ErrorResponse(STATUS_BAD_REQUEST, "You don't have permission to perform this action"));
    }

    return next();
  };

  return hasRole;
};
