import db from "../config/db.js";

/**
 * CREATE NEW USER
 */
export async function createUser(name, email, password, role = "user") {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role
  `;

  const values = [name, email, password, role];

  const result = await db.query(query, values);
  return result.rows[0];
}

/**
 * FIND USER BY EMAIL (LOGIN)
 */
export async function findUserByEmail(email) {
  const query = `
    SELECT id, name, email, password, role
    FROM users
    WHERE email = $1
  `;

  const result = await db.query(query, [email]);
  return result.rows[0];
}

/**
 * GET ALL USERS (ADMIN ONLY)
 */
export async function getAllUsers() {
  const query = `
    SELECT id, name, email, role
    FROM users
    ORDER BY id ASC
  `;

  const result = await db.query(query);
  return result.rows;
}