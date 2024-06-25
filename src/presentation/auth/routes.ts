import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services/auth.service';
import { AuthMiddleware } from './middlewares/auth.middleware';


export class AuthRoutes {

  static get routes(): Router {
    const router = Router();
    const authService = new AuthService();
    const controller = new AuthController(authService);
    
    // Definir las rutas
    router.get('/check-status',[ AuthMiddleware.validateJWT ], controller.checkStatus);
    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);

    return router;
  }


}