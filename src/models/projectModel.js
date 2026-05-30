import pool from "../../database/db.js";

// GET all projects (list page)
export async function getAllProjects() {
    const sql = `
        SELECT *
        FROM projects
        ORDER BY name
    `;

    const result = await pool.query(sql);
    return result.rows;
}

// GET project by ID (details page)
export async function getProjectById(id) {
    const sql = `
        SELECT *
        FROM projects
        WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);
    return result.rows[0];
}

// GET organization for a project
export async function getOrganizationByProject(id) {
    const sql = `
        SELECT organizations.*
        FROM organizations
        JOIN projects
            ON organizations.id = projects.organization_id
        WHERE projects.id = $1
    `;

    const result = await pool.query(sql, [id]);
    return result.rows[0];
}

// GET categories for a project
export async function getCategoriesByProject(projectId) {
    const sql = `
        SELECT categories.*
        FROM categories
        JOIN project_categories
            ON categories.id = project_categories.category_id
        WHERE project_categories.project_id = $1
        ORDER BY categories.name
    `;

    const result = await pool.query(sql, [projectId]);
    return result.rows;
}