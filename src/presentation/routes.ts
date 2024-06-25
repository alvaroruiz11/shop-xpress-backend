import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoriesRoutes } from './categories/routes';
import { ProductsRoutes } from './products/routes';
import { FileUploadRoutes } from './file-upload/routes';
import { ImagesRoutes } from './images/routes';


export class AppRoutes {


  static get routes(): Router {
    const router = Router();

    // Definir rutas
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/categories', CategoriesRoutes.routes);
    router.use('/api/products', ProductsRoutes.routes);
    router.use('/api/upload', FileUploadRoutes.routes);
    router.use('/api/images', ImagesRoutes.routes );
    
    return  router;
  }

}