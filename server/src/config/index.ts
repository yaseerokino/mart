import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
export const {
  NODE_ENV,
  PORT,
  DB_URI,
  LOG_LEVEL,
  CORS_ORIGIN,
  CORS_CREDENTIALS,
  MAIL_FROM_NAME,
  MAIL_FROM_EMAIL,
  SEND_GRID_TOKEN,
  ACCESS_TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_PUBLIC_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PUBLIC_KEY,
  CLIENT,
} = process.env;
