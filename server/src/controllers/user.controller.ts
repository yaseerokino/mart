import { NextFunction, Request, Response } from 'express';
import { CreateUserProps, VerifyUserProps } from '../schemas/user.schema';
import UserService from '../services/user.service';

class UserController {
  service = new UserService();

  createUser = async (req: Request<{}, {}, CreateUserProps>, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const { status, message, success } = await this.service.createUser(body);
      res.status(status).json({ success, message });
    } catch (error) {
      next(error);
    }
  };

  verifyUser = async (req: Request<VerifyUserProps>, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      const { status, message, success } = await this.service.verifyUser(params);
      res.status(status).json({ success, message });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
