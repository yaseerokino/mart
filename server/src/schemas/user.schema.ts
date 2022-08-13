import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First name is required',
    }),
    lastName: string({
      required_error: 'Last name is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password is too short, should be min 6 chars'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password do not match',
    path: ['passwordConfirmation'],
  }),
});

export const verifyUserSchema = object({
  params: object({
    userId: string(),
    verificationToken: string(),
  }),
});

export const forgotUserPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

export const resetUserPasswordSchema = object({
  params: object({
    userId: string(),
    passwordResetToken: string(),
  }),
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password is too short, should be min 6 chars'),
    passwordConfirmation: string({
      required_error: 'Kindly confirm your password',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password do not match',
    path: ['passwordConfirmation'],
  }),
});

export const createUserSessionSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email('Invalid email or password'),
    password: string({ required_error: 'Password is required' }).min(6, 'Invalid email or password'),
  }),
});

export type CreateUserProps = TypeOf<typeof createUserSchema>['body'];
export type VerifyUserProps = TypeOf<typeof verifyUserSchema>['params'];
export type ForgotUserPasswordProps = TypeOf<typeof forgotUserPasswordSchema>['body'];
export type ResetUserPasswordProps = TypeOf<typeof resetUserPasswordSchema>;
export type CreateUserSessionProps = TypeOf<typeof createUserSessionSchema>['body'];
