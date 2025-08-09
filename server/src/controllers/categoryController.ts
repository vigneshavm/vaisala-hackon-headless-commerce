import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';

export const createCategoryHandler = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getCategoryHandler = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllCategoriesHandler = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateCategoryHandler = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteCategoryHandler = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
