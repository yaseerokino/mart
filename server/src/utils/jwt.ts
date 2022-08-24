import jsonwebtoken from 'jsonwebtoken';
import {
  ACCESS_TOKEN_PUBLIC_KEY,
  ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PUBLIC_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
} from '../config';

class JWT {
  tokenPublic = {
    accessTokenPublicKey: ACCESS_TOKEN_PUBLIC_KEY as string,
    refreshTokenPublicKey: REFRESH_TOKEN_PUBLIC_KEY as string,
  };

  tokenPrivate = {
    accessTokenPrivateKey: ACCESS_TOKEN_PRIVATE_KEY as string,
    refreshTokenPrivateKey: REFRESH_TOKEN_PRIVATE_KEY as string,
  };

  sign = (
    payload: {},
    keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jsonwebtoken.SignOptions | undefined
  ) => {
    const signingKey = Buffer.from(this.tokenPrivate[keyName], 'base64').toString('ascii');
    const sign = jsonwebtoken.sign(payload, signingKey, {
      ...(options && options),
      algorithm: 'RS256',
    });
    return sign;
  };

  verify = <T>(token: string, keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'): T | null => {
    const publicKey = Buffer.from(this.tokenPublic[keyName], 'base64').toString('ascii');
    try {
      const decoded = jsonwebtoken.verify(token, publicKey) as T;
      return decoded;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export default new JWT();
