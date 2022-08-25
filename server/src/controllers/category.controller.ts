import { Request, Response, NextFunction } from 'express';
import { STATUS_CREATED, STATUS_OK } from '../constants/index';
import {
  UpdateCategoryType,
  CreateCategoryType,
  GetCategoryType,
  DeleteCategoryType,
} from '../schemas/category.schema';
import CategoryService from '../services/category.service';

class CategoryController {
  service = new CategoryService();

  getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { success, categories, status } = await this.service.findCategories();
      return res.status(status).json({ success, categories });
    } catch (error) {
      return next(error);
    }
  };

  getCategoryBySlug = async (req: Request<GetCategoryType>, res: Response, next: NextFunction) => {
    try {
      const { categorySlug } = req.params;
      const { success, message, status, category } = await this.service.findCategoryBySlug(categorySlug);
      return res.status(STATUS_OK).json({ success, message, status, category });
    } catch (error) {
      return next(error);
    }
  };

  createCategory = async (req: Request<{}, {}, CreateCategoryType>, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const { success, message, status } = await this.service.createCategory(body);
      return res.status(STATUS_CREATED).json({ success, message, status });
    } catch (error) {
      return next(error);
    }
  };

  updateCategory = async (
    req: Request<UpdateCategoryType['params'], {}, UpdateCategoryType>['body'],
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        body,
        params: { categorySlug },
      } = req;
      const { success, message, status } = await this.service.updateCategory(categorySlug, body);
      return res.status(status).json({ success, message, status });
    } catch (error) {
      return next(error);
    }
  };

  deleteCategory = async (req: Request<DeleteCategoryType>, res: Response, next: NextFunction) => {
    try {
      const { categoryId } = req.params;
      const { success, message, status } = await this.service.deleteCategory(categoryId);

      res.status(status).json({ success, message, status });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
