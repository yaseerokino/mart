import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validate from '../middlewares/validate.middleware';
import {
  createUserSchema,
  verifyUserSchema,
  forgotUserPasswordSchema,
  resetUserPasswordSchema,
} from '../schemas/user.schema';
import { requireUser, requireRole } from '../middlewares/auth.middleware';

class UserRoute {
  path = '/users';

  router = Router();

  controller = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(`${this.path}`, validate(createUserSchema), this.controller.createUser);
    this.router.get(
      `${this.path}/verify/:userId/:verificationToken`,
      validate(verifyUserSchema),
      this.controller.verifyUser
    );
    this.router.post(
      `${this.path}/forgot-password`,
      validate(forgotUserPasswordSchema),
      this.controller.forgotUserPassword
    );

    this.router.post(
      `${this.path}/reset-password/:userId/:passwordResetToken`,
      validate(resetUserPasswordSchema),
      this.controller.resetUserPassword
    );

    this.router.get(`${this.path}/current-user`, requireUser, this.controller.getCurrentUser);
    this.router.get(`${this.path}/current-admin`, requireUser, requireRole('admin'), this.controller.getCurrentUser);
  };
}

export default UserRoute;
