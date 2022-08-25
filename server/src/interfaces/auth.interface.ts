import { Request } from 'express';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: Array<string>;
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: TokenData;
}

export type DecodedType = TokenData | boolean | null;
