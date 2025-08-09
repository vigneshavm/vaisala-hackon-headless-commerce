import Product, { IProduct } from '../models/product';

export const createProduct = async (data: Partial<IProduct>): Promise<IProduct> => {
  const product = new Product(data);
  return await product.save();
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id).populate('category').exec();
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  const sampleProducts: any[] = [
    {
      id:1,
      name: "Sample Product 1",
      slug: "sample-product-1",
      description: "This is the first sample product.",
      price: 29.99,
      inventory: 50,
      images: ["image1.jpg", "image2.jpg"],
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  return sampleProducts
};

export const updateProduct = async (id: string, data: Partial<IProduct>): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(id).exec();
};
