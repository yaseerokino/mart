import { STATUS_OK, STATUS_INTERNAL_SERVER_ERROR, STATUS_CONFLICT, STATUS_BAD_REQUEST } from '../constants/index';
import { VerifyUserProps, CreateUserProps } from '../schemas/user.schema';
import { UserModel } from '../models/user.model';

class UserService {
  users = UserModel;

  createUser = async (body: CreateUserProps) => {
    const user = await UserService.findUserByEmail(body.email);
    if (user) {
      return { success: false, message: `${body.email} is already registered`, status: STATUS_CONFLICT };
    }
    await this.users.create(body);
    return { success: true, message: 'Account created', status: STATUS_OK };
  };

  verifyUser = async (params: VerifyUserProps) => {
    const user = await UserService.findUserById(params.userId);
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

  private static findUserByEmail = async (email: string) => UserModel.findOne({ email });

  private static findUserById = async (id: string) => UserModel.findById(id);
}

export default UserService;
