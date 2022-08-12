import { NextFunction, Request, Response } from 'express';
import { ForgotUserPasswordProps, CreateUserProps, VerifyUserProps } from '../schemas/user.schema';
import UserMail, { MailDataProps } from '../mail/user.mail';
import UserService from '../services/user.service';
import mailer from '../utils/mailer';

class UserController {
  service = new UserService();

  mail = new UserMail();

  createUser = async (req: Request<{}, {}, CreateUserProps>, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const { status, message, success, user } = await this.service.createUser(body);
      const payload = this.mail.verifyUserMail(user as MailDataProps);
      await mailer(payload);
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

  forgotUserPassword = async (req: Request<{}, {}, ForgotUserPasswordProps>, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const { status, user, message, success } = await this.service.forgotUserPassword(body);
      if (!success) {
        res.status(status).json({ success, message });
      }
      const payload = this.mail.resetPasswordMail(user as MailDataProps);
      await mailer(payload);
      res.status(status).json({ success, message });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
