// src/controllers/productController.ts
import { Request, Response } from 'express';
import * as productService from '../services/productService';

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

export const getAllProductsHandler = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();

    console.log(products,"products")
    res.json({products:products,categories:products});
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
