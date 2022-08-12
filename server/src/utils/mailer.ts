import sgMailer from '@sendgrid/mail';
import { SEND_GRID_TOKEN } from '../config';

import logger from './logger';

interface MailerPayload {
  to: string;
  from: {
    name: string;
    email: string;
  };
  subject: string;
  html: string;
}
const mailer = async (payload: MailerPayload) => {
  sgMailer.setApiKey(SEND_GRID_TOKEN as string);

  try {
    await sgMailer.send(payload);
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

export default mailer;
