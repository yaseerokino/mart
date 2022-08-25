import { Router } from 'express';
import validate from '../middlewares/validate.middleware';
import { createUserSessionSchema } from '../schemas/user.schema';
import SessionController from '../controllers/session.controller';

class SessionRoute {
  path = '/sessions';

  router = Router();

  controller = new SessionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(`${this.path}`, validate(createUserSessionSchema), this.controller.createUserSession);
    this.router.get(`${this.path}/refresh`, this.controller.refreshAccessToken);
  };
}

export default SessionRoute;
