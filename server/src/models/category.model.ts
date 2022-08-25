import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: { collection: 'categories', timestamps: true },
})
export class Category {
  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  slug: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  icon: string;
}
export const categoryPrivateFields = ['__v'];

const CategoryModel = getModelForClass(Category);
export default CategoryModel;
