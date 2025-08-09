import Product, { IProduct } from '../models/product';

export const createProduct = async (data: Partial<IProduct>): Promise<IProduct> => {
  const product = new Product(data);
  return await product.save();
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id).populate('category').exec();
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find().populate('category').exec();
};

export const updateProduct = async (id: string, data: Partial<IProduct>): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(id).exec();
};
