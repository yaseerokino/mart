import { STATUS_BAD_REQUEST, STATUS_OK, STATUS_NOT_FOUND, STATUS_CONFLICT } from '../constants/index';
import {
  UpdateCategoryType,
  CreateCategoryType,
  GetCategoryType,
  DeleteCategoryType,
} from '../schemas/category.schema';
import CategoryModel from '../models/category.model';
import slugifyString from '../utils/slugify';

class CategoryService {
  categories = CategoryModel;

  findCategories = async () => {
    const categories = await this.categories.find();
    return { success: true, categories, status: STATUS_OK };
  };

  findCategoryBySlug = async (categorySlug: GetCategoryType['categorySlug']) => {
    const category = await this.categories.findOne({ slug: categorySlug });
    if (!category) {
      return {
        success: false,
        message: `Category does not exist`,
        status: STATUS_NOT_FOUND,
      };
    }
    return {
      success: true,
      status: STATUS_OK,
      category,
    };
  };

  createCategory = async (body: CreateCategoryType) => {
    const slug = slugifyString(body.name);
    const category = await this.categories.findOne({ slug });
    if (category) {
      return {
        success: false,
        message: `Category with name ${body.name} already exists`,
        status: STATUS_CONFLICT,
      };
    }
    const created = await this.categories.create({ ...body, slug });
    if (!created) {
      return {
        success: false,
        message: `Category could not be created`,
        status: STATUS_BAD_REQUEST,
      };
    }
    return {
      success: true,
      message: `Category created`,
      status: STATUS_OK,
    };
  };

  updateCategory = async (
    categorySlug: UpdateCategoryType['params']['categorySlug'],
    categoryData: UpdateCategoryType['body']
  ) => {
    const slug = slugifyString(categoryData.name);
    const category = await this.categories.findOneAndUpdate({ slug: categorySlug }, { ...categoryData, slug });
    if (!category) {
      return { success: false, message: 'Category not found', status: STATUS_NOT_FOUND };
    }
    return { success: true, message: 'Category updated', status: STATUS_OK };
  };

  deleteCategory = async (categoryId: DeleteCategoryType['categoryId']) => {
    const category = await this.categories.findByIdAndDelete(categoryId);
    if (!category) {
      return { success: false, message: 'Category not found', status: STATUS_NOT_FOUND };
    }
    return { success: true, message: 'Category deleted', status: STATUS_OK };
  };
}

export default CategoryService;
