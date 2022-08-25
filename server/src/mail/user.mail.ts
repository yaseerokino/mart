import { CLIENT, MAIL_FROM_EMAIL, MAIL_FROM_NAME } from '../config';
import resetPasswordMailTemplate from './templates/resetPassword';
import verifyPasswordMailTemplate from './templates/verifyPassword';

export interface MailDataProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordResetToken?: string;
  verificationToken?: string;
}

class UserMail {
  public from;

  constructor() {
    this.from = { name: MAIL_FROM_NAME as string, email: MAIL_FROM_EMAIL as string };
  }

  verifyUserMail = (data: MailDataProps) => {
    const subject = 'Verify Email';
    const link = `${CLIENT}/users/verify/${data.id}/${data.verificationToken}`;
    const name = `${data.firstName} ${data.lastName}`;
    const html = verifyPasswordMailTemplate(link, name);
    const payload = {
      to: data.email,
      from: this.from,
      subject,
      html,
    };
    return payload;
  };

  resetPasswordMail = (data: MailDataProps) => {
    const subject = 'Reset Password';
    const link = `${CLIENT}/users/password-reset/${data.id}/${data.passwordResetToken}`;
    const name = `${data.firstName} ${data.lastName}`;
    const html = resetPasswordMailTemplate(link, name);
    const payload = {
      to: data.email,
      from: this.from,
      subject,
      html,
    };
    return payload;
  };
}

export default UserMail;
