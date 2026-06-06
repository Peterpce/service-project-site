import * as categoryModel from "../models/categoryModel.js";

// Get all categories
export const getAllCategories = async () => {
  return await categoryModel.getAllCategories();
};

// Get category by ID
export const getCategoryById = async (id) => {
  return await categoryModel.getCategoryById(id);
};

// Create category
export const createCategory = async (categoryData) => {
  return await categoryModel.createCategory(categoryData);
};

// Update category
export const updateCategory = async (id, categoryData) => {
  return await categoryModel.updateCategory(id, categoryData);
};

// Delete category
export const deleteCategory = async (id) => {
  return await categoryModel.deleteCategory(id);
};