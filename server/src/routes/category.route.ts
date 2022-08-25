import { Router } from 'express';
import { createCategorySchema, updateCategorySchema, deleteCategorySchema } from '../schemas/category.schema';
import { requireRole, requireUser } from '../middlewares/auth.middleware';
import CategoryController from '../controllers/category.controller';
import { Routes } from '../interfaces/routes.interface';
import validate from '../middlewares/validate.middleware';

class CategoryRoutes implements Routes {
  path = '/categories';

  router = Router();

  controller = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.getCategories);
    this.router.get(`${this.path}/:categorySlug`, this.controller.getCategoryBySlug);
    this.router.post(
      `${this.path}`,
      requireUser,
      requireRole('admin'),
      validate(createCategorySchema),
      this.controller.createCategory
    );
    this.router.patch(
      `${this.path}/:categorySlug`,
      requireUser,
      requireRole('admin'),
      validate(updateCategorySchema),
      this.controller.updateCategory
    );
    this.router.delete(
      `${this.path}/:categoryId`,
      requireUser,
      requireRole('admin'),
      validate(deleteCategorySchema),
      this.controller.deleteCategory
    );
  }
}

export default CategoryRoutes;
