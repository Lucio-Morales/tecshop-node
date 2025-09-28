declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: 'admin' | 'seller' | 'customer';
        [key: string]: any;
      };
    }
  }
}

export {};
