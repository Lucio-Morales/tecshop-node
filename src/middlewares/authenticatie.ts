// Extrae el JWT desde el header Authorization.
// Verifica que sea valido.
// Agrega req.user = {id, role}

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

// export interface AuthenticatedRequest extends Request {
//   user?: {
//     id: string;
//     role: 'admin' | 'customer';
//   };
// }

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401).json({ message: 'No autorizado. Token faltante.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
