export type UserRole = 'admin' | 'seller' | 'customer';

export interface RegisterUserInput {
  full_name: string;
  email: string;
  password: string;
  role?: UserRole;
}
