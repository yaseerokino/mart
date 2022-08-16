import { ICreateUser, ICreateUserSession } from './user';

interface IResponse {
  success: boolean;
  status: boolean;
  message?: string;
  error?: Array<string> | string;
}

export { IResponse, ICreateUser, ICreateUserSession };
