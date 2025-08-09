import Category, { ICategory } from '../models/category';

export const createCategory = async (data: Partial<ICategory>): Promise<ICategory> => {
  const category = new Category(data);
  return await category.save();
};

export const getCategoryById = async (id: string): Promise<ICategory | null> => {
  return await Category.findById(id).exec();
};

export const getAllCategories = async (): Promise<ICategory[]> => {
  return await Category.find().exec();
};

export const updateCategory = async (id: string, data: Partial<ICategory>): Promise<ICategory | null> => {
  return await Category.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteCategory = async (id: string): Promise<ICategory | null> => {
  return await Category.findByIdAndDelete(id).exec();
};
