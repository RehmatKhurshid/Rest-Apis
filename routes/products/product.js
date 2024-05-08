import express from "express";
import { isAuthenticated } from "../../middleware/user.js";
import { createProduct, getAllProducts, updateProductWithPATCH, updateProductWithPUT } from "../../controllers/products/product.js";
import { getOne } from "../../controllers/products/product.js";
import { delOne } from "../../controllers/products/product.js";


const router = express.Router()

router.post('/product', isAuthenticated , createProduct);

router.get('/product', getAllProducts);

router.get('/product/:id', getOne);

router.delete('/product/:id', isAuthenticated,delOne);

router.put('/product/:id', isAuthenticated,updateProductWithPUT);

router.patch('/product/:id',isAuthenticated,updateProductWithPATCH );


export default router