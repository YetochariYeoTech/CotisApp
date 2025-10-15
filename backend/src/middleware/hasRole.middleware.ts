import { Request, Response, NextFunction } from 'express';
import { Role } from '../types/enums';

export const hasRole = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;

    if (!roles.includes(role)) {
      return res.status(403).send('Forbidden');
    }

    next();
  };
};
