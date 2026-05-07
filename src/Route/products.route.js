import express from 'express';
import { getProductById, getProducts } from '../Controller/productsController/products.controller.js';
const router = express.Router();

//GET ALL PRODUCTS
router.get('/products', getProducts);

// GET  A SINGLE PRODUCT
router.get('/products/:id', getProductById);

export default router;