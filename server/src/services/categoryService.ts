import Category, { ICategory } from '../models/category';

export const createCategory = (data: Partial<ICategory>): Promise<ICategory> => {
  const category = new Category(data);
  return category.save();
};

export const getCategoryById = (id: string): Promise<ICategory | null> => {
  return Category.findById(id).exec();
};

export const getAllCategories = (): Promise<ICategory[]> => {
  return Category.find().exec();
};

export const updateCategory = (id: string, data: Partial<ICategory>): Promise<ICategory | null> => {
  return Category.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteCategory = (id: string): Promise<ICategory | null> => {
  return Category.findByIdAndDelete(id).exec();
};
