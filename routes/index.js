import ProductsRoutes from './products.router.js';
import Router from 'express';

const routerApi = (app) => {
  const router = Router();
  app.use('/api/', router);
  router.use('/products', ProductsRoutes);
};

export default routerApi;
