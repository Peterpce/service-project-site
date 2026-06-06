import db from "../config/db.js";

// Get all categories assigned to a specific project
export const getCategoriesByProjectId = async (projectId) => {
  const [rows] = await db.execute(
    `SELECT c.*
     FROM categories c
     INNER JOIN project_categories pc ON c.id = pc.category_id
     WHERE pc.project_id = ?`,
    [projectId]
  );

  return rows;
};

// Assign a category to a project
export const addCategoryToProject = async (projectId, categoryId) => {
  await db.execute(
    `INSERT INTO project_categories (project_id, category_id)
     VALUES (?, ?)`,
    [projectId, categoryId]
  );
};

// Remove all categories from a project (used before updating)
export const removeAllCategoriesFromProject = async (projectId) => {
  await db.execute(
    `DELETE FROM project_categories WHERE project_id = ?`,
    [projectId]
  );
};

// Replace categories for a project (UPDATE LOGIC)
export const updateProjectCategories = async (projectId, categoryIds) => {
  // Step 1: remove old links
  await removeAllCategoriesFromProject(projectId);

  // Step 2: add new links
  if (categoryIds && categoryIds.length > 0) {
    for (const categoryId of categoryIds) {
      await addCategoryToProject(projectId, categoryId);
    }
  }
};