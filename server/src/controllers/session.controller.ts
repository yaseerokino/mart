import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { STATUS_BAD_REQUEST } from '../constants/index';
import JWT from '../utils/jwt';
import { CreateUserSessionProps } from '../schemas/user.schema';
import SessionService from '../services/session.service';

class SessionController {
  service = new SessionService();

  jwt = new JWT();

  createUserSession = async (req: Request<{}, {}, CreateUserSessionProps>, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const { status, success, message, tokens } = await this.service.createUserSession(body);
      res.status(status).json({ success, message, tokens });
    } catch (error) {
      next(error);
    }
  };

  refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = get(req, 'headers.x-refresh');
      const decoded = this.jwt.verify<{ session: string }>(refreshToken, 'refreshTokenPublicKey');
      if (!decoded) {
        res.status(STATUS_BAD_REQUEST).json({ success: false, message: 'Could not refresh session' });
      }

      const { status, success, accessToken, message } = await this.service.refreshAccessToken({
        sessionId: decoded?.session as string,
      });
      res.status(status).json({ success, message, accessToken });
    } catch (error) {
      next(error);
    }
  };
}

export default SessionController;
