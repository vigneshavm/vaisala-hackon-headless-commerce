import { Request, Response } from 'express';
import * as categoryService from '../../services/categoryService';
import {
  createCategoryHandler,
  getCategoryHandler,
  getAllCategoriesHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from '../categoryController'; // Adjust import path as needed

describe('Category Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    mockReq = {};
    mockRes = {
      status: statusMock,
      json: jsonMock,
    };
    jest.resetAllMocks();
  });

  describe('createCategoryHandler', () => {
   it('should create category and respond with 201 and category', async () => {
    const fakeCategory:any = { id: '1', name: 'Test' };
    jest.spyOn(categoryService, 'createCategory').mockResolvedValue(fakeCategory);

    mockReq.body = { name: 'Test' };

    await createCategoryHandler(mockReq as Request, mockRes as Response);

    expect(categoryService.createCategory).toHaveBeenCalledWith({ name: 'Test' });
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(fakeCategory);
  });

    it('should respond 400 on error', async () => {
      jest.spyOn(categoryService, 'createCategory').mockRejectedValue(new Error('Create error'));

      mockReq.body = { name: 'Test' };

      await createCategoryHandler(mockReq as Request, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Create error' });
    });
  });

  describe('getCategoryHandler', () => {
    it('should respond with category if found', async () => {
      const fakeCategory:any = { id: '1', name: 'Test' };
      jest.spyOn(categoryService, 'getCategoryById').mockResolvedValue(fakeCategory);

      mockReq.params = { id: '1' };

      await getCategoryHandler(mockReq as Request, mockRes as Response);

      expect(categoryService.getCategoryById).toHaveBeenCalledWith('1');
      expect(jsonMock).toHaveBeenCalledWith(fakeCategory);
    });

    it('should respond 404 if category not found', async () => {
      jest.spyOn(categoryService, 'getCategoryById').mockResolvedValue(null);

      mockReq.params = { id: '1' };

      await getCategoryHandler(mockReq as Request, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Category not found' });
    });

    it('should respond 500 on error', async () => {
      jest.spyOn(categoryService, 'getCategoryById').mockRejectedValue(new Error('DB error'));

      mockReq.params = { id: '1' };

      await getCategoryHandler(mockReq as Request, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('getAllCategoriesHandler', () => {
    it('should respond with all categories', async () => {
      const categories:any = [{ id: '1', name: 'Test' }, { id: '2', name: 'Test2' }];
      jest.spyOn(categoryService, 'getAllCategories').mockResolvedValue(categories);

      await getAllCategoriesHandler({} as Request, mockRes as Response);

      expect(categoryService.getAllCategories).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalledWith(categories);
    });

    it('should respond 500 on error', async () => {
      jest.spyOn(categoryService, 'getAllCategories').mockRejectedValue(new Error('DB error'));

      await getAllCategoriesHandler({} as Request, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'DB error' });
    });
  });

  describe('updateCategoryHandler', () => {
    it('should update category and respond with updated category', async () => {
      const updatedCategory:any = { id: '1', name: 'Updated' };
      jest.spyOn(categoryService, 'updateCategory').mockResolvedValue(updatedCategory);

      mockReq.params = { id: '1' };
      mockReq.body = { name: 'Updated' };

      await updateCategoryHandler(mockReq as Request, mockRes as Response);

      expect(categoryService.updateCategory).toHaveBeenCalledWith('1', { name: 'Updated' });
      expect(jsonMock).toHaveBeenCalledWith(updatedCategory);
    });

    it('should respond 404 if category not found', async () => {
      jest.spyOn(categoryService, 'updateCategory').mockResolvedValue(null);

      mockReq.params = { id: '1' };
      mockReq.body = { name: 'Updated' };

      await updateCategoryHandler(mockReq as Request, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Category not found' });
    });

    it('should respond 400 on error', async () => {
      jest.spyOn(categoryService, 'updateCategory').mockRejectedValue(new Error('Update error'));

      mockReq.params = { id: '1' };
      mockReq.body = { name: 'Updated' };

      await updateCategoryHandler(mockReq as Request, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Update error' });
    });
  });

  describe('deleteCategoryHandler', () => {
   

   

    it('should respond 500 on error', async () => {
      jest.spyOn(categoryService, 'deleteCategory').mockRejectedValue(new Error('Delete error'));

      mockReq.params = { id: '1' };

      await deleteCategoryHandler(mockReq as Request, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Delete error' });
    });
  });
});
