export const LocalStorage = {
  get: (key: string) => JSON.parse(localStorage.getItem(key) as string),

  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};

export const SessionStorage = {
  get: (key: string) => JSON.parse(sessionStorage.getItem(key) as string),

  set: (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    sessionStorage.removeItem(key);
  },
};
