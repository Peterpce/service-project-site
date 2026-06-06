import * as projectModel from "../models/projectModel.js";
import * as projectCategoryModel from "../models/projectCategoryModel.js";

// Get all projects
export const getAllProjects = async () => {
  return await projectModel.getAllProjects();
};

// Get project by ID
export const getProjectById = async (id) => {
  return await projectModel.getProjectById(id);
};

// Create project
export const createProject = async (projectData) => {
  return await projectModel.createProject(projectData);
};

// Update project
export const updateProject = async (id, projectData) => {
  return await projectModel.updateProject(id, projectData);
};

// Delete project
export const deleteProject = async (id) => {
  return await projectModel.deleteProject(id);
};

//
// ================================
// CATEGORY ASSIGNMENT LOGIC
// ================================
//

// Get categories assigned to a project
export const getProjectCategories = async (projectId) => {
  return await projectCategoryModel.getCategoriesByProjectId(projectId);
};

// Update categories for a project (IMPORTANT FEATURE)
export const updateProjectCategories = async (projectId, categoryIds) => {
  return await projectCategoryModel.updateProjectCategories(
    projectId,
    categoryIds
  );
};