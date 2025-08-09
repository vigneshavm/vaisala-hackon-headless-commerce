// src/controllers/productController.ts
import { Request, Response } from 'express';
import * as productService from '../services/productService';
import * as categoryService from '../services/categoryService';

export const createProductHandler = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getProductHandler = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProductsHandler = async (req: Request, res: Response) => {
  try {
    const { search, category, sortBy, sortOrder, page, limit } = req.query;

    const products = await productService.getProducts({
      search: search as string | undefined,
      category: category as string | undefined,
      sortBy: sortBy as 'price' | 'name' | 'createdAt' | undefined,
      sortOrder: sortOrder as 'asc' | 'desc' | undefined,
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Optional: If you want to return all products + categories together
export const getAllProductsHandler = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getProducts();
    const categories = await categoryService.getAllCategories();

    res.json({ products, categories });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateProductHandler = async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteProductHandler = async (req: Request, res: Response) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
