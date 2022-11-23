import Router from 'express';
import ProductService from '../services/products.service.js';
import validatorHandler from '../middlewares/validator.handler.js';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} from '../schemas/product.schema.js';

const router = Router();
const service = new ProductService();

router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const product = service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', validatorHandler(createProductSchema, 'body'), (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json({
    message: 'Product created',
    data: newProduct,
  });
});

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = service.update(id, body);
      res.json({
        message: 'Product updated',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const productId = service.delete(id);
  res.json({
    message: 'Product deleted',
    id: productId,
  });
});

export default router;
