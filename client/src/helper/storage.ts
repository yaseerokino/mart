export const LocalStorage = {
  get: (key: string) => JSON.parse(localStorage.getItem(key) as string),

  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};

export const getRefreshTokenFromStorage = () => {
  const tokens = LocalStorage.get('session');

  return tokens?.refreshToken;
};

export const getUserFromStorage = () => {
  const user = LocalStorage.get('user');

  return user;
};

export const getAccessTokenFromStorage = () => {
  const tokens = LocalStorage.get('session');
  return tokens?.accessToken;
};
