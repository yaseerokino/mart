export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface ICreateUserSession {
  email: string;
  password: string;
}
