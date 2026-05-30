import pool from "../../database/db.js";

// GET all categories (list page)
export async function getAllCategories() {
    const sql = `
        SELECT *
        FROM categories
        ORDER BY name
    `;

    const result = await pool.query(sql);
    return result.rows;
}

// GET category by ID (details page)
export async function getCategoryById(id) {
    const sql = `
        SELECT *
        FROM categories
        WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);
    return result.rows[0];
}

// GET all projects under a category
export async function getProjectsByCategory(categoryId) {
    const sql = `
        SELECT projects.*
        FROM projects
        JOIN project_categories
            ON projects.id = project_categories.project_id
        WHERE project_categories.category_id = $1
        ORDER BY projects.name
    `;

    const result = await pool.query(sql, [categoryId]);
    return result.rows;
}