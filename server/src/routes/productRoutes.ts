import { Router } from 'express';
import * as productController from '../controllers/productController';
import { authMiddleware, adminOnly } from '../middlewares/authMiddleware'; 

const router = Router();

router.post("/", authMiddleware, adminOnly, productController.createProductHandler);
router.put("/:id", authMiddleware, adminOnly, productController.updateProductHandler);
router.delete("/:id", authMiddleware, adminOnly, productController.deleteProductHandler);

router.get("/", authMiddleware, productController.getProductsHandler);
router.get("/:id",authMiddleware,  productController.getProductHandler);

export default router;
