import * as projectModel from "../models/projectModel.js"; // ✅ Removed the non-existent projectCategoryModel import

// Get all projects
export const getAllProjects = async () => {
  return await projectModel.getAllProjects(); //[cite: 28]
};

// Get project by ID
export const getProjectById = async (id) => {
  return await projectModel.getProjectById(id); //[cite: 28]
};

// Create project
export const createProject = async (projectData) => {
  return await projectModel.createProject(projectData); //[cite: 28]
};

// Update project
export const updateProject = async (id, projectData) => {
  return await projectModel.updateProject(id, projectData); //[cite: 28]
};

// Delete project
export const deleteProject = async (id) => {
  return await projectModel.deleteProject(id); //[cite: 28]
};

//
// ================================
// CATEGORY ASSIGNMENT LOGIC
// ================================
//

// Get categories assigned to a project
export const getProjectCategories = async (projectId) => {
  // ✅ Redirected to use your standard projectModel function
  return await projectModel.getCategoriesByProject(projectId); 
};

// Update categories for a project (IMPORTANT FEATURE)
export const updateProjectCategories = async (projectId, categoryIds) => {
  // ✅ Redirected to use your standard projectModel function
  return await projectModel.updateProjectCategories(
    projectId,
    categoryIds
  );
};