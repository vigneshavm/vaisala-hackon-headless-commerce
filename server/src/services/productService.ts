import Product, { IProduct } from '../models/product';

export const createProduct = async (data: Partial<IProduct>): Promise<IProduct> => {
  const product = new Product(data);
  return await product.save();
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id).populate('category').exec();
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
  return await Product.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(id).exec();
};
