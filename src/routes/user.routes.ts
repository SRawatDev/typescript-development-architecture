import { Router, Request, Response, NextFunction } from 'express';
import userController from '../controller/user.controller';

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
  }

  private getRoutes(): void {
    this.router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
      userController.signup(req, res).catch(next);
    });
  }
}

export default new Routes().router;
