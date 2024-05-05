import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Token required');

  if (!process.env.SIGNING_SECRET) return res.status(500).send('Failed to load signing secret');

  jwt.verify(token, process.env.SIGNING_SECRET, (err: any, user) => {
    if (err) return res.status(403).send('Invalid or expired token');
    req.body.user = user;
    next();
  });
};

export default authenticateToken;