import { DocumentType } from '@typegoose/typegoose';
import { omit } from 'lodash';
import JWT from '../utils/jwt';
import { STATUS_OK, STATUS_BAD_REQUEST } from '../constants/index';
import { UserModel, User, userPrivateFields } from '../models/user.model';
import SessionModel from '../models/session.model';
import { CreateUserSessionProps } from '../schemas/user.schema';

class SessionService {
  users = UserModel;

  sessions = SessionModel;

  jwt = new JWT();

  createUserSession = async (body: CreateUserSessionProps): Promise<any> => {
    const user = await this.users.findOne({ email: body.email });
    if (!user) {
      return { success: false, message: 'Invalid email or password', status: STATUS_BAD_REQUEST };
    }
    const valid = await user.validatePassword(body.password);

    if (!valid) {
      return { success: false, message: 'Invalid email or password', status: STATUS_BAD_REQUEST };
    }
    const accessToken = await this.signAccessToken(user);
    const refreshToken = await this.signRefreshToken({ userId: user._id });

    return { success: true, tokens: { accessToken, refreshToken }, status: STATUS_OK, message: 'Login Successful' };
  };

  refreshAccessToken = async ({ sessionId }: { sessionId: string }) => {
    const session = await this.sessions.findById(sessionId);
    if (!session || !session.valid) {
      return { success: false, message: 'Could not refresh session', status: STATUS_BAD_REQUEST };
    }
    const user = await this.users.findById(String(session.user));
    if (!user) {
      return { success: false, message: 'Could not refresh session', status: STATUS_BAD_REQUEST };
    }
    const accessToken = await this.signAccessToken(user);
    return { success: true, accessToken, status: STATUS_OK, message: 'Session refreshed' };
  };

  signAccessToken = async (user: DocumentType<User>) => {
    const payload = omit(JSON.parse(JSON.stringify(user)), userPrivateFields);
    const accessToken = this.jwt.sign(payload, 'accessTokenPrivateKey', {
      expiresIn: '30m',
    });
    return accessToken;
  };

  signRefreshToken = async ({ userId }: { userId: string }) => {
    const findSession = await this.sessions.findOne({ user: userId });
    if (findSession) {
      await this.sessions.deleteOne({ user: userId });
    }
    const session = await this.sessions.create({ user: userId });
    const refreshToken = this.jwt.sign({ session: session._id }, 'refreshTokenPrivateKey', {
      expiresIn: '1y',
    });
    return refreshToken;
  };
}

export default SessionService;
