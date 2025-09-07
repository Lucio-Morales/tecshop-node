// Recibe los roles permitidos (por ejemplo: ["admin", "trainer", "client"])
// Verifica si req.user.role esta permitido
// Si no, devuelve 403 Forbidden.

import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types/user';

export function authorize(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: 'No autenticado.' });
      return;
    }
    if (!allowedRoles.includes(user.role)) {
      res.status(403).json({ message: 'No autorizado.' });
      return;
    }

    next();
  };
}
