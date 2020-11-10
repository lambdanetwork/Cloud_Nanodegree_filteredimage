import { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction){
    if (!req.headers.authorization && req.headers.authorization !== 'authorize') {
        return res.status(403).json({ error: 'include header authorization with value "authorize"' });
    }
    next();
}