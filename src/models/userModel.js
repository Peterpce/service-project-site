import db from "../config/db.js";

/**
 * AUTO-INITIALIZE USERS TABLE
 * Automatically creates the table and seeds the admin if missing
 */
export async function initializeUserTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(20) DEFAULT 'user'
    );
  `;

  const seedAdminQuery = `
    INSERT INTO users (name, email, password, role)
    VALUES (
        'Admin User', 
        'admin@example.com', 
        '$2b$10$7R0Z.W1lX7C2W2H6mYh6O.xG6R7bK0V7m9O6JvE5gK3f1Z7Q2e1S.',
        'admin'
    ) ON CONFLICT (email) DO NOTHING;
  `;

  try {
    await db.query(createTableQuery);
    await db.query(seedAdminQuery);
    console.log("🚀 Users table verified and synced successfully!");
  } catch (error) {
    console.error("❌ Error initializing users table:", error.message);
  }
}

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