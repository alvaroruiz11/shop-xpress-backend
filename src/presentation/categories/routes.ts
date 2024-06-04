import { Router } from 'express';
import { CategoriesController } from './controller';
import { CategoriesService } from '../services';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';

export class CategoriesRoutes {
  static get routes(): Router {
    const router = Router();
    const categoriesService = new CategoriesService();
    const controller = new CategoriesController(categoriesService);

    router.get('/', controller.findAllCategories);
    router.post('/',[AuthMiddleware.validateJWT], controller.createCategory);
    router.patch('/:id', [AuthMiddleware.validateJWT], controller.updateCategory);
    router.delete('/:id', [AuthMiddleware.validateJWT], controller.deleteCategory);

    return router;
  }
}
