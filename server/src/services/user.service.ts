import { nanoid } from 'nanoid';
import {
  STATUS_UNAUTHORIZED,
  STATUS_OK,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_CONFLICT,
  STATUS_BAD_REQUEST,
} from '../constants/index';
import {
  ForgotUserPasswordProps,
  VerifyUserProps,
  CreateUserProps,
  ResetUserPasswordProps,
} from '../schemas/user.schema';
import { UserModel } from '../models/user.model';

class UserService {
  users = UserModel;

  createUser = async (body: CreateUserProps) => {
    const user = await UserService.findUserByEmail(body.email);
    if (user) {
      return { success: false, message: `${body.email} is already registered`, status: STATUS_CONFLICT };
    }
    const newUser = await this.users.create(body);
    return {
      success: true,
      message: 'Account created, kindly verify your email through the link sent to your inbox',
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        verificationToken: newUser.verificationToken,
      },
      status: STATUS_OK,
    };
  };

  verifyUser = async (params: VerifyUserProps) => {
    const user = await this.findUserById(params.userId);
    if (!user) {
      return { success: false, message: 'Could not verify account', status: STATUS_BAD_REQUEST };
    }
    if (user.verified) {
      return { success: false, message: 'Account has already been verified', status: STATUS_CONFLICT };
    }
    if (user.verificationToken !== params.verificationToken) {
      return { success: false, message: 'Something went wrong', status: STATUS_INTERNAL_SERVER_ERROR };
    }
    user.verified = true;
    await user.save();
    return { success: true, message: 'Account verified', status: STATUS_OK };
  };

  forgotUserPassword = async (body: ForgotUserPasswordProps) => {
    const user = await this.users.findOne(body);

    if (!user) {
      return { success: false, message: 'Account not found', status: STATUS_BAD_REQUEST };
    }
    if (!user.verified) {
      return { success: false, message: 'Account has not been verified', status: STATUS_UNAUTHORIZED };
    }
    const passwordResetToken = nanoid();
    user.passwordResetToken = passwordResetToken;
    await user.save();

    return {
      status: STATUS_OK,
      success: true,
      message: `Check your inbox for the next steps. If you don't receive an email, and it's not in your spam folder this could mean you signed up with a different address.`,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        passwordResetToken: user.passwordResetToken,
      },
    };
  };

  resetUserPassword = async (body: ResetUserPasswordProps['body'], params: ResetUserPasswordProps['params']) => {
    const user = await this.findUserById(params.userId);
    if (body.email !== user?.email) {
      return { success: false, message: 'Please confirm your email', status: STATUS_BAD_REQUEST };
    }
    if (!user || !user.passwordResetToken || user.passwordResetToken !== params.passwordResetToken) {
      return { success: false, message: 'Could not reset password, try again later', status: STATUS_BAD_REQUEST };
    }
    user.passwordResetToken = null;
    user.password = body.password;
    await user.save();
    return { success: true, message: 'Password reset successful', status: STATUS_OK };
  };

  private static findUserByEmail = async (email: string) => UserModel.findOne({ email });

  findUserById = async (id: string) => UserModel.findById(id);
}

export default UserService;
