import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'

const errorCheck = (req:Request, res:Response, next:NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped(),
    });
  }

  next();
};
