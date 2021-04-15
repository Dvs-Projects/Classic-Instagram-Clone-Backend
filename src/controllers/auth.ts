import { Request, Response } from 'express';

class AuthController {
  public index(req: Request, res: Response) {
    res.json({ text: 'auth' });
  }
}

export const authController = new AuthController();
