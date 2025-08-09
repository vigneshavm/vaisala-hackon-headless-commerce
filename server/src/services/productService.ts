import Product, { IProduct } from '../models/product';

// Helper function to find a product by ID with populated category
const findProductById = (id: string) => {
  return Product.findById(id).populate('category').exec();
};

// Helper function to find all products with populated category
const findAllProducts = () => {
  return Product.find().populate('category').exec();
};

export const createProduct = async (data: Partial<IProduct>): Promise<IProduct> => {
  const product = new Product(data);
  return product.save();
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return findProductById(id);
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  return findAllProducts();
};

export const updateProduct = async (id: string, data: Partial<IProduct>): Promise<IProduct | null> => {
  // Update product but ensure populated category is returned
  return Product.findByIdAndUpdate(id, data, { new: true })
    .populate('category')
    .exec();
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return Product.findByIdAndDelete(id).exec();
};
