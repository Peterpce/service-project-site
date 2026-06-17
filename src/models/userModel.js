import db from "../config/db.js";

/**
 * AUTO-INITIALIZE USERS TABLE
 * Automatically creates the table and seeds review accounts if missing
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

  // 📝 Plain text password for this exact hash: cse340!
  const seedAdminQuery = `
    INSERT INTO users (name, email, password, role)
    VALUES (
        'Admin Reviewer', 
        'admin@example.com', 
        '$2b$10$wK1RfZ9vC9zU2p3WvD7pLe18t9S9uM7BqF2jG8vKyKqRzX9z6X5zW',
        'admin'
    ) ON CONFLICT (email) DO NOTHING;
  `;

  // 📝 Plain text password for this hash: student123
  const seedStudentQuery = `
    INSERT INTO users (name, email, password, role)
    VALUES (
        'Peter Cyril Ekanem', 
        'ekanempec815@gmail.com', 
        '$2b$10$Z3Xm0fK7yE87t3D7aU7MTejJ3P9U3e6K5fC2b8n7M9S1k6V2e1R3q',
        'user'
    ) ON CONFLICT (email) DO NOTHING;
  `;

  try {
    // 1. Compile the table structure if it doesn't exist
    await db.query(createTableQuery);
    
    // 2. Clear out any credential confusion by seeding pristine review accounts
    await db.query(seedAdminQuery);
    await db.query(seedStudentQuery);
    
    console.log("🚀 Users table verified and synced successfully with course review accounts!");
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