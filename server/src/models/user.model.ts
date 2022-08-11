import { modelOptions, prop, Severity, pre, DocumentType, getModelForClass, index } from '@typegoose/typegoose';
import argon from 'argon2';
import { nanoid } from 'nanoid';
import { logger } from '../utils';

enum Role {
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

@index({ email: 1 })
@modelOptions({
  schemaOptions: { collection: 'users', timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})
@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const hashedPassword = await argon.hash(this.password);
  this.password = hashedPassword;
})
class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop()
  middleName: string;

  @prop({ required: true })
  password: string;

  @prop({ enum: Role, default: 'customer' })
  roles: Role;

  @prop({ default: false })
  verified: boolean;

  @prop({ required: true, default: () => nanoid() })
  verificationToken: string;

  @prop()
  passwordResetToken: string | null;

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon.verify(this.password, candidatePassword);
    } catch (error) {
      logger.error(error, 'Could not validate');
      return false;
    }
  }
}

export const userPrivateFields = [
  'password',
  '__v',
  'verificationToken',
  'passwordResetToken',
  'verified',
  'createdAt',
  'updatedAt',
  'roles',
];

const UserModel = getModelForClass(User);

export { User, UserModel };
