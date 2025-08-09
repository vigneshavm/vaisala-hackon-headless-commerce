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

interface GetProductsOptions {
    search?: string;
    category?: string;
    sortBy?: 'price' | 'name' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }
  
export const getProducts = async (options: GetProductsOptions = {}) => {
    const {
      search,
      category,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = options;
  
    // Build MongoDB query object
    const query: any = {};
  
    if (search) {
      // Search by name or description, case-insensitive
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
  
    if (category) {
      query.category = category; // category id string
    }
  
    // Build sort object
    const sort: any = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }
  
    // Pagination
    const skip = (page - 1) * limit;
  
    const products = await Product.find(query)
      .populate('category')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();
  
    return products;
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
