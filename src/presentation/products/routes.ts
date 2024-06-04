import { Router } from 'express';
import { ProductsController } from './controller';
import { ProductsService } from '../services';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();
    const productsService = new ProductsService()
    const controller = new ProductsController(productsService);

    router.get('/', controller.findAllProducts);
    router.get('/:id', controller.findOneProduct);
    router.post('/', [AuthMiddleware.validateJWT], controller.createProduct);
    router.patch('/:id',[AuthMiddleware.validateJWT], controller.updateProduct);
    router.delete('/:id',[AuthMiddleware.validateJWT], controller.deleteProduct);

    return router;
  }
}
