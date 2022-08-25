import { object, string, TypeOf } from 'zod';

export const getCategorySchema = object({
  params: object({
    categorySlug: string(),
  }),
});
export const createCategorySchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    description: string({
      required_error: 'Description is required',
    }),
    icon: string({
      required_error: 'Icon is required',
    }),
  }),
});

export const updateCategorySchema = object({
  params: object({
    categorySlug: string(),
  }),
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    description: string({
      required_error: 'Description is required',
    }),
    icon: string({
      required_error: 'Icon is required',
    }),
  }),
});

export const deleteCategorySchema = object({
  params: object({
    categoryId: string(),
  }),
});

export type GetCategoryType = TypeOf<typeof getCategorySchema>['params'];
export type CreateCategoryType = TypeOf<typeof createCategorySchema>['body'];
export type UpdateCategoryType = TypeOf<typeof updateCategorySchema>;
export type DeleteCategoryType = TypeOf<typeof deleteCategorySchema>['params'];
