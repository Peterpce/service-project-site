import pool from "../../database/db.js";

// GET all organizations
export async function getAllOrganizations() {
    const sql = `
        SELECT *
        FROM organizations
        ORDER BY name
    `;

    const result = await pool.query(sql);
    return result.rows;
}

// GET organization by ID
export async function getOrganizationById(id) {
    const sql = `
        SELECT *
        FROM organizations
        WHERE id = $1
    `;

    const result = await pool.query(sql, [id]);
    return result.rows[0];
}

// GET all projects for a specific organization
export async function getProjectsByOrganization(id) {
    const sql = `
        SELECT *
        FROM projects
        WHERE organization_id = $1
        ORDER BY name
    `;

    const result = await pool.query(sql, [id]);
    return result.rows;
}