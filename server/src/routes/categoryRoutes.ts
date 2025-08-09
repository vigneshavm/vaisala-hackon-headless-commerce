import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import { authMiddleware, adminOnly } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, adminOnly, categoryController.createCategoryHandler);
router.put('/:id', authMiddleware, adminOnly, categoryController.updateCategoryHandler);
router.delete('/:id', authMiddleware, adminOnly, categoryController.deleteCategoryHandler);

// Public routes
router.get('/', categoryController.getAllCategoriesHandler);
router.get('/:id', categoryController.getCategoryHandler);

export default router;
