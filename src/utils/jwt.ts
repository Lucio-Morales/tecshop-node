import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables.');
}

const JWT_EXPIRES_IN = '7d';

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken<T = any>(token: string): T {
  return jwt.verify(token, JWT_SECRET as string) as T;
}
