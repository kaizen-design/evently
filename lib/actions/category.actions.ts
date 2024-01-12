'use server';

import { connectToDatabase } from '@/lib/database';
import { handleError } from '@/lib/utils';
import { CreateCategoryParams } from '@/types';
import Category from '../database/models/category.model';

export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
  try {
    await connectToDatabase();
    const newCategory = await Category.create({ name: categoryName });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDatabase();
    const categories = await Category.find();
    //if (!categories) throw new Error('Categories not found!');
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};