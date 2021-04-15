import { Request, Response, NextFunction } from 'express' 
import jwt from 'jsonwebtoken'

export const  jwtVerify = (req:Request, res:Response, next:NextFunction) => {
  try {
    const token = req.header('Authorization');

    if (!token)
      return res.status(401).json({ ok: false, msg: 'Token not provided' });

    const { uid } = jwt.verify(token, process.env.SEED);
    req.uid = uid;

    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'Token not provided',
      error,
    });
  }
};

