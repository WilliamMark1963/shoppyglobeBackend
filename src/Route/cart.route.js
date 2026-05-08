import express from 'express';
import { addToCart, removeFromCart, updateCartQuantity, getCart } from"../Controller/cartController/cart.controller.js"
import { verifyToken } from '../Middleware/verify.middleware.js';

const router = express.Router();

router.get('/getCart', verifyToken, getCart);

router.post('/add', verifyToken, addToCart);

router.delete('/remove/:productId', verifyToken, removeFromCart);

router.put('/update', verifyToken, updateCartQuantity);


export default router;