import { Router } from 'express';
import { authController } from '../controllers/auth';

class AuthRoutes {
  router: Router = Router();

  constructor() {
    this.config();
  }

  config() {
    this.router.get('/', authController.index);
  }
}

export default new AuthRoutes().router;
