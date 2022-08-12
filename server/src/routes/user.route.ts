import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validate from '../middlewares/validate.middleware';
import { createUserSchema, verifyUserSchema, forgotUserPasswordSchema } from '../schemas/user.schema';

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
  };
}

export default UserRoute;
