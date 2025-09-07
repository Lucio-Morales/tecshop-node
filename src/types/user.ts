export type UserRole = 'admin' | 'customer';

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}
